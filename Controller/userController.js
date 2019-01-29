const UserModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
module.exports = {
    getProfile: async (req, res, next) => {
        const userId = req.params.id;
        const findUser = await UserModel.findById(userId);
        if (!findUser) {
            res.status(400).json({
                message: "User Not found"
            });
        }
        else {
            jwt.sign({ findUser }, 'secretKey', { expiresIn: 60 * 60 }, (err, token) => {
                res.status(200).json({
                    token: token,
                    susccss: true
                });
            });
        }
    },
    editProfile: async (req, res, next) => {
        const findUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if (err) res.status(400).json({ message: "Invalid Request" });
            else res.status(200).json({
                message: "User Updated Successfully",
                newUser: user
            });
        });
    },

    deleteProfile: async (req, res, next) => {
        const findUser = await UserModel.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) res.json(err);
            else
                res.status(200).json("User Deleted");
        })
    }

}