const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/userModel');

exports.loginUser = (req, res) => {

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) return res.state(500).send({ message: 'Server error.' });
    if (!user) return res.status(404).send({ message: 'User does not exist.' });

    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).send({ message: 'Incorret password.', auth: false, token: null })

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
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

exports.loadUser = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
};
