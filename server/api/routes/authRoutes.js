const authController = require('../controllers/authController');

module.exports = app => {
  app
    .route('/login')
    .post(authController.loginUser)
};