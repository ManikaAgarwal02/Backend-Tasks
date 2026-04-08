const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON


let users = [
  { id: 1, name: "Manika", age: 20 },
  { id: 2, name: "Rahul", age: 22 }
];



app.get("/users", (req, res) => {
  res.json(users);
});



app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});



app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(newUser);
  res.status(201).json(newUser);
});



app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  user.age = req.body.age;

  res.json(user);
});



app.patch("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  if (req.body.name) user.name = req.body.name;
  if (req.body.age) user.age = req.body.age;

  res.json(user);
});



app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});