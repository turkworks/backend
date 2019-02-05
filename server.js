const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

const { authenticate, generateToken } = require("../config/middleware");

//----------------GET Countries------------------------DONE
server.get("/countries", (req, res) => {
  db("country")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

//----------------POST-Register Cooordinator------------DONE
server.post("/register", (req, res) => {
  const coordinatorInfo = req.body;
  const hash = bcrypt.hashSync(coordinatorInfo.password, 14);
  coordinatorInfo.password = hash;

  db("coordinator")
    .insert(coordinatorInfo)
    .then(name => {
      res.status(201).json(name);
    })
    .catch(err => res.status(500).json({ message: "registry failed" }));
});

//----------------POST-Login Cooordinator----------------In Progress

server.post("/login", (req, res) => {
  const cred = req.body;

  console.log(req.body);
  db("coordinator")
    .where({ username: cred.username })
    .first()
    .then(coordinator => {
      if (
        coordinator &&
        bcrypt.compareSync(cred.password, coordinator.password)
      ) {
        const token = generateToken(coordinator);
        res
          .status(200)
          .json({ message: `welcome ${coordinator.username}`, token });
      } else {
        res.status(401).json({ you: "shall not pass, human!" });
      }
    })

    .catch(err => res.status(500).json({ message: "login failed" }));
});

//-----------------STORIES ENDPOINTS-----------------------------------

server.get("/stories", (req, res) => {
  db("stories")
    .then(story => {
      res.status(200).json(story);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/stories/:id", (req, res) => {
  db("stories")
    .where({ id: req.params.id })
    .then(story => {
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({ message: "story not found" });
      }
    });
});

server.post("/stories", (req, res) => {
  db("stories")
    .insert(req.body)
    .then(story => {
      res.status(201).json(story);
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/stories/:id", (req, res) => {
  db("stories")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.put("/stories/:id", (req, res) => {
  const changes = req.body;

  db("stories")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Story not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
