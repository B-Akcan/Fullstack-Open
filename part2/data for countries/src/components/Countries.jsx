import { useEffect, useState } from "react"
import * as weatherServices from "../services/weather"

const Countries = ({countries, shownCountries, showHandler}) => {
    const countriesToShow = []
    for (let i=0; i<countries.length; i++)
    {
        if (shownCountries[i])
            countriesToShow.push(countries[i])
    }

    if (countriesToShow.length > 10)
    {
        return <p>Too many matches, specify another filter</p>
    }
    else if (countriesToShow.length <= 10 && countriesToShow.length > 1)
    {
        return (
            <ul>
                {countriesToShow.map(country => <li key={country.name.common}>
                                                    {country.name.common} <button onClick={() => showHandler(country)}>show</button>
                                                </li>)}
            </ul>
        )
    }
    else if (countriesToShow.length === 1)
    {
        const country = countriesToShow[0]

        const [coordinates, setCoordinates] = useState({lat: 0, lon: 0})
        const [temp, setTemp] = useState(0.0)
        const [windSpeed, setWindSpeed] = useState(0.0)
        const [iconName, setIconName] = useState("")
        const [icon, setIcon] = useState("")

        useEffect(() => {
            weatherServices
            .getCoordinatesOfCity(country.capital[0])
            .then(data => setCoordinates(data))

            weatherServices
            .getWeatherFromCoordinates(coordinates)
            .then(data => {
                setTemp(data.temp)
                setWindSpeed(data.windSpeed)
                setIconName(data.iconName)
            })

            weatherServices
            .getIconFromIconName(iconName)
            .then(data => setIcon(data))
        }, [coordinates, temp, windSpeed, iconName, icon])

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {temp} Celcius</p>
                <img src={icon}/>
                <p>wind {windSpeed} m/s</p>
            </div>
        )
    }
}

export default Countries