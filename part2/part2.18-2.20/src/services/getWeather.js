import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (capital) => {
    const request = axios.get(`${baseUrl}/current.json?key=${apiKey}&q=${capital}`)
    return request.then(response => response.data)
}

export default { getWeather }