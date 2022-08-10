import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { sysMsg } from '../constant.js'

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)
        const token = createToken(user._id)
        console.log("loginUser(200):", { email, token })
        res.status(200).json({ email, token })
    } catch (error) {
        console.log("loginUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }
}

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.signup(name, email, password)
        const token = createToken(user._id)
        console.log("signupUser(200):", { email, token })
        res.status(200).json({ email, token })
    } catch (error) {
        console.log("signupUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(400).json(sysMsg[4])
        }
        console.log("getUser(200):", users)
        res.status(200).json(users)
    } catch (error) {
        console.log("getUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }

}