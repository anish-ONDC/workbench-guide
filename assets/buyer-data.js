/* Real data from one buyer app test run (ONDC:RET11 1.2.0 F&B, local workbench). Large objects are trimmed. */
window.BUYER = {
 "sessionReq": {
  "subscriberUrl": "http://host.docker.internal:4100",
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "usecaseId": "F&B",
  "npType": "BAP",
  "env": "PRE-PRODUCTION",
  "config": ""
 },
 "sessionResp": {
  "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "subscriberUrl": "http://host.docker.internal:4100",
  "message": "Session created successfully"
 },
 "flow": {
  "id": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "sequence": [
   {
    "key": "search",
    "owner": "BAP",
    "pair": "on_search",
    "expect": true,
    "input": [
     "city_code"
    ]
   },
   {
    "key": "on_search",
    "owner": "BPP",
    "pair": null,
    "expect": false,
    "input": [
     "area_code"
    ]
   }
  ]
 },
 "session": {
  "npType": "BAP",
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "usecaseId": "F&B",
  "subscriberUrl": "http://host.docker.internal:4100",
  "env": "PRE-PRODUCTION",
  "transactionIds": [],
  "flowMap": {},
  "flowConfigs": "{ 10 flows: step lists for every RET11 1.2.0 F&B flow }"
 },
 "startReq": {
  "session_id": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "flow_id": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "transaction_id": "22a6b253-f710-42b8-92bc-60ba9b4c01dc"
 },
 "startResp": {
  "success": true,
  "message": "Mock Service is now listening for the next action"
 },
 "expectation": {
  "activeSessions": [
   {
    "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
    "flowId": "Search_and_Custom_Menu_(Full_Catalog_City)",
    "expectedAction": "search",
    "expireAt": "2026-09-25T10:04:15.522Z"
   }
  ]
 },
 "searchHeaders": {
  "Content-Type": "application/json",
  "Authorization": "Signature keyId=\"test-buyer.local|test-buyer-ukid-1|ed25519\",algorithm=\"ed25519\",created=\"1790330384\",expires=\"1790333984\",headers=\"(created) (expires) digest\",signature=\"U5PPBxQr8Ic5HJ1jXPk0ZDtgaaFc2Z1d27gkraMcak1UMebptyaB4YbkXT1+lt+4PJ/IHsIM6WBWaFhUWbYVDA==\""
 },
 "searchBody": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "search",
   "country": "IND",
   "city": "std:080",
   "core_version": "1.2.0",
   "bap_id": "test-buyer.local",
   "bap_uri": "http://host.docker.internal:4100",
   "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
   "message_id": "37301506-64e8-4f20-aa8b-d525018a9db5",
   "timestamp": "2026-09-25T09:59:44.996Z",
   "ttl": "PT30S"
  },
  "message": {
   "intent": {
    "payment": {
     "@ondc/org/buyer_app_finder_fee_type": "percent",
     "@ondc/org/buyer_app_finder_fee_amount": "3"
    },
    "tags": [
     {
      "code": "bap_terms",
      "list": [
       {
        "code": "static_terms",
        "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
       },
       {
        "code": "static_terms_new",
        "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
       },
       {
        "code": "effective_date",
        "value": "2026-09-25T09:59:44.996Z"
       }
      ]
     }
    ]
   }
  }
 },
 "lookupReq": {
  "subscriber_id": "test-buyer.local",
  "ukId": "test-buyer-ukid-1"
 },
 "lookupResp": [
  {
   "subscriber_id": "test-buyer.local",
   "ukId": "test-buyer-ukid-1",
   "signing_public_key": "PMUuVLYMu59Cwb73uvUxnaj14jMLnh/PAxY15Ojro+4=",
   "type": "BAP"
  }
 ],
 "searchAck": {
  "context": {
   "action": "search",
   "bap_id": "test-buyer.local",
   "bap_uri": "http://host.docker.internal:4100",
   "city": "std:080",
   "core_version": "1.2.0",
   "country": "IND",
   "domain": "ONDC:RET11",
   "message_id": "37301506-64e8-4f20-aa8b-d525018a9db5",
   "timestamp": "2026-09-25T09:59:44.996Z",
   "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
   "ttl": "PT30S"
  },
  "message": {
   "ack": {
    "status": "ACK"
   }
  }
 },
 "histSearch": {
  "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "flowId": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "latestAction": "search",
  "apiList": [
   {
    "action": "search",
    "messageId": "37301506-64e8-4f20-aa8b-d525018a9db5",
    "payloadId": "1322beff-83be-48c1-8a45-6d879d2a5206",
    "realTimestamp": "2026-09-25T09:59:45.083644219Z",
    "response": {
     "message": {
      "ack": {
       "status": "ACK"
      }
     }
    }
   }
  ]
 },
 "histOnSearch": {
  "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "flowId": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "latestAction": "on_search",
  "apiList": [
   {
    "action": "search",
    "messageId": "37301506-64e8-4f20-aa8b-d525018a9db5",
    "payloadId": "1322beff-83be-48c1-8a45-6d879d2a5206",
    "realTimestamp": "2026-09-25T09:59:45.083644219Z",
    "response": {
     "message": {
      "ack": {
       "status": "ACK"
      }
     }
    }
   },
   {
    "action": "on_search",
    "messageId": "37301506-64e8-4f20-aa8b-d525018a9db5",
    "payloadId": "55c71d79-b316-4831-93df-73dbc58ab381",
    "realTimestamp": "2026-09-25T10:00:53.7487895Z",
    "response": {
     "message": {
      "ack": {
       "status": "ACK"
      }
     }
    }
   }
  ]
 },
 "notesSearch": {
  "transactionId": [
   "6ca121c1-e4eb-4fee-97ce-d760ed55731c"
  ],
  "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
  "subscriberUrl": "http://host.docker.internal:4100",
  "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "mockBaseUrl": "http://localhost:3031/mock/playground",
  "latestMessage_id": [
   "37301506-64e8-4f20-aa8b-d525018a9db5"
  ],
  "latestTimestamp": [
   "2026-09-25T09:59:44.996Z"
  ],
  "bapId": [
   "test-buyer.local"
  ],
  "bapUri": [
   "http://host.docker.internal:4100"
  ],
  "bppId": [],
  "bppUri": [],
  "city": [
   "std:080"
  ]
 },
 "notesOnSearch": {
  "transactionId": [
   "6ca121c1-e4eb-4fee-97ce-d760ed55731c"
  ],
  "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
  "subscriberUrl": "http://host.docker.internal:4100",
  "sessionId": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "mockBaseUrl": "http://localhost:3031/mock/playground",
  "latestMessage_id": [
   "37301506-64e8-4f20-aa8b-d525018a9db5"
  ],
  "latestTimestamp": [
   "2026-09-25T10:00:53.688Z"
  ],
  "bapId": [
   "test-buyer.local"
  ],
  "bapUri": [
   "http://host.docker.internal:4100"
  ],
  "bppId": [
   "api-service:80"
  ],
  "bppUri": [
   "http://api-service:80/api-service/ONDC:RET11/1.2.0/seller"
  ],
  "city": [
   "std:080"
  ]
 },
 "needsInput": {
  "success": true,
  "message": "sequence step \"on_search\" needs inputs",
  "inputs": [
   {
    "name": "ExampleInputId",
    "schema": {
     "properties": {
      "area_code": {
       "type": "string",
       "description": "Enter the area code",
       "default": "144203"
      }
     },
     "required": [
      "area_code"
     ]
    }
   }
  ]
 },
 "statusInput": [
  {
   "actionId": "search",
   "status": "COMPLETE"
  },
  {
   "actionId": "on_search",
   "status": "INPUT-REQUIRED"
  }
 ],
 "proceedReq": {
  "session_id": "8D_67XdMvPuqnCYqeMsAVA0NJ-pHuFSF",
  "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
  "json_path_changes": {},
  "inputs": {
   "area_code": "144203"
  }
 },
 "proceedResp": {
  "success": true,
  "message": "server is now responding with the mock data",
  "jobIds": [
   "GENERATE_PAYLOAD_JOB_1790330453675_4a2d9207-d7d7-4fb5-8d77-40e371e98a34"
  ]
 },
 "onSearch": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "on_search",
   "timestamp": "2026-09-25T10:00:53.688Z",
   "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
   "message_id": "37301506-64e8-4f20-aa8b-d525018a9db5",
   "bap_id": "test-buyer.local",
   "bap_uri": "http://host.docker.internal:4100",
   "ttl": "PT30S",
   "bpp_id": "api-service:80",
   "bpp_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/seller",
   "country": "IND",
   "city": "std:080",
   "core_version": "1.2.0"
  },
  "message": {
   "catalog": {
    "bpp/providers": [
     {
      "id": "P1",
      "descriptor": {
       "name": "Store 1"
      },
      "items": [
       {
        "id": "I1",
        "time": {
         "label": "enable",
         "timestamp": "2025-01-08T07:30:00Z"
        },
        "rating": "4",
        "descriptor": {
         "name": "Farm House Pizza",
         "symbol": "https://snp.com/images/i1.png",
         "short_desc": "Farm House Pizza",
         "long_desc": "Farm House Pizza",
         "images": [
          "https://snp.com/images/i1.png"
         ]
        },
        "quantity": {
         "unitized": {
          "measure": {
           "unit": "unit",
           "value": "1"
          }
         },
         "available": {
          "count": "99"
         },
         "maximum": {
          "count": "99"
         }
        },
        "price": {
         "currency": "INR",
         "value": "269.00",
         "maximum_value": "269.00",
         "tags": [
          {
           "code": "range",
           "list": [
            {
             "code": "lower",
             "value": "269.00"
            },
            {
             "code": "upper",
             "value": "894.00"
            }
           ]
          }
         ]
        },
        "category_id": "F&B",
        "category_ids": [
         "5:1"
        ],
        "fulfillment_id": "F1",
        "location_id": "L1",
        "related": false,
        "recommended": true,
        "@ondc/org/returnable": false,
        "@ondc/org/cancellable": false,
        "@ondc/org/return_window": "PT1H",
        "@ondc/org/seller_pickup_return": false,
        "@ondc/org/time_to_ship": "PT45M",
        "@ondc/org/available_on_cod": false,
        "@ondc/org/contact_details_consumer_care": "Ramesh,ramesh@abc.com,18004254444",
        "tags": [
         {
          "code": "type",
          "list": [
           {
            "code": "type",
            "value": "item"
           }
          ]
         },
         {
          "code": "custom_group",
          "list": [
           {
            "code": "id",
            "value": "CG1"
           }
          ]
         },
         {
          "code": "timing",
          "list": [
           {
            "code": "day_from",
            "value": "1"
           },
           {
            "code": "day_to",
            "value": "5"
           },
           {
            "code": "time_from",
            "value": "1800"
           },
           {
            "code": "time_to",
            "value": "2200"
           }
          ]
         },
         {
          "code": "veg_nonveg",
          "list": [
           {
            "code": "veg",
            "value": "yes"
           }
          ]
         }
        ]
       },
       {
        "id": "C1",
        "descriptor": {
         "name": "New Hand Tossed"
        },
        "quantity": {
         "unitized": {
          "measure": {
           "unit": "unit",
           "value": "1"
          }
         },
         "available": {
          "count": "99"
         },
         "maximum": {
          "count": "99"
         }
        },
        "price": {
         "currency": "INR",
         "value": "0.00",
         "maximum_value": "0.00"
        },
        "category_id": "F&B",
        "related": true,
        "tags": [
         {
          "code": "type",
          "list": [
           {
            "code": "type",
            "value": "customization"
           }
          ]
         },
         {
          "code": "parent",
          "list": [
           {
            "code": "id",
            "value": "CG1"
           },
           {
            "code": "default",
            "value": "yes"
           }
          ]
         },
         {
          "code": "child",
          "list": [
           {
            "code": "id",
            "value": "CG2"
           }
          ]
         },
         {
          "code": "veg_nonveg",
          "list": [
           {
            "code": "veg",
            "value": "yes"
           }
          ]
         }
        ],
        "time": {
         "label": "enable",
         "timestamp": "2025-01-08T07:30:00Z"
        }
       }
      ]
     }
    ]
   }
  }
 },
 "onSearchAuth": "Signature keyId=\"api-service:80|27baa06d-d91a-486c-85e5-cc621b787f04|ed25519\",algorithm=\"ed25519\",created=\"1790330453\",expires=\"1790330753\",headers=\"(created) (expires) digest\",signature=\"J93y+JlquTNNenaOJu91Vj6um1fmtEnjY85FFiHHNHEoJTbIwN6UsJxsTkF1sg9QFxyU1nI6RvRD70ydyGPbBw==\"",
 "onSearchItems": 29,
 "onSearchAck": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "on_search",
   "timestamp": "2026-09-25T10:00:53.688Z",
   "transaction_id": "6ca121c1-e4eb-4fee-97ce-d760ed55731c",
   "message_id": "37301506-64e8-4f20-aa8b-d525018a9db5",
   "bap_id": "test-buyer.local",
   "bap_uri": "http://host.docker.internal:4100",
   "ttl": "PT30S",
   "bpp_id": "api-service:80",
   "bpp_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/seller",
   "country": "IND",
   "city": "std:080",
   "core_version": "1.2.0"
  },
  "message": {
   "ack": {
    "status": "ACK"
   }
  }
 },
 "statusDone": [
  {
   "actionId": "search",
   "status": "COMPLETE",
   "subStatus": "SUCCESS"
  },
  {
   "actionId": "on_search",
   "status": "COMPLETE",
   "subStatus": "SUCCESS"
  }
 ]
};
