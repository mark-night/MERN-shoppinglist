require('dotenv').config();

const envs = ['TOKEN_KEY', 'TOKEN_AGE', 'MONGO_URI'];
const ready = envs.map(key => {
  if (!process.env[key]) {
    console.log(`Environment variable for ${key} need to be set.`);
    return false;
  }
  return true;
});
if (!ready.every(v => v)) {
  console.log('Abort...');
  process.exit(1);
}

const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose');

// mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.log('MongoDB Connection Failed: ', err));

const app = express();
// Middleware to parse body as JSON
app.use(express.json());

/**
 * ROUTING
 */
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// serve built static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

const port = '80';
app.listen(port, () => console.log(`Server started on port ${port}.`));
