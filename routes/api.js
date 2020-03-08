/* eslint-disable array-callback-return */
const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../controllers/Authentication');

const router = express.Router();

// Base route dumps all of the recipes available
router.get('/', (req, res, next) => {
  Recipe.find().populate('creator').then((recipes, err) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .contentType('text/plain')
        .end('An error had occured');
    } else {
      res.end(JSON.stringify(recipes));
    }
  });
});

router.post('/create', (req, res, next) => {
  const { name } = req.body;
  let { ingredients } = req.body;
  const { directions } = req.body;

  ingredients = ingredients.split(',');

  if (!req.user) {
    res.redirect('/login');
  } else {
    const newRecipe = new Recipe({
      creator: req.user._id, name, ingredients, directions,
    });

    newRecipe.save();

    res.redirect('/');

    // res
    //   .status(200)
    //   .contentType('text')
    //   .send(req.user);
  }
});

router.post('/register', auth.registerUser);

router.post('/login', auth.loginUser);

module.exports = router;
