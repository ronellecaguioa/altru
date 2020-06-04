const router = require('express').Router();
const db = require('../postgres');
const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');

/**
 * @route   POST /auth/register
 * @desc    User creates an account with username, email, and password
 * @access  Public
 */
router.post(
  '/register',
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.json({ message: 'User succesfully created' })
  }
);

/**
 * @route   POST /auth/login
 * @desc    User attempts to log in with supplied username and email
 * @access  Public
 */
router.post('/login', async (req, res) => {});

module.exports = router;
