const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/userModel");

exports.loginUser = (req, res) => {
  
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) return res.state(500).send('Error on the server.');
    if (!user) return res.status(404).send('User not found.');

    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(401).send({ auth: false, token: null })

        jwt.sign(
          { id: user.id },
          config.get('jwtScret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        )
      })
  })
}