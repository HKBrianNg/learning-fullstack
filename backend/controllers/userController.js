import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { sysMsg } from '../constant.js'
import mongoose from "mongoose"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)
        const token = createToken(user._id)
        // console.log("loginUser(200):", { email, token })
        res.status(200).json({ email, token })
    } catch (error) {
        // console.log("loginUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }
}

export const signupUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body
        const user = await User.signup(id, name, email, password)
        const token = createToken(user._id)
        // console.log("signupUser(200):", { email, token })
        res.status(200).json({ email, token })
    } catch (error) {
        // console.log("signupUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body
        const newuser = await User.signup(id, name, email, password)
        // console.log("createUser(200):", newuser)
        res.status(200).json(newuser)
    } catch (error) {
        // console.log("signupUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(400).json(sysMsg[4])
        }
        // console.log("getUser(200):", users)
        res.status(200).json(users)
    } catch (error) {
        // console.log("getUser(400):", { error: error.message })
        res.status(400).json({ error: error.message })
    }

}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(sysMsg[2])
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json(sysMsg[4])
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(sysMsg[2])
        }
        const user = await User.findOneAndDelete({ _id: id })

        if (!user) {
            return res.status(404).json(sysMsg[4])
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json(sysMsg[2])
        }

        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body
        })

        if (!user) {
            return res.status(404).json(sysMsg[4])
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
