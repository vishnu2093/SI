define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/chkans",
    "title": "Check answer, provide frontend the feedback, and post to external service",
    "name": "CheckAnswer",
    "group": "Find_The_Fix",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>User-ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cid",
            "description": "<p>Category-ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qid",
            "description": "<p>Question-ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "usel",
            "description": "<p>User Selection</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n      \"uid\": \"{user-id}\",\n\t\t \"cid\": \"{category-id}\",\n\t\t \"qid\": \"{question-id}\",\n\t\t \"usel\": {user-selection}\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": 0\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"msg\": \"failure\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/routes/findAndFixRoutes.js",
    "groupTitle": "Find_The_Fix"
  },
  {
    "type": "post",
    "url": "/api/v1/enchl",
    "title": "Receive Exploitation Message and Enable the Challenge",
    "name": "EnableChallenge",
    "group": "Find_The_Fix",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>User-ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cid",
            "description": "<p>Category-ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n      \"uid\": \"{user-id}\",\n\t\t \"cid\": \"{category-id}\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"msg\": \"failure\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/routes/findAndFixRoutes.js",
    "groupTitle": "Find_The_Fix"
  },
  {
    "type": "get",
    "url": "/api/v1/stream",
    "title": "Subscribing to the Event Emitter",
    "name": "EventStream",
    "group": "Find_The_Fix",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"subscribed\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"msg\": \"failure\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/routes/findAndFixRoutes.js",
    "groupTitle": "Find_The_Fix"
  }
] });
