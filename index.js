const express = require('express');

const server = express();

server.use(express.json());

const projects = [{ id: '1', title: 'Primeiro Título', tasks: ['fazer lição', 'jogar bola'] }];

server.get('/projects', (req, res) => res.json(projects));

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };
  projects.push(project);
  return res.json(projects);
});

// Change title name
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;
  res.send(projects);
});

server.listen(3000);
