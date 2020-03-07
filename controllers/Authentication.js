/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User');

const userController = {};

userController.home = (req, res) => {
  res.render('index', { user: req.user });
};

userController.register = (req, res) => {
  res.render('pages/register');
};

userController.registerUser = (req, res) => {
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, (err, user) => {
    if (err) {
      return res.render('register', { user });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};

userController.login = (req, res) => {
  res.render('pages/login');
};

userController.loginUser = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/');
  });
};

userController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
