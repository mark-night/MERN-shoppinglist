const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  items = require('./routes/api/items');

// mongoDB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.log('MongoDB Connection Failed: ', err));

const app = express();
const port = process.env.PORT || 5000;
// Body-parser Middleware
app.use(bodyParser.json());
// routing: route all request to /api/items/* to module items.
app.use('/api/items', items);
// serve built static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}
app.listen(port, () => console.log(`Server started on port ${port}.`));
