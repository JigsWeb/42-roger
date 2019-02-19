import crypto from 'crypto'
import mongoose, { Schema } from 'mongoose'

const UsersSchema = mongoose.Schema({
    username: String,
    password: String,
    salt: String
});

UsersSchema.methods.hashPassword = function() {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

UsersSchema.methods.validPassword = function(password) {
    return this.password === crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
};

const Users = mongoose.model('Users', UsersSchema);

export default Users;