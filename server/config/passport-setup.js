const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const db = require('../postgres');
require('dotenv/config');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('profile => \n\n', profile);
        const query = `
        SELECT * FROM users
        WHERE githubid = '${profile.id}';`;

        const user = await db.query(query);

        if (user.rows.length) {
          return done(null, user.rows[0]);
        } else {
          const insertInto = `
          INSERT INTO users (id, githubid, name, username, email)
          VALUES (uuid_generate_v4(), $1, $2, $3, $4)
          RETURNING *;`;

          const newUser = await db.query(insertInto, [
            profile.id,
            profile.displayName,
            profile.username,
            profile.email,
          ]);

          return done(null, newUser.rows[0]);
        }
      } catch (err) {
        console.log('ERROR', err.message);
        return done(err);
      }
    }
  )
);
