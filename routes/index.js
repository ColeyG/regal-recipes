/* eslint-disable array-callback-return */
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.user) {
    res.render('index', { user: req.user });
  } else {
    res.render('index');
  }
});

module.exports = router;
