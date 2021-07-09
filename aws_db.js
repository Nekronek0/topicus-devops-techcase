const AWS = require('aws-sdk');

const { TODO_TABLE } = process.env;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const getTodoItems = () => dynamoDbClient.scan({ TableName: TODO_TABLE }).promise();

const postTodoItem = (todoId, todo) => {
  const params = {
    TableName: TODO_TABLE,
    Item: {
      todoId,
      todo,
    },
  };
  return dynamoDbClient.put(params).promise();
};

module.exports = { getTodoItems, postTodoItem };
