/*
*                      Copyright 2021 Salto Labs Ltd.
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
import { ChangeValidator, getChangeElement } from '@salto-io/adapter-api'

export const deployNotSupportedValidator: ChangeValidator = async changes => (
  changes.map(change => ({
    elemID: getChangeElement(change).elemID,
    severity: 'Error',
    message: `Deploy is not supported in adapter ${getChangeElement(change).elemID.adapter}.`,
    detailedMessage: 'Deploy is not supported.',
  }))
)