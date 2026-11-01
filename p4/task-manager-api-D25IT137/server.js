const express = require('express');
const app = express();

let tasks = [
  { id: 1, title: 'Learn Node.js basics', completed: true },
  { id: 2, title: 'Build Express REST API', completed: false },
  { id: 3, title: 'Understand Express Middleware', completed: false }
];
let nextId = 4;

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Content-Type validator for POST/PUT
const requireJsonContent = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Content-Type header must be application/json for POST and PUT requests'
      });
    }
  }
  next();
};

app.use(requireJsonContent);

// ID validation middleware
const validateTaskId = (req, res, next) => {
  const idParam = req.params.id;
  const parsedId = parseInt(idParam, 10);

  if (isNaN(parsedId) || parsedId.toString() !== idParam || parsedId <= 0) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: `Task ID '${idParam}' must be a positive integer`
    });
  }

  req.taskId = parsedId;
  next();
};

// CRUD Routes
app.get('/tasks', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

app.get('/tasks/:id', validateTaskId, (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({ error: 'Not Found', message: `Task with ID ${req.taskId} not found` });
  }
  res.status(200).json({ success: true, data: task });
});

app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Validation Error', message: 'Task title is required' });
  }
  const newTask = { id: nextId++, title: title.trim(), completed: !!completed };
  tasks.push(newTask);
  res.status(201).json({ success: true, message: 'Task created successfully', data: newTask });
});

app.put('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Task with ID ${req.taskId} not found` });
  }
  const { title, completed } = req.body;
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Validation Error', message: 'Task title must be non-empty string' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Validation Error', message: 'Completed must be a boolean' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(title !== undefined && { title: title.trim() }),
    ...(completed !== undefined && { completed })
  };
  res.status(200).json({ success: true, message: 'Task updated successfully', data: tasks[taskIndex] });
});

app.delete('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Task with ID ${req.taskId} not found` });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({ success: true, message: `Task ${req.taskId} deleted`, data: deletedTask });
});

app.get('/cause-error', (req, res, next) => {
  next(new Error('Simulated internal server error'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Cannot ${req.method} ${req.url} - Endpoint does not exist` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[Error Logged]: ${err.stack}`);
  res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong on the server' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
