import axios from 'axios'

const url = 'http://localhost:4000'

export const createTopicAPI = async (topic) => {
    try {
        const response = await axios.post(`${url}/topic`, topic)
        console.log("createTopicAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("createTopicAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const updateTopicAPI = async (topic, id) => {
    try {
        const response = await axios.patch(`${url}/topic/${id}`, topic)
        console.log("updateTopicAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("updateTopicAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getTopicAPI = async (id) => {
    try {
        const response = await axios.get(`${url}/topic/${id}`)
        console.log("getTopicAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("getTopicAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getTopicsAPI = async () => {
    try {
        const response = await axios.get(`${url}/topic`)
        console.log("getTopicsAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("getTopicsAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const deleteTopicAPI = async (id) => {
    try {
        const response = await axios.delete(`${url}/topic/${id}`)
        console.log("deleteTopicAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("deleteTopicAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}
