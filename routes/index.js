/* eslint-disable array-callback-return */
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Regal Recipes' });
});

module.exports = router;
