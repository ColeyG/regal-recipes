const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../controllers/Authentication');

const router = express.Router();

router.get('/register', auth.register);

router.get('/login', auth.login);

router.get('/logout', auth.logout);

router.get('/usertest', (req, res, next) => {
  if (!req.user) {
    res.render('pages/usertest', { user: 'Not logged in' });
  } else {
    res.render('pages/usertest', { user: 'Logged in' });
  }
});

module.exports = router;
