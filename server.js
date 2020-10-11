const express = require('express'),
  path = require('path'),
  config = require('./server-config'),
  mongoose = require('mongoose');

// mongoDB
const db = config.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.log('MongoDB Connection Failed: ', err));

const app = express();
const port = require('./server.json').port;
// Middleware to parse body as JSON
app.use(express.json());

/**
 * ROUTING
 */
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
// serve built static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//   });
// }

app.listen(port, () => console.log(`Server started on port ${port}.`));
