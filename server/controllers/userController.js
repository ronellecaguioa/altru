const db = require('../postgres');

const userController = {
  /**
   * Register a new user with provided username, email, and password
   */
  async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(401).json({ message: 'Please enter all fields' });
      }
      const query = `
        INSERT INTO users (id, username, email, password)
        VALUES (uuid_generate_v4(), $1, $2, crypt($3, gen_salt('bf', 10)))
        RETURNING *;`;
      let result = await db.query(query, [username, email, password]);
      result = result.rows[0];
      res.locals.userID = result.id;

      return next();
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  },

  /**
   * Check to see if supplied credentials exists in users database
   */
  async verifyUser(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(401).json({
          loggedIn: false,
          message: 'Please enter all fields',
        });
      }

      const query = `
        SELECT * FROM users
        WHERE password = crypt($1, password);`;

      let result = await db.query(query, [password]);
      result = result.rows[0];
      res.locals.userID = result.id;
      res.locals.username = username;

      if (result && result.username === username) {
        return next();
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
          loggedIn: false,
        });
      }
    } catch ({ message }) {
      res.status(400).json({
        loggedIn: false,
        message,
      });
    }
  },
};

module.exports = userController;
