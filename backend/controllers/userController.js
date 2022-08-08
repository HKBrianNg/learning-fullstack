import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { sysMsg } from '../constant.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find a user
        console.log(email + password);
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json(sysMsg[2]);
        }

        // const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        // check password 
        if (!password === existingUser.password) {
            return res.status(404).json(sysMsg[3]);
        }

        const resultSet = { result: existingUser }
        return res.status(200).json(resultSet);

    } catch (error) {
        console.log(error);
        res.status(400).json(sysMsg[1]);
    }
}

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.signup(name, email, password)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(400).json(sysMsg[4])
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(sysMsg[1]);
    }

}