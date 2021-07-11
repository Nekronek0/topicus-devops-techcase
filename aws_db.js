const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

const { TODO_TABLE } = process.env;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const getTodoItems = () => dynamoDbClient.scan({ TableName: TODO_TABLE }).promise();

const postTodoItem = (todoTitle, todo) => {
  const params = {
    TableName: TODO_TABLE,
    Item: {
      todoId: uuid(),
      todoTitle,
      todo,
      todoDone: false,
    },
  };
  return dynamoDbClient.put(params).promise();
};

module.exports = { getTodoItems, postTodoItem, updateTodoItem };
