const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  items = require("./routes/api/items");

// mongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("MongoDB Connection Failed: ", err));

const app = express();
const port = process.env.PORT || 5000;
// Body-parser Middleware
app.use(bodyParser.json());
// routing: route all request to /api/items/* to module items.
app.use("/api/items", items);
app.listen(port, () => console.log(`Server started on port ${port}.`));
