import axios from 'axios'

export const googleAuth = (code) => axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/authInfo?code=${code}`)

export const userData = async () => {
    const token = localStorage.getItem("userToken")
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/userData`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(response.data.user)
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}