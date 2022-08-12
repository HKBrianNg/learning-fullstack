import axios from 'axios'

const url = 'http://localhost:4000'

export const createVideoAPI = async (video) => {
    try {
        const response = await axios.post(`${url}/video`, video)
        console.log("createVideoAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("createVideoAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const updateVideoAPI = async (video, id) => {
    try {
        const response = await axios.patch(`${url}/video/${id}`, video)
        console.log("updateVideoAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("updateVideoAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getVideoAPI = async (id) => {
    try {
        const response = await axios.get(`${url}/video/${id}`)
        console.log("getVideoAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("getVideoAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const getVideosAPI = async () => {
    try {
        const response = await axios.get(`${url}/video`)
        console.log("getVideosAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("getVideosAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}

export const deleteVideoAPI = async (id) => {
    try {
        const response = await axios.delete(`${url}/video/${id}`)
        console.log("deleteVideoAPI() success:", response)
        return { okStatus: true, data: response.data }
    } catch (error) {
        console.log("deleteVideoAPI() error:", error.response.data.error)
        return { okStatus: false, data: error.response.data.error }
    }
}
