const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')['development']);

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});