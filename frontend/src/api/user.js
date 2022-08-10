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

export const getusersAPI = async (user) => {
    try {
        const response = await axios.get(`${url}/user`)
        console.log("getusersAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("getusersAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}