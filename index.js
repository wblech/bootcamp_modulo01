const express = require('express');

const server = express();

server.use(express.json());

const projects = [{ id: '1', title: 'Primeiro Título', tasks: ['fazer lição', 'jogar bola'] }];
let num = 0;

// MiddleWare - Verify id the ID number exists
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(400).json({ error: "Project doesn't exists" });
  }
  return next();
}

// MiddleWare - Count requisitions
function logRequisitions(req, res, next) {
  num += 1;
  console.log(`There has been ${num} HTTP requisitions`);
  next();
}

server.use(logRequisitions);

// Get all posts
server.get('/projects', (req, res) => res.json(projects));

// Create new post
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };
  projects.push(project);
  return res.json(projects);
});

// Change title name
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;
  res.send(projects);
});

// Add new task
server.put('/projects/:id/task', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push(title);
  res.send(projects);
});

// Add delete
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex);
  res.send(projects);
});

server.listen(3000);
