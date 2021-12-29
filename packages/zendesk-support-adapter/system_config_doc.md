# Zendesk Support system configuration
## Default Configuration
```hcl
zendesk_support {
  apiDefinitions = {
    typeDefaults = {
      request = {
        paginationField = "next_page"
      }
      transformation = {
        idFields = [
          "name",
          "id",
        ]
        fileNameFields = [
          "name",
        ]
        fieldsToOmit = [
          {
            fieldName = "created_at"
            fieldType = "string"
          },
          {
            fieldName = "updated_at"
            fieldType = "string"
          },
          {
            fieldName = "extended_input_schema"
          },
          {
            fieldName = "extended_output_schema"
          },
          {
            fieldName = "url"
            fieldType = "string"
          },
          {
            fieldName = "count"
            fieldType = "number"
          },
        ]
      }
    }
    types = {
      group = {
        transformation = {
          sourceTypeName = "groups__groups"
        }
        deployRequests = {
          add = {
            url = "/groups"
            deployAsField = "group"
            method = "post"
          }
          modify = {
            url = "/groups/{groupId}"
            method = "put"
            deployAsField = "group"
            urlParamsToFields = {
              groupId = "id"
            }
          }
          remove = {
            url = "/groups/{groupId}"
            method = "delete"
            deployAsField = "group"
            urlParamsToFields = {
              groupId = "id"
            }
          }
        }
      }
      custom_role = {
        transformation = {
          sourceTypeName = "custom_roles__custom_roles"
        }
        deployRequests = {
          add = {
            url = "/custom_roles"
            deployAsField = "custom_role"
            method = "post"
          }
          modify = {
            url = "/custom_roles/{customRoleId}"
            method = "put"
            deployAsField = "custom_role"
            urlParamsToFields = {
              customRoleId = "id"
            }
          }
          remove = {
            url = "/custom_roles/{customRoleId}"
            method = "delete"
            deployAsField = "custom_role"
            urlParamsToFields = {
              customRoleId = "id"
            }
          }
        }
      }
      organization = {
        transformation = {
          sourceTypeName = "organizations__organizations"
        }
        deployRequests = {
          add = {
            url = "/organizations"
            deployAsField = "organization"
            method = "post"
          }
          modify = {
            url = "/organizations/{organizationId}"
            method = "put"
            deployAsField = "organization"
            urlParamsToFields = {
              organizationId = "id"
            }
          }
          remove = {
            url = "/organizations/{organizationId}"
            method = "delete"
            deployAsField = "organization"
            urlParamsToFields = {
              organizationId = "id"
            }
          }
        }
      }
      view = {
        transformation = {
          sourceTypeName = "views__views"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/views"
            deployAsField = "view"
            method = "post"
          }
          modify = {
            url = "/views/{viewId}"
            method = "put"
            deployAsField = "view"
            urlParamsToFields = {
              viewId = "id"
            }
          }
          remove = {
            url = "/views/{viewId}"
            method = "delete"
            deployAsField = "view"
            urlParamsToFields = {
              viewId = "id"
            }
          }
        }
      }
      trigger = {
        transformation = {
          sourceTypeName = "triggers__triggers"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/triggers"
            deployAsField = "trigger"
            method = "post"
          }
          modify = {
            url = "/triggers/{triggerId}"
            method = "put"
            deployAsField = "trigger"
            urlParamsToFields = {
              triggerId = "id"
            }
          }
          remove = {
            url = "/triggers/{triggerId}"
            method = "delete"
            deployAsField = "trigger"
            urlParamsToFields = {
              triggerId = "id"
            }
          }
        }
      }
      trigger_category = {
        transformation = {
          sourceTypeName = "trigger_categories__trigger_categories"
          fileNameFields = [
            "name",
          ]
        }
        deployRequests = {
          add = {
            url = "/trigger_categories"
            deployAsField = "trigger_category"
            method = "post"
          }
          modify = {
            url = "/trigger_categories/{triggerCategoryId}"
            method = "patch"
            deployAsField = "trigger_category"
            urlParamsToFields = {
              triggerCategoryId = "id"
            }
          }
          remove = {
            url = "/trigger_categories/{triggerCategoryId}"
            method = "delete"
            deployAsField = "trigger_category"
            urlParamsToFields = {
              triggerCategoryId = "id"
            }
          }
        }
      }
      automation = {
        transformation = {
          sourceTypeName = "automations__automations"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/automations"
            deployAsField = "automation"
            method = "post"
          }
          modify = {
            url = "/automations/{automationId}"
            method = "put"
            deployAsField = "automation"
            urlParamsToFields = {
              automationId = "id"
            }
          }
          remove = {
            url = "/automations/{automationId}"
            method = "delete"
            deployAsField = "automation"
            urlParamsToFields = {
              automationId = "id"
            }
          }
        }
      }
      sla_policy = {
        transformation = {
          sourceTypeName = "sla_policies__sla_policies"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/slas/policies"
            deployAsField = "sla_policy"
            method = "post"
          }
          modify = {
            url = "/slas/policies/{slaPolicyId}"
            method = "put"
            deployAsField = "sla_policy"
            urlParamsToFields = {
              slaPolicyId = "id"
            }
          }
          remove = {
            url = "/slas/policies/{slaPolicyId}"
            method = "delete"
            deployAsField = "sla_policy"
            urlParamsToFields = {
              slaPolicyId = "id"
            }
          }
        }
      }
      sla_policy_definition = {
        transformation = {
          sourceTypeName = "sla_policies_definitions__definitions"
          isSingleton = true
        }
      }
      target = {
        transformation = {
          sourceTypeName = "targets__targets"
          idFields = [
            "title",
            "type",
          ]
        }
        deployRequests = {
          add = {
            url = "/targets"
            deployAsField = "target"
            method = "post"
          }
          modify = {
            url = "/targets/{targetId}"
            method = "put"
            deployAsField = "target"
            urlParamsToFields = {
              targetId = "id"
            }
          }
          remove = {
            url = "/targets/{targetId}"
            method = "delete"
            deployAsField = "target"
            urlParamsToFields = {
              targetId = "id"
            }
          }
        }
      }
      macro = {
        transformation = {
          sourceTypeName = "macros__macros"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/macros"
            deployAsField = "macro"
            method = "post"
          }
          modify = {
            url = "/macros/{macroId}"
            method = "put"
            deployAsField = "macro"
            urlParamsToFields = {
              macroId = "id"
            }
          }
          remove = {
            url = "/macros/{macroId}"
            method = "delete"
            deployAsField = "macro"
            urlParamsToFields = {
              macroId = "id"
            }
          }
        }
      }
      macro_action = {
        transformation = {
          sourceTypeName = "macros_actions__actions"
        }
      }
      macro_category = {
        transformation = {
          sourceTypeName = "macros_categories__categories"
        }
      }
      macro_definition = {
        transformation = {
          sourceTypeName = "macros_definitions__definitions"
          isSingleton = true
        }
      }
      brand = {
        transformation = {
          sourceTypeName = "brands__brands"
          fieldTypeOverrides = [
            {
              fieldName = "help_center_state"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "enabled",
                  "disabled",
                  "restricted",
                ]
              }
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/brands"
            deployAsField = "brand"
            method = "post"
          }
          modify = {
            url = "/brands/{brandId}"
            method = "put"
            deployAsField = "brand"
            urlParamsToFields = {
              brandId = "id"
            }
          }
          remove = {
            url = "/brands/{brandId}"
            method = "delete"
            deployAsField = "brand"
            urlParamsToFields = {
              brandId = "id"
            }
          }
        }
      }
      locale = {
        transformation = {
          sourceTypeName = "locales__locales"
          idFields = [
            "locale",
          ]
          fileNameFields = [
            "locale",
          ]
        }
      }
      business_hours_schedule = {
        transformation = {
          sourceTypeName = "business_hours_schedules__schedules"
        }
        deployRequests = {
          add = {
            url = "/business_hours/schedules"
            deployAsField = "schedule"
            method = "post"
          }
          modify = {
            url = "/business_hours/schedules/{scheduleId}"
            method = "put"
            deployAsField = "schedule"
            urlParamsToFields = {
              scheduleId = "id"
            }
          }
          remove = {
            url = "/business_hours/schedules/{scheduleId}"
            method = "delete"
            deployAsField = "schedule"
            urlParamsToFields = {
              scheduleId = "id"
            }
          }
        }
      }
      sharing_agreement = {
        transformation = {
          sourceTypeName = "sharing_agreements__sharing_agreements"
          fieldTypeOverrides = [
            {
              fieldName = "status"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "accepted",
                  "declined",
                  "pending",
                  "inactive",
                ]
              }
            },
            {
              fieldName = "type"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "inbound",
                  "outbound",
                ]
              }
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/sharing_agreements"
            deployAsField = "sharing_agreement"
            method = "post"
          }
          modify = {
            url = "/sharing_agreements/{sharingAgreementId}"
            method = "put"
            deployAsField = "sharing_agreement"
            urlParamsToFields = {
              sharingAgreementId = "id"
            }
          }
          remove = {
            url = "/sharing_agreements/{sharingAgreementId}"
            method = "delete"
            deployAsField = "sharing_agreement"
            urlParamsToFields = {
              sharingAgreementId = "id"
            }
          }
        }
      }
      recipient_address = {
        transformation = {
          sourceTypeName = "recipient_addresses__recipient_addresses"
          fieldTypeOverrides = [
            {
              fieldName = "cname_status"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "unknown",
                  "verified",
                  "failed",
                ]
              }
            },
            {
              fieldName = "dns_results"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "verified",
                  "failed",
                ]
              }
            },
            {
              fieldName = "domain_verification_status"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "unknown",
                  "verified",
                  "failed",
                ]
              }
            },
            {
              fieldName = "forwarding_status"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "unknown",
                  "waiting",
                  "verified",
                  "failed",
                ]
              }
            },
            {
              fieldName = "spf_status"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "unknown",
                  "verified",
                  "failed",
                ]
              }
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/recipient_addresses"
            deployAsField = "recipient_address"
            method = "post"
          }
          modify = {
            url = "/recipient_addresses/{supportAddressId}"
            method = "put"
            deployAsField = "recipient_address"
            urlParamsToFields = {
              supportAddressId = "id"
            }
          }
          remove = {
            url = "/recipient_addresses/{supportAddressId}"
            method = "delete"
            deployAsField = "recipient_address"
            urlParamsToFields = {
              supportAddressId = "id"
            }
          }
        }
      }
      ticket_form = {
        transformation = {
          sourceTypeName = "ticket_forms__ticket_forms"
        }
        deployRequests = {
          add = {
            url = "/ticket_forms"
            deployAsField = "ticket_form"
            method = "post"
          }
          modify = {
            url = "/ticket_forms/{ticketFormId}"
            method = "put"
            deployAsField = "ticket_form"
            urlParamsToFields = {
              ticketFormId = "id"
            }
          }
          remove = {
            url = "/ticket_forms/{ticketFormId}"
            method = "delete"
            deployAsField = "ticket_form"
            urlParamsToFields = {
              ticketFormId = "id"
            }
          }
        }
      }
      ticket_field = {
        transformation = {
          sourceTypeName = "ticket_fields__ticket_fields"
          idFields = [
            "type",
            "title",
            "id",
          ]
          fileNameFields = [
            "type",
            "title",
          ]
          standaloneFields = [
            {
              fieldName = "custom_field_options"
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/ticket_fields"
            deployAsField = "ticket_field"
            method = "post"
          }
          modify = {
            url = "/ticket_fields/{ticketFieldId}"
            method = "put"
            deployAsField = "ticket_field"
            urlParamsToFields = {
              ticketFieldId = "id"
            }
          }
          remove = {
            url = "/ticket_fields/{ticketFieldId}"
            method = "delete"
            deployAsField = "ticket_field"
            urlParamsToFields = {
              ticketFieldId = "id"
            }
          }
        }
      }
      user_field = {
        transformation = {
          sourceTypeName = "user_fields__user_fields"
          idFields = [
            "key",
          ]
          standaloneFields = [
            {
              fieldName = "custom_field_options"
            },
          ]
          fieldTypeOverrides = [
            {
              fieldName = "type"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "checkbox",
                  "date",
                  "decimal",
                  "dropdown",
                  "integer",
                  "regexp",
                  "text",
                  "textarea",
                ]
              }
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/user_fields"
            deployAsField = "user_field"
            method = "post"
          }
          modify = {
            url = "/user_fields/{userFieldId}"
            method = "put"
            deployAsField = "user_field"
            urlParamsToFields = {
              userFieldId = "id"
            }
          }
          remove = {
            url = "/user_fields/{userFieldId}"
            method = "delete"
            deployAsField = "user_field"
            urlParamsToFields = {
              userFieldId = "id"
            }
          }
        }
      }
      organization_field = {
        transformation = {
          sourceTypeName = "organization_fields__organization_fields"
          idFields = [
            "key",
          ]
          standaloneFields = [
            {
              fieldName = "custom_field_options"
            },
          ]
          fieldTypeOverrides = [
            {
              fieldName = "type"
              fieldType = "string"
              restrictions = {
                enforce_value = true
                values = [
                  "checkbox",
                  "date",
                  "decimal",
                  "dropdown",
                  "integer",
                  "regexp",
                  "text",
                  "textarea",
                ]
              }
            },
          ]
        }
        deployRequests = {
          add = {
            url = "/organization_fields"
            deployAsField = "organization_field"
            method = "post"
          }
          modify = {
            url = "/organization_fields/{organizationFieldId}"
            method = "put"
            deployAsField = "organization_field"
            urlParamsToFields = {
              organizationFieldId = "id"
            }
          }
          remove = {
            url = "/organization_fields/{organizationFieldId}"
            method = "delete"
            deployAsField = "organization_field"
            urlParamsToFields = {
              organizationFieldId = "id"
            }
          }
        }
      }
      routing_attribute = {
        transformation = {
          sourceTypeName = "routing_attributes__attributes"
        }
        deployRequests = {
          add = {
            url = "/routing/attributes"
            deployAsField = "attribute"
            method = "post"
          }
          modify = {
            url = "/routing/attributes/{attributeId}"
            method = "put"
            deployAsField = "attribute"
            urlParamsToFields = {
              attributeId = "id"
            }
          }
          remove = {
            url = "/routing/attributes/{attributeId}"
            method = "delete"
            deployAsField = "attribute"
            urlParamsToFields = {
              attributeId = "id"
            }
          }
        }
      }
      routing_attribute_definition = {
        transformation = {
          sourceTypeName = "routing_attribute_definitions__definitions"
          hasDynamicFields = true
          isSingleton = true
        }
      }
      workspace = {
        transformation = {
          sourceTypeName = "workspaces__workspaces"
          idFields = [
            "title",
            "id",
          ]
          fileNameFields = [
            "title",
          ]
        }
        deployRequests = {
          add = {
            url = "/workspaces"
            deployAsField = "workspace"
            method = "post"
          }
          modify = {
            url = "/workspaces/{workspaceId}"
            method = "put"
            deployAsField = "workspace"
            urlParamsToFields = {
              workspaceId = "id"
            }
          }
          remove = {
            url = "/workspaces/{workspaceId}"
            method = "delete"
            deployAsField = "workspace"
            urlParamsToFields = {
              workspaceId = "id"
            }
          }
        }
      }
      app_installation = {
        transformation = {
          sourceTypeName = "app_installations__installations"
          fieldsToOmit = [
            {
              fieldName = "created_at"
              fieldType = "string"
            },
            {
              fieldName = "updated_at"
              fieldType = "string"
            },
            {
              fieldName = "extended_input_schema"
            },
            {
              fieldName = "extended_output_schema"
            },
            {
              fieldName = "url"
              fieldType = "string"
            },
            {
              fieldName = "count"
              fieldType = "number"
            },
            {
              fieldName = "updated"
              fieldType = "string"
            },
          ]
          idFields = [
            "settings.name",
            "id",
          ]
          fileNameFields = [
            "settings.name",
          ]
        }
        deployRequests = {
          add = {
            url = "/apps/installations"
            deployAsField = "installation"
            method = "post"
          }
          modify = {
            url = "/apps/installations/{appInstallationId}"
            method = "put"
            deployAsField = "installation"
            urlParamsToFields = {
              appInstallationId = "id"
            }
          }
          remove = {
            url = "/apps/installations/{appInstallationId}"
            method = "delete"
            deployAsField = "installation"
            urlParamsToFields = {
              appInstallationId = "id"
            }
          }
        }
      }
      app_owned = {
        transformation = {
          sourceTypeName = "apps_owned__apps"
        }
      }
      oauth_client = {
        transformation = {
          sourceTypeName = "oauth_clients__clients"
        }
        deployRequests = {
          add = {
            url = "/oauth/clients"
            deployAsField = "client"
            method = "post"
          }
          modify = {
            url = "/oauth/clients/{oauthClientId}"
            method = "put"
            deployAsField = "client"
            urlParamsToFields = {
              oauthClientId = "id"
            }
          }
          remove = {
            url = "/oauth/clients/{oauthClientId}"
            method = "delete"
            deployAsField = "client"
            urlParamsToFields = {
              oauthClientId = "id"
            }
          }
        }
      }
      oauth_global_client = {
        transformation = {
          sourceTypeName = "oauth_global_clients__global_clients"
        }
      }
      account_setting = {
        transformation = {
          sourceTypeName = "account_settings__settings"
          isSingleton = true
        }
        deployRequests = {
          modify = {
            url = "/account/settings"
            method = "put"
            deployAsField = "settings"
          }
        }
      }
      resource_collection = {
        transformation = {
          sourceTypeName = "resource_collections__resource_collections"
        }
      }
      monitored_twitter_handle = {
        transformation = {
          sourceTypeName = "monitored_twitter_handles__monitored_twitter_handles"
        }
      }
      groups = {
        request = {
          url = "/groups"
        }
        transformation = {
          dataField = "groups"
        }
      }
      custom_roles = {
        request = {
          url = "/custom_roles"
        }
        transformation = {
          dataField = "custom_roles"
        }
      }
      organizations = {
        request = {
          url = "/organizations"
        }
        transformation = {
          dataField = "organizations"
        }
      }
      views = {
        request = {
          url = "/views"
        }
        transformation = {
          dataField = "views"
          fileNameFields = [
            "title",
          ]
        }
      }
      triggers = {
        request = {
          url = "/triggers"
        }
      }
      trigger_categories = {
        request = {
          url = "/trigger_categories"
          paginationField = "links.next"
        }
        transformation = {
          dataField = "trigger_categories"
        }
      }
      automations = {
        request = {
          url = "/automations"
        }
        transformation = {
          dataField = "automations"
        }
      }
      sla_policies = {
        request = {
          url = "/slas/policies"
        }
      }
      sla_policies_definitions = {
        request = {
          url = "/slas/policies/definitions"
        }
        transformation = {
          dataField = "value"
        }
      }
      targets = {
        request = {
          url = "/targets"
        }
      }
      macros = {
        request = {
          url = "/macros"
        }
        transformation = {
          dataField = "macros"
        }
      }
      macros_actions = {
        request = {
          url = "/macros/actions"
        }
        transformation = {
          dataField = "."
          isSingleton = true
        }
      }
      macro_categories = {
        request = {
          url = "/macros/categories"
        }
        transformation = {
          isSingleton = true
        }
      }
      macros_definitions = {
        request = {
          url = "/macros/definitions"
        }
      }
      brands = {
        request = {
          url = "/brands"
        }
        transformation = {
          dataField = "brands"
        }
      }
      dynamic_content_item = {
        request = {
          url = "/dynamic_content/items"
        }
        transformation = {
          dataField = "."
        }
        deployRequests = {
          add = {
            url = "/dynamic_content/items"
            deployAsField = "item"
            method = "post"
          }
          modify = {
            url = "/dynamic_content/items/{dynamicContentItemId}"
            method = "put"
            deployAsField = "item"
            urlParamsToFields = {
              dynamicContentItemId = "id"
            }
          }
          remove = {
            url = "/dynamic_content/items/{dynamicContentItemId}"
            method = "delete"
            deployAsField = "item"
            urlParamsToFields = {
              dynamicContentItemId = "id"
            }
          }
        }
      }
      locales = {
        request = {
          url = "/locales"
        }
        transformation = {
          dataField = "locales"
        }
      }
      business_hours_schedules = {
        request = {
          url = "/business_hours/schedules"
        }
      }
      sharing_agreements = {
        request = {
          url = "/sharing_agreements"
        }
      }
      recipient_addresses = {
        request = {
          url = "/recipient_addresses"
        }
        transformation = {
          sourceTypeName = "recipient_addresses"
          dataField = "recipient_addresses"
        }
      }
      ticket_forms = {
        request = {
          url = "/ticket_forms"
        }
        transformation = {
          dataField = "ticket_forms"
        }
      }
      ticket_fields = {
        request = {
          url = "/ticket_fields"
        }
        transformation = {
          dataField = "ticket_fields"
          fileNameFields = [
            "title",
          ]
        }
      }
      user_fields = {
        request = {
          url = "/user_fields"
        }
      }
      organization_fields = {
        request = {
          url = "/organization_fields"
        }
      }
      routing_attributes = {
        request = {
          url = "/routing/attributes"
        }
      }
      routing_attribute_definitions = {
        request = {
          url = "/routing/attributes/definitions"
        }
        transformation = {
          dataField = "definitions"
        }
      }
      workspaces = {
        request = {
          url = "/workspaces"
        }
      }
      app_installations = {
        request = {
          url = "/apps/installations"
        }
      }
      apps_owned = {
        request = {
          url = "/apps/owned"
        }
      }
      oauth_clients = {
        request = {
          url = "/oauth/clients"
        }
      }
      oauth_global_clients = {
        request = {
          url = "/oauth/global_clients"
        }
      }
      account_settings = {
        request = {
          url = "/account/settings"
        }
        transformation = {
          dataField = "settings"
        }
      }
      resource_collections = {
        request = {
          url = "/resource_collections"
        }
      }
      monitored_twitter_handles = {
        request = {
          url = "/channels/twitter/monitored_twitter_handles"
        }
      }
    }
  }
}
```