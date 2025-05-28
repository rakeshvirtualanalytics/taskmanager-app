const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const task = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.map(t =>
    t.id === parseInt(id) ? { ...t, completed: !t.completed } : t
  );
  res.sendStatus(200);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
