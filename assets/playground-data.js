/* Real data from one Playground run (ONDC:RET11 1.2.0, local workbench). Large objects are trimmed. */
window.PLAY = {
 "meta": {
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "flowId": "Playground_Demo_Search",
  "config_version": "0.0.0001",
  "description": "",
  "use_case_id": ""
 },
 "steps": [
  {
   "action_id": "search",
   "owner": "BAP",
   "responseFor": null
  },
  {
   "action_id": "on_search",
   "owner": "BPP",
   "responseFor": "search"
  }
 ],
 "parts": [
  "generator.js",
  "validator.js",
  "requirements.js",
  "defaultPayload.json",
  "inputs.json"
 ],
 "searchSample": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "search",
   "timestamp": "2026-01-20T09:05:17.039000Z",
   "transaction_id": "7bff96fb-28c1-4b0f-82b0-c6e13beb0cfc",
   "message_id": "b00ce1b2-b91d-4634-931e-7822bb0cd34c",
   "bap_id": "sample-bap-id",
   "bap_uri": "https://bap.example.com",
   "ttl": "PT30S",
   "country": "IND",
   "city": "*",
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
        "value": " https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/0.9/tc.pdf"
       },
       {
        "code": "static_terms_new",
        "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
       },
       "… 1 more items"
      ]
     }
    ]
   }
  }
 },
 "generateFixed": "async function generate(defaultPayload, sessionData) {\n  // L1 rule TAGS_BAP_TERMS_EFFECTIVE_DATE wants YYYY-MM-DDTHH:MM:SS.sssZ\n  const terms = defaultPayload.message.intent.tags.find((t) => t.code === \"bap_terms\");\n  terms.list.find((l) => l.code === \"effective_date\").value = new Date().toISOString();\n  return defaultPayload;\n}\n",
 "ctxSearch": {
  "domain": "ONDC:RET11",
  "action": "search",
  "timestamp": "2026-09-26T15:24:05.584Z",
  "transaction_id": "368a7553-5e67-41d0-b8ec-058ebcf98960",
  "message_id": "c0df455b-1832-428e-8454-7567febfeb6e",
  "bap_id": "bap.example.com",
  "bap_uri": "https://bap.example.com",
  "ttl": "PT30S",
  "country": "IND",
  "city": "*",
  "core_version": "1.2.0"
 },
 "ctxOnSearch": {
  "domain": "ONDC:RET11",
  "action": "on_search",
  "timestamp": "2026-09-26T15:24:14.968Z",
  "transaction_id": "368a7553-5e67-41d0-b8ec-058ebcf98960",
  "message_id": "c0df455b-1832-428e-8454-7567febfeb6e",
  "bap_id": "bap.example.com",
  "bap_uri": "https://bap.example.com",
  "ttl": "PT30S",
  "bpp_id": "bpp.example.com",
  "bpp_uri": "https://bpp.example.com",
  "country": "IND",
  "city": "*",
  "core_version": "1.2.0"
 },
 "l1Nack": {
  "message": {
   "ack": {
    "status": "NACK"
   }
  },
  "error": {
   "code": "Bad Request",
   "rule": "TAGS_BAP_TERMS_EFFECTIVE_DATE",
   "message": "All elements of $.message.intent.tags[?(@.code=='bap_terms')].list[?(@.code=='effective_date')].value must follow every regex in [\"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$\"]"
  }
 },
 "l1AckSearch": {
  "message": {
   "ack": {
    "status": "ACK"
   }
  }
 },
 "l1AckOnSearch": {
  "message": {
   "ack": {
    "status": "ACK"
   }
  }
 },
 "l2": {
  "status": "Passed",
  "code": 200,
  "description": "Valid request",
  "networkCalls": 0
 },
 "fixedRun": {
  "search": {
   "at": "15:25:00.650",
   "message_id": "0343d283-6ca8-4916-9a08-858a435f238d",
   "effective_date": "2026-09-26T15:25:00.653Z"
  }
 },
 "createResp": {
  "sessionId": "kYl08PuSJHGkK3hvTj5_PK6qQ8t-SWkF",
  "subscriberUrl": "http://host.docker.internal:4200",
  "message": "Playground Session created successfully & Playground config set successfully"
 },
 "session": {
  "npType": "BPP",
  "domain": "ONDC:RET11",
  "version": "1.2.0",
  "usecaseId": "PLAYGROUND-FLOW",
  "subscriberUrl": "http://host.docker.internal:4200",
  "env": "LOGGED-IN",
  "sessionDifficulty": {
   "sensitiveTTL": false,
   "useGateway": false,
   "stopAfterFirstNack": false,
   "protocolValidations": true,
   "timeValidations": true,
   "headerValidaton": false,
   "useGzip": false,
   "encryptionValidation": false,
   "useCare": false
  }
 },
 "startReq": {
  "session_id": "kYl08PuSJHGkK3hvTj5_PK6qQ8t-SWkF",
  "flow_id": "Playground_Demo_Search",
  "transaction_id": "4ce8d04a-5861-4b7a-99d9-a1ff0d11307c"
 },
 "startResp": {
  "success": true,
  "message": "server is now responding with the mock data",
  "jobIds": [
   "GENERATE_PAYLOAD_JOB_1790436465048_2b534271-d78a-45bb-a22b-4339262862ce"
  ]
 },
 "startUrl": "http://localhost:3034/flow/new",
 "search": {
  "context": {
   "domain": "ONDC:RET11",
   "action": "search",
   "timestamp": "2026-09-26T15:27:45.068Z",
   "transaction_id": "4ce8d04a-5861-4b7a-99d9-a1ff0d11307c",
   "message_id": "1acb857c-a5b6-48e0-92c6-d41a3a561a54",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "ttl": "PT30S",
   "country": "IND",
   "city": "*",
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
        "value": " https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/0.9/tc.pdf"
       },
       {
        "code": "static_terms_new",
        "value": "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
       },
       {
        "code": "effective_date",
        "value": "2026-09-26T15:27:45.112Z"
       }
      ]
     }
    ]
   }
  }
 },
 "onSearchAck": {
  "context": {
   "action": "on_search",
   "bap_id": "api-service:80",
   "bap_uri": "http://api-service:80/api-service/ONDC:RET11/1.2.0/buyer",
   "bpp_id": "test-seller.local",
   "bpp_uri": "http://host.docker.internal:4200",
   "city": "*",
   "core_version": "1.2.0",
   "country": "IND",
   "domain": "ONDC:RET11",
   "message_id": "1acb857c-a5b6-48e0-92c6-d41a3a561a54",
   "timestamp": "2026-09-26T15:27:46.644Z",
   "transaction_id": "4ce8d04a-5861-4b7a-99d9-a1ff0d11307c",
   "ttl": "PT30S"
  },
  "message": {
   "ack": {
    "status": "ACK"
   }
  }
 },
 "lockSets": [
  {
   "at": "15:27:45.047",
   "cmd": "setex",
   "value": {
    "status": "WORKING"
   }
  },
  {
   "at": "15:27:45.145",
   "cmd": "set",
   "value": {
    "status": "AVAILABLE"
   }
  },
  {
   "at": "15:27:46.680",
   "cmd": "set",
   "value": {
    "status": "AVAILABLE"
   }
  }
 ],
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
 "sessionId": "kYl08PuSJHGkK3hvTj5_PK6qQ8t-SWkF",
 "txn": "4ce8d04a-5861-4b7a-99d9-a1ff0d11307c"
};
