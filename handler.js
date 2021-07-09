const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const { uuid } = require("uuidv4");

const app = express();

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/todoitems/", async function (req, res) {
  const params = { TableName: TODO_TABLE };

  try {
    const { Items } = await dynamoDbClient.get(params).promise();
    if (Items) {
      const { todoId, todo } = Item;
      res.json({ todoId, todo });
      res.json(Items);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find ToDo items' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive ToDo items" });
  }
});

app.post("/todoitems", async function (req, res) {
  const { todoId, todo } = req.body;
  if (typeof todoId) !== "string" {
    res.status(400).json({ error: '"todoId" must be a string' });
  } else if (typeof todo !== "string") {
    res.status(400).json({ error: '"todo" must be a string' });
  }

  const params = {
    TableName: TODO_TABLE,
    Item: {
      todoId,
      todo,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ todoId, todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create todo item" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
