const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();


const repositoryExists = (request, response, next) => {
  const id = request.params.id;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
    return response.status(400).json({ message: 'Repository not exists!' });

  request.body.repositoryIndex = repositoryIndex;
  return next();
}

// middlewares
app.use(express.json());
app.use(cors());

app.use('/repositories/:id', repositoryExists);

// routes
const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);
  return response.status(201).json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs, repositoryIndex } = request.body;
  const repository = {
    id,
    title: title || repositories[repositoryIndex].title,
    url: url || repositories[repositoryIndex].url,
    techs: techs || repositories[repositoryIndex].techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const repositoryIndex = request.body.repositoryIndex;
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const repositoryIndex = request.body.repositoryIndex;
  repositories[repositoryIndex].likes++;

  return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;
