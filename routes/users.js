const express = require('express');
const router = express.Router();

const user = require('../controllers/users');
// Bring in User Model
let User = require('../models/user');


// Register Form
router.get('/register', (req, res) => {
  user.register(req, res);
});

// Register Proccess
router.post('/register', (req, res) => {
  user.create(req, res);
});

// Login Form
router.get('/login', (req, res) => {
  user.loginform(req, res);
});

// Login Process
router.post('/login', (req, res, next) => {
  user.login(req, res, next);
});

// logout
router.get('/logout', (req, res) => {
  user.logout(req, res);

});

module.exports = router;