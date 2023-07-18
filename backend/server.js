const express = require('express');
const cors = require('cors');
// const knex = require('knex')(require('./knexfile.js')['development']);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});