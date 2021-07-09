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

const updateTodoItem = (todoId, updatedTodoTitle, updatedTodo, todoDone) => {
  dynamoDbClient
    .update({
      TableName: TODO_TABLE,
      Key: {
        id: todoId,
      },
      UpdateExpression: 'set todoTitle= :todoTitle, todo = :todo, todoDone = :todoDone',
      ExpressionAttributeValues: {
        ':todoTitle': updatedTodoTitle,
        ':todo': updatedTodo,
        ':todoDone': todoDone,
      },
    });
};

module.exports = { getTodoItems, postTodoItem, updateTodoItem };
