const router = require('express').Router();
const db = require('../postgres');
const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

/**
 * @route   POST /auth/register
 * @desc    User creates an account with username, email, and password
 * @access  Public
 */
router.post(
  '/register',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.json({ message: 'User succesfully created' });
  }
);

/**
 * @route   POST /auth/login
 * @desc    User attempts to log in with supplied username and email
 * @access  Public
 */
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.json({
      message: `Successfully logged in as user ${res.locals.username}`,
      loggedIn: true,
    });
  }
);

module.exports = router;
