import axios from 'axios'

const url = 'http://localhost:4000'

export const signupAPI = async (user) => {
    try {
        const response = await axios.post(`${url}/user/signup`, user)
        // console.log("signupAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("signupAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const loginAPI = async (user) => {
    try {
        const response = await axios.post(`${url}/user/login`, user)
        // console.log("loginAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("loginAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getUsersAPI = async (user) => {
    try {
        const response = await axios.get(`${url}/user`)
        // console.log("getusersAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("getusersAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getUserAPI = async (id) => {
    try {
        const response = await axios.get(`${url}/user/${id}`)
        // console.log("getUserAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("getUserAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const deleteUserAPI = async (id) => {
    try {
        const response = await axios.delete(`${url}/user/${id}`)
        // console.log("deleteUserAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("deleteUserAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const updateUserAPI = async (user, id) => {
    try {
        const response = await axios.patch(`${url}/user/${id}`, user)
        // console.log("updateUserAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("updateUserAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const createUserAPI = async (user) => {
    try {
        const response = await axios.post(`${url}/user`, user)
        // console.log("signupAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        // console.log("signupAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}
