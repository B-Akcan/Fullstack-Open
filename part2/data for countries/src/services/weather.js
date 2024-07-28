import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
const city_url = "http://api.openweathermap.org/geo/1.0/direct?"
const coord_url = "https://api.openweathermap.org/data/2.5/weather?"
const icon_url = "https://openweathermap.org/img/wn/"

export const getCoordinatesOfCity = (city) => {
    const request = axios.get(city_url + `q=${city}` + "&" + `appid=${api_key}`)
    return request.then(response => {return {lat: response.data[0].lat, lon: response.data[0].lon}})
}

export const getWeatherFromCoordinates = (coordinates) => {
    const request = axios.get(coord_url + `lat=${coordinates.lat}` + "&" + `lon=${coordinates.lon}`
        + "&" + `exclude=minutely,hourly,daily,alerts` + "&" + `units=metric` + "&" + `appid=${api_key}`)

    return request.then(response => {
        return {
            temp: response.data.main.temp,
            windSpeed: response.data.wind.speed,
            iconName: response.data.weather[0].icon
        }
    })
}

export const getIconFromIconName = (iconName) => {
    const request = axios.get(icon_url + iconName + "@2x.png")
    return request.then(response => response.config.url)
}