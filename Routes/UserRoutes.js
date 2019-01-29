const express = require('express');

const router = require('express-promise-router')();

const userController = require('../Controller/userController');

const AuthController = require('../Controller/AuthController');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/profile/:id', AuthController.verifyToken, userController.getProfile);
router.post('/profile/edit/:id', AuthController.verifyToken, userController.editProfile);
router.post('/profile/delete/:id', userController.deleteProfile);


// router.post('/token', AuthController.authorizationCheck);
router.get('/test', AuthController.verifyToken, async (req, res, next) => {
    res.json("Connected");
});
module.exports = router;