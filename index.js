const express = require('express');

const server = express();

const projects = [
  {
    id: '01',
    title: 'primeiro titulo',
    tasks: ['fazer algo', 'comer jacaré'],
  },
];

server.get('/projects', (req, res) => res.Json(projects));

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title });
  return res.Json(projects);
});
server.listen(3000);
