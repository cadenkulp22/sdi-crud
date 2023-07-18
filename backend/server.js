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
    // res.status(201).send(newUser);
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
        // bcrypt.compare()
        res.send(data[0].password);
      } else {
        res.send('not found');
      }
    })
    .catch(err => res.send(err))
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});