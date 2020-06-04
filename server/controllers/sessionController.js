const db = require('../postgres');

const sessionController = {
  async checkSession(req, res, next) {
    const id = req.cookies.ssid
    const query = `
      SELECT * FROM sessions
      WHERE id = ${id};`;

    const user = await db.query(query);

    if (user.rows.length) return next();

    res.json({ loggedIn: true });
  },

  async startSession(req, res, next) {
    const ssid = res.locals.userID;
    const query = `
      INSERT INTO sessions (id, user_id, active)
      VALUES (uuid_generate_v4(), $1, '1');`;

    await db.query(query, [ssid]);
    next();
  },
};

module.exports = sessionController;
