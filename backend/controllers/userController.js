import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { sysMsg } from '../constant.js';

export const signin = async (req, res) => {

    const { email, password } = req.body;
    try {

        // find a user
        console.log(email + password);
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json(sysMsg[2]);
        }

        // const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        // check password 
        if (!password === existingUser.password) {
            return res.status(400).json(sysMsg[3]);
        }

        const resultSet = { result: existingUser }
        return res.status(200).json(resultSet);

    } catch (error) {
        console.log(error);
        res.status(500).json(sysMsg[1]);
    }
}

export const signup = () => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {

    } catch (error) {
        res.status(500).json(sysMsg[1]);
    }
}

export const getusers = async (req, res) => {
    const users = await User.find({});
    if (!users) {
        return res.status(400).json(sysMsg[4])
    }
    res.status(200).json(users);

}