const express = require('express');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'poll_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.use('/api/polls', pollRoutes(db));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
