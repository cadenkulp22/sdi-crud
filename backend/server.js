const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')['development']);
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  knex('user_account')
    .select('*')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err))
});

app.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword
    };
    knex('user_account')
      .insert(newUser)
      .then(() => res.status(201).send({ success: true }))
      .catch(err => res.status(501).send(err))
  } catch {
    res.status(500).send();
  }
});

app.post('/users/login', (req, res) => {
  knex('user_account')
    .select('*')
    .where('username', req.body.username)
    .then(data => {
      if (data.length > 0) {
        bcrypt.compare(req.body.password, data[0].password)
          .then(found => {
            // res.cookie('userId', data[0].id);
            if (found) {
              let responseObj = {
                userExists: found,
                ...data[0]
              }
              res.send(responseObj);
            } else {
              let responseObj = {
                userExists: found
              }
              res.send(responseObj);
            }
          })
          .catch(err => res.status(500).send(err));
      } else {
        res.send(false);
      }
    })
    .catch(err => res.status(500).send(err))
});

app.get('/inventory', (req, res) => {
  const { userId } = req.query;
  // const userId = req.cookies.userId;
  console.log(req.cookies)
  if (userId !== undefined) {
    knex('item')
      .select('*')
      .where('user_id', userId)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  } else {
    knex('item')
      .select('*')
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  }
});

app.post('/inventory', (req, res) => {
  const newItem = {
    user_id: req.body.user_id,
    item_name: req.body.item_name,
    description: req.body.description,
    quantity: req.body.quantity
  }
  knex('item')
    .insert(newItem)
    .then(() => res.status(201).send(newItem))
    .catch(err => res.status(501).send(err))
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});