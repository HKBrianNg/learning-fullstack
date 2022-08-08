import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.statics.signup = async function (name, email, password) {
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