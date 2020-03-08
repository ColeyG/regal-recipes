/* eslint-disable array-callback-return */
const express = require('express');
const auth = require('../controllers/Authentication');

const router = express.Router();

router.get('/create', (req, res, next) => {
  res.render('pages/create', { user: req.user });
});

module.exports = router;
