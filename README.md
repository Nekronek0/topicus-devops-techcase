### DEVOPS TEST CASE

This is the test case I developed. I used the Serverless framework to deploy my API on AWS.

The API is configured as follows: 

####`GET /todoitems`
Returns JSON with all the todo items
Input: -
Output:
JSON containing:
- todoId (string): ID of the todo item (UUIDv4)
- todoTitle (string): title for the todo item
- todo (string): the description for the todo item
- todoDone (boolean)

Example input:
```bash
curl --request GET 'https://xxxxxxxxxx.execute-api.eu-central-1.amazonaws.com/dev/todoitems'

```

Example output:

```json
[
  {
    "todoDone":false,
    "todoId":"21ef03c7-5f2a-49fd-b891-48896de33ea1",
    "todoTitle":"provide documentation",
    "todo":"add readme"
  },
  {
    "todoId":"cd9088a6-6671-4cab-827f-4eca18be0091",
    "todoTitle":"optional stuff",
    "todo":"add optional CRUD ops"
  }
]
```
####`POST /todoitems`
Add a new todo item to the todolist
Input:
JSON containing:
- todoTitle (string): title for the todo item
- todo (string): the description for the todo item

Output:
JSON containing:
- todoId (string): ID of the todo item (UUIDv4)
- todoTitle (string): title for the todo item
- todo (string): the description for the todo item
- todoDone (boolean)

Example input:
```bash
curl --request POST 'https://xxxxxxxxxx.execute-api.eu-central-1.amazonaws.com/dev/todoitems' --header 'Content-Type: application/json' --data-raw '{"todo": "add update", "todoTitle": "optional stuff"}'

```

Example output:
```json
{"todo": "add update", "todoTitle": "optional stuff"}

```