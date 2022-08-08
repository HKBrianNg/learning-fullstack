import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { sysMsg } from '../constant.js';

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

// static login method
userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error(sysMsg[7])
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error(sysMsg[10])
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error(sysMsg[3])
    }

    return user
}

// static signup method
userSchema.statics.signup = async function (name, email, password) {

    // validation
    if (!name || !email || !password) {
        throw Error(sysMsg[7])
    }
    if (!validator.isEmail(email)) {
        throw Error(sysMsg[8])
    }
    if (!validator.isStrongPassword(password)) {
        throw Error(sysMsg[9])
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error(sysMsg[6])
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ name, email, password: hash })
    return user
}

export default mongoose.model("users", userSchema);