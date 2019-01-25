const userModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
module.exports = {
    registerUser: async (req, res, next) => {
        const findUser = await userModel.findOne({ 'email': req.body.email });
        /*
        check the user Status that email exists or not
        */
        if (findUser) {
            res.status(200).json({
                success: false,
                message: "User Exists"
            });
        }
        else {

            const newPassword = await userModel.hashPassword(req.body.password);
            req.body.password = newPassword;
            const user = new userModel(req.body);
            await user.save();
            jwt.sign({ user }, 'secretKey', { expiresIn: 60 * 60 }, (err, token) => {
                console.log('token', token);
                res.status(200).json({
                    success: true,
                    token: token,
                    message: "User Registered"
                });
            });
        }
    },
    login: async (req, res, next) => {
        const findUser = await userModel.findOne({ 'email': req.body.email });
        if (!findUser) {
            res.status(400).json({
                message: "User Not Found",
                success: false
            });
        }
        else {
            const getpassword = req.body.password;
            const checkpassword = await bcrypt.compare(req.body.password, findUser.password, function (err, result) {
                if (err) {
                    res.status(200).json({
                        message: "Invalid Password",
                        susccss: false
                    });
                }
                else {
                    if (result == false) {
                        res.status(200).json({
                            message: "Invalid Password",
                            susccss: false
                        });
                    }
                    else {
                        jwt.sign({ findUser }, 'secretKey', { expiresIn: 60 * 60 }, (err, token) => {
                            console.log('token', token)
                            res.status(200).json({
                                token: token,
                                susccss: true
                            });
                        });
                    }
                }
            });
        }
    },
    logout: async (req, res, next) => {

    },
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();

        }
        else {
            res.sendStatus(403);
        }
    },

}