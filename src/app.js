const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();


const repositoryExists = (request, response, next) => {
  const id = request.params.id;
  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0)
    return response.status(400).json({ message: 'Repository not exists!' });

  request.body.index = index;
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
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs, index } = request.body;
  const repository = {
    id,
    title: title || repositories[index].title,
    url: url || repositories[index].url,
    techs: techs || repositories[index].techs,
    likes: repositories[index].likes
  }

  repositories[index] = repository;
  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const index = request.body.index;
  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const index = request.body.index;
  repositories[index].likes++;

  return response.status(201).json(repositories[index]);
});

module.exports = app;
