const express = require('express');

const router = require('express-promise-router')();

const userController = require('../Controller/userController');

const AuthController = require('../Controller/AuthController');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/profile/:id', userController.getProfile);
router.post('/profile/edit/:id', userController.editProfile);
module.exports = router;