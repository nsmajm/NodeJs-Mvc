const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    userName: String,
    email: String,
    role: {
        type: String,
        default: "user"
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active"
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

module.exports.hashPassword = async (password) => {
    try {
        //get password from User Controller and hash it then return to the controller 
        const saltPass = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, saltPass);
        return hashpass;
    } catch (error) {
        console.log('err', error);

    }
}