import axios from 'axios'

const url = 'http://localhost:4000'

export const loginAPI = (email, password) => axios.post(`${url}/user/login`, {
    email, password
})
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })

// export const signupAPI = (name, email, password) => axios.post(`${url}/user/signup`, { name, email, password })

export const getusersAPI = () => axios.get(`${url}/user`)

