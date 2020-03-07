/* eslint-disable array-callback-return */
const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../controllers/Authentication');

const router = express.Router();

// Base route dumps all of the recipes available
router.get('/', (req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .contentType('text/plain')
        .end('An error had occured');
    } else {
      res
        .status(200)
        .contentType('text/json')
        .end(`${recipes}`);
    }
  });
});

router.post('/register', auth.registerUser);

router.post('/login', auth.loginUser);

module.exports = router;
