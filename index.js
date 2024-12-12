const express = require("express");
const fs = require('fs');
const path = require('path');
const joi = require("joi");

const crypto = require('crypto') 

const app = express();
app.use(express.json());
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));



const userScheme = joi.object({
    first_name: joi.string().min(1).required(),
    second_name: joi.string().min(1).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(1)
});
let uniqueId = 0;

app.get("/users", (req, res) => {
  res.send( users );
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === userId);
  
    if (user) {
      res.send({ user });
    } else {
      res.status(404);
      res.send({ user: null});
    }
  });

app.post("/users", (req, res) => {
  uniqueId = crypto.randomBytes(8).toString('hex') ;
 users.push({
  id : uniqueId,
  ...req.body
 })
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
  res.send({id: uniqueId});
});

app.put("/users/:id", (req, res) => {
  const result = userScheme.validate(req.body);

  if (result.error) {
    return res.status(404).send({error: result.error.details});
  }
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  if (user) {
    const { first_name, second_name, age, city } = req.body;
    user.first_name = first_name;
    user.second_name = second_name;
    user.age = age;
    user.city = city;
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === userId);
  
    if (user) {
     const userIndex = users.indexOf(user);
     users.splice(userIndex,1);
     fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
     res.send({user});
    } else {
      res.status(404);
      res.send({ user: null });
    }
  });
app.listen(4000);
