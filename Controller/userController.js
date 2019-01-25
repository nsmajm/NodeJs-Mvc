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
    editProfile:async(req,res,next)=>{
        
    }

}