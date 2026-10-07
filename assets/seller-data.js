/* Real data from one seller app test run (ONDC:RET11 1.2.0 F&B, local workbench). Large objects are trimmed. */
window.SELLER = {
 "sessionReq": {
  "subscriberUrl": "http://host.docker.internal:4200",
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "usecaseId": "F&B",
  "npType": "BPP",
  "env": "PRE-PRODUCTION",
  "config": ""
 },
 "sessionResp": {
  "sessionId": "i_9WV2MTwS9xv7C9-lmC9M7MFJEtYaCp",
  "subscriberUrl": "http://host.docker.internal:4200",
  "message": "Session created successfully"
 },
 "session": {
  "npType": "BPP",
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "usecaseId": "F&B",
  "subscriberUrl": "http://host.docker.internal:4200",
  "env": "PRE-PRODUCTION",
  "transactionIds": [],
  "flowMap": {},
  "flowConfigs": "{ 10 flows: step lists for every RET11 1.2.0 F&B flow }"
 },
 "startReq": {
  "session_id": "i_9WV2MTwS9xv7C9-lmC9M7MFJEtYaCp",
  "flow_id": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "transaction_id": "c0dc8073-4e09-4273-a1bb-c517cecf5daf"
 },
 "needsInputs": {
  "success": true,
  "message": "sequence step \"search\" needs inputs",
  "inputs": [
   {
    "name": "ExampleInputId",
    "type": "ExampleInputId",
    "schema": {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "type": "object",
     "properties": {
      "city_code": {
       "type": "string",
       "description": "Enter the city code",
       "minLength": 1
      }
     },
     "required": [
      "city_code"
     ],
     "additionalProperties": false
    }
   }
  ]
 },
 "flowNewReq": {
  "session_id": "i_9WV2MTwS9xv7C9-lmC9M7MFJEtYaCp",
  "flow_id": "Search_and_Custom_Menu_(Full_Catalog_City)",
  "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
  "json_path_changes": {},
  "inputs": {
   "city_code": "std:080"
  }
 },
 "flowNewResp": {
  "success": true,
  "message": "server is now responding with the mock data",
  "jobIds": [
   "GENERATE_PAYLOAD_JOB_1790435621785_e085a965-17b5-4020-9282-2d2d543ea72e"
  ]
 },
 "search": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "search",
   "timestamp": "2026-09-26T15:13:41.801Z",
   "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
   "message_id": "d677fac3-03f4-4c0f-b575-de47d2330e7b",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "ttl": "PT30S",
   "country": "IND",
   "city": "std:080",
   "core_version": "1.2.0"
  },
  "message": {
   "intent": {
    "payment": {
     "@ondc/org/buyer_app_finder_fee_type": "percent",
     "@ondc/org/buyer_app_finder_fee_amount": "3.54"
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
        "value": "2026-10-06T15:13:41.829Z"
       }
      ]
     }
    ]
   }
  }
 },
 "searchAuth": "Signature keyId=\"api-service:80|27baa06d-d91a-486c-85e5-cc621b787f04|ed25519\",algorithm=\"ed25519\",created=\"1790435621\",expires=\"1790435921\",headers=\"(created) (expires) digest\",signature=\"dKKB0TG6UpBEBZ0/vnGMs+X2vDrLTMFFa5wi623AeWnqec1aBKvLSH90EbC4xdZgPfYpjmGkf+1Q8nvjc6jbCQ==\"",
 "searchReply": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "search",
   "timestamp": "2026-09-26T15:13:41.801Z",
   "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
   "message_id": "d677fac3-03f4-4c0f-b575-de47d2330e7b",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "ttl": "PT30S",
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
 "searchSig": "valid",
 "notesSearch": {
  "transactionId": [
   "44da059b-fabb-4478-a30a-a87007d562ce"
  ],
  "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
  "subscriberUrl": "http://host.docker.internal:4200",
  "sessionId": "i_9WV2MTwS9xv7C9-lmC9M7MFJEtYaCp",
  "mockBaseUrl": "http://localhost:3031/mock/playground",
  "latestMessage_id": [
   "d677fac3-03f4-4c0f-b575-de47d2330e7b"
  ],
  "latestTimestamp": [
   "2026-09-26T15:13:41.801Z"
  ],
  "bapId": [
   "api-service:80"
  ],
  "bapUri": [
   "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer"
  ],
  "bppId": [],
  "bppUri": [],
  "city": [
   "std:080"
  ]
 },
 "mockUrl": "http://api-service:80/api-service/ONDC:RET11/1.2.0/mock/search?subscriber_url=http://host.docker.internal:4200&flow_id=Search_and_Custom_Menu_(Full_Catalog_City)&session_id=i_9WV2MTwS9xv7C9-lmC9M7MFJEtYaCp",
 "onSearch": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "on_search",
   "country": "IND",
   "city": "std:080",
   "core_version": "1.2.0",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "bpp_id": "test-seller.local",
   "bpp_uri": "http://host.docker.internal:4200",
   "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
   "message_id": "d677fac3-03f4-4c0f-b575-de47d2330e7b",
   "timestamp": "2026-09-26T15:13:43.374Z",
   "ttl": "PT30S"
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
         "… 2 more items"
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
         "… 2 more items"
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
 "onSearchAuth": "Signature keyId=\"test-seller.local|test-seller-ukid-1|ed25519\",algorithm=\"ed25519\",created=\"1790435623\",expires=\"1790439223\",headers=\"(created) (expires) digest\",signature=\"RpTzcUMoWNhgvJAYkT8/TPxiLT3qnlIzoBlR5WKe4Y6bvNOGLnXVOc6AEe8hzX61SYWS/ZWNRQbWwa7fMZP3CA==\"",
 "onSearchUrl": "http://localhost:3032/api-service/ONDC:RET11/1.2.0/buyer/on_search",
 "onSearchItems": 29,
 "lookupReq": {
  "subscriber_id": "test-seller.local",
  "ukId": "test-seller-ukid-1"
 },
 "lookupResp": [
  {
   "subscriber_id": "test-seller.local",
   "ukId": "test-seller-ukid-1",
   "signing_public_key": "4qxb3FG8nae8LnDj6ejYy8NbVV7XkQzU7JcvpI8F1LM=",
   "encr_public_key": "",
   "type": "BPP"
  }
 ],
 "onSearchAck": {
  "context": {
   "action": "on_search",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "bpp_id": "test-seller.local",
   "bpp_uri": "http://host.docker.internal:4200",
   "city": "std:080",
   "core_version": "1.2.0",
   "country": "IND",
   "domain": "ONDC:RET11",
   "message_id": "d677fac3-03f4-4c0f-b575-de47d2330e7b",
   "timestamp": "2026-09-26T15:13:43.374Z",
   "transaction_id": "44da059b-fabb-4478-a30a-a87007d562ce",
   "ttl": "PT30S"
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
 ],
 "lockSets": [
  {
   "at": "15:13:41.784",
   "cmd": "setex",
   "value": {
    "status": "WORKING"
   }
  },
  {
   "at": "15:13:41.878",
   "cmd": "set",
   "value": {
    "status": "AVAILABLE"
   }
  },
  {
   "at": "15:13:43.454",
   "cmd": "set",
   "value": {
    "status": "AVAILABLE"
   }
  }
 ]
};
