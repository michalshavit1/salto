/*
*                      Copyright 2022 Salto Labs Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import {
  ObjectType, ElemID, InstanceElement, Element, isObjectType,
  isInstanceElement, ReferenceExpression, ModificationChange, CORE_ANNOTATIONS,
} from '@salto-io/adapter-api'
import { client as clientUtils, filterUtils } from '@salto-io/adapter-components'
import { DEFAULT_CONFIG, DEFAULT_INCLUDE_ENDPOINTS, FETCH_CONFIG } from '../../../src/config'
import ZendeskClient from '../../../src/client/client'
import { ZENDESK_SUPPORT } from '../../../src/constants'
import { paginate } from '../../../src/client/pagination'
import filterCreator, { ORDER_FIELD_NAME } from '../../../src/filters/reorder/automation'
import { createOrderTypeName } from '../../../src/filters/reorder/creator'

const mockDeployChange = jest.fn()
jest.mock('@salto-io/adapter-components', () => {
  const actual = jest.requireActual('@salto-io/adapter-components')
  return {
    ...actual,
    deployment: {
      ...actual.deployment,
      deployChange: jest.fn((...args) => mockDeployChange(...args)),
    },
  }
})

describe('automation reorder filter', () => {
  let client: ZendeskClient
  type FilterType = filterUtils.FilterWith<'onFetch' | 'deploy'>
  let filter: FilterType
  const typeName = 'automation'
  const orderTypeName = createOrderTypeName(typeName)
  const objType = new ObjectType({ elemID: new ElemID(ZENDESK_SUPPORT, typeName) })
  const inst1 = new InstanceElement('inst1', objType, { id: 11, position: 1, title: 'inst2' })
  const inst2 = new InstanceElement('inst2', objType, { id: 22, position: 2, title: 'inst1' })
  const inst3 = new InstanceElement('inst3', objType, { id: 22, position: 2, title: 'aaa' })

  beforeEach(async () => {
    jest.clearAllMocks()
    client = new ZendeskClient({
      credentials: { username: 'a', password: 'b', subdomain: 'ignore' },
    })
    filter = filterCreator({
      client,
      paginator: clientUtils.createPaginator({
        client,
        paginationFuncCreator: paginate,
      }),
      config: DEFAULT_CONFIG,
    }) as FilterType
  })

  describe('onFetch', () => {
    it('should create correct order element', async () => {
      const elements = [objType, inst1, inst2, inst3]
      await filter.onFetch(elements)
      expect(elements).toHaveLength(6)
      expect(elements.map(e => e.elemID.getFullName()).sort())
        .toEqual([
          'zendesk_support.automation',
          'zendesk_support.automation.instance.inst1',
          'zendesk_support.automation.instance.inst2',
          'zendesk_support.automation.instance.inst3',
          'zendesk_support.automation_order',
          'zendesk_support.automation_order.instance',
        ])
      const automationOrderType = elements
        .find(e => isObjectType(e) && e.elemID.typeName === orderTypeName)
      expect(automationOrderType).toBeDefined()
      const automationOrderInstance = elements
        .find(e => isInstanceElement(e) && e.elemID.typeName === orderTypeName)
      expect(automationOrderInstance).toBeDefined()
      expect(automationOrderInstance?.elemID.name).toEqual(ElemID.CONFIG_NAME)
      expect((automationOrderInstance as InstanceElement)?.value)
        .toEqual({ [ORDER_FIELD_NAME]: [
          new ReferenceExpression(inst1.elemID, inst1),
          new ReferenceExpression(inst3.elemID, inst3),
          new ReferenceExpression(inst2.elemID, inst2),
        ] })
      const orderType = elements
        .find(elem => elem.elemID.getFullName() === 'zendesk_support.automation_order')
      expect(orderType).toBeDefined()
      expect(orderType?.annotations[CORE_ANNOTATIONS.HIDDEN]).toEqual(true)
    })
    it('should create correct order element with non hidden types', async () => {
      const filterWithHideType = filterCreator({
        client,
        paginator: clientUtils.createPaginator({
          client,
          paginationFuncCreator: paginate,
        }),
        config: {
          ...DEFAULT_CONFIG,
          [FETCH_CONFIG]: {
            includeTypes: DEFAULT_INCLUDE_ENDPOINTS,
            hideTypes: false,
          },
        },
      }) as FilterType
      const elements = [objType, inst1, inst2, inst3]
      await filterWithHideType.onFetch(elements)
      expect(elements).toHaveLength(6)
      expect(elements.map(e => e.elemID.getFullName()).sort())
        .toEqual([
          'zendesk_support.automation',
          'zendesk_support.automation.instance.inst1',
          'zendesk_support.automation.instance.inst2',
          'zendesk_support.automation.instance.inst3',
          'zendesk_support.automation_order',
          'zendesk_support.automation_order.instance',
        ])
      const orderType = elements
        .find(elem => elem.elemID.getFullName() === 'zendesk_support.automation_order')
      expect(orderType).toBeDefined()
      expect(orderType?.annotations[CORE_ANNOTATIONS.HIDDEN]).not.toBeDefined()
    })
    it('should not create new elements if there are no automations', async () => {
      const elements: Element[] = []
      await filter.onFetch(elements)
      expect(elements).toHaveLength(0)
    })
  })
  describe('deploy', () => {
    const orderType = new ObjectType({ elemID: new ElemID(ZENDESK_SUPPORT, orderTypeName) })
    const before = new InstanceElement(
      ElemID.CONFIG_NAME, orderType, { [ORDER_FIELD_NAME]: [11, 22, 33] },
    )
    const after = new InstanceElement(
      ElemID.CONFIG_NAME, orderType, { [ORDER_FIELD_NAME]: [22, 33, 11] },
    )
    const change: ModificationChange<InstanceElement> = {
      action: 'modify',
      data: { before, after },
    }
    it('should pass the correct params to deployChange', async () => {
      const res = await filter.deploy([change])
      expect(res.deployResult.errors).toHaveLength(0)
      expect(res.deployResult.appliedChanges).toEqual([change])
      expect(mockDeployChange).toHaveBeenCalledTimes(1)
      const instanceToDeploy = after.clone()
      instanceToDeploy.value = {
        automations: [
          { id: 22, position: 1 },
          { id: 33, position: 2 },
          { id: 11, position: 3 },
        ],
      }
      expect(mockDeployChange).toHaveBeenCalledWith(
        {
          action: 'modify',
          data: {
            after: instanceToDeploy,
            before,
          },
        },
        expect.anything(),
        expect.anything(),
        undefined,
      )
    })
    it('should return an error if there are multiple order changes', async () => {
      const res = await filter.deploy([change, change])
      expect(res.deployResult.errors).toHaveLength(1)
      expect(res.deployResult.appliedChanges).toHaveLength(0)
      expect(mockDeployChange).toHaveBeenCalledTimes(0)
    })
    it('should return an error if the order change is not modification', async () => {
      const res = await filter.deploy([{ action: 'add', data: { after } }])
      expect(res.deployResult.errors).toHaveLength(1)
      expect(res.deployResult.appliedChanges).toHaveLength(0)
      expect(mockDeployChange).toHaveBeenCalledTimes(0)
    })
    it('should return an error if the ids are not numbers', async () => {
      const res = await filter.deploy([
        {
          action: 'modify',
          data: {
            before,
            after: new InstanceElement(
              ElemID.CONFIG_NAME, orderType, { [ORDER_FIELD_NAME]: ['22', '33'] },
            ),
          },
        },
      ])
      expect(res.deployResult.errors).toHaveLength(1)
      expect(res.deployResult.appliedChanges).toHaveLength(0)
      expect(mockDeployChange).toHaveBeenCalledTimes(0)
    })
  })
})