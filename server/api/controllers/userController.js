const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const config = require('config');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
  
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: 'Please enter all fields.'});
  }

  User.findOne({ email })
    .then(user => {
      console.log(user);
      if (user) return res.status(400).send({ error: 'User already exists.'});
      console.log('Whoo');
      const newUser = new User({
        name,
        email,
        password
      });

      console.log(newUser);

      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
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
            });
        })
      })
    })
};
