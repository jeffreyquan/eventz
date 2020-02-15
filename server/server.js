const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.user(cors());
app.user(express.urlencoded())

const db = "mongodb://127.0.0.1/eventz_server";

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, {
    useNewUrlParser: true
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${ port }`));