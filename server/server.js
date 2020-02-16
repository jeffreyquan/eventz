const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = config.get('mongoURI');

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected."))
  .catch(err => console.log(err));

app.use('/api/users', require('./api/routes/userRoutes'));
app.use('/api/auth', require('./api/routes/authRoutes'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${ port }`));