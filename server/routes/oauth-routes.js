const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const cors = require('cors')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'login.html'));
});

// router.get('/github', (req, res) => {
//   res.json({ message: 'hitting github oauth route' })
// })

router.get(
  '/github',
  // cors(),
  passport.authenticate('github', {
    scope: 'user',
  })
);

router.get('/github/redirect', cors(), helper, passport.authenticate('github'), (req, res) => {
  console.log(req.query.code);
  res.send('you made it!');
});

function helper(req, res, next) {
  console.log('in helper')
  console.log('req.query', req.query.code)
  return next()
}
module.exports = router;
