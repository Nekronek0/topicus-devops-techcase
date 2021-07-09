const express = require('express');
const serverless = require('serverless-http');

const { getTodoItems, postTodoItem } = require('./aws_db');

const app = express();

app.use(express.json());

app.get('/todoitems/', async (req, res) => {
  try {
    const { Items } = await getTodoItems();
    if (Items) {
      res.json(Items);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find ToDo items' });
    }
  } catch (error) {
    res.status(500).json({ error: `Could not retreive ToDo items: ${error}` });
  }
});

app.post('/todoitems', async (req, res) => {
  const { todoTitle, todo } = req.body;
  if (typeof todoId !== 'string') {
    res.status(400).json({ error: '"todoTitle" must be a string' });
  } else if (typeof todo !== 'string') {
    res.status(400).json({ error: '"todo" must be a string' });
  }

  try {
    await postTodoItem(todoTitle, todo);
    res.json({ todoTitle, todo });
  } catch (error) {
    res.status(500).json({ error: `Could not create todo item: ${error}` });
  }
});

app.use((req, res, next) => res.status(404).json({
  error: 'Not Found',
}));

module.exports.handler = serverless(app);
