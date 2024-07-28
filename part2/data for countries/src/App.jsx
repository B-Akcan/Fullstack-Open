import { useEffect, useState } from 'react'
import * as countryServices from "./services/countries"
import SearchBar from "./components/SearchBar"
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    countryServices
    .getCountries()
    .then((initialCountries) => {
      setCountries(initialCountries)
      setShownCountries(Array(initialCountries.length).fill(false))
    })
  }, [])

  const searchHandler = (event) => {
    if (event.target.value !== "")
    {
      let newShownCountries = [...shownCountries]

      for (let i=0; i<countries.length; i++)
      {
        if (countries[i].name.common.toLowerCase().includes(event.target.value.toLowerCase()))
          newShownCountries[i] = true
        else
          newShownCountries[i] = false
      }

      setShownCountries(newShownCountries)
    }
    else
      setShownCountries(Array(countries.length).fill(false))
  }

  const showHandler = (country) => {
    const newShownCountries = Array(countries.length).fill(false)
    const index = countries.indexOf(country)
    newShownCountries[index] = true
    setShownCountries(newShownCountries)
  }

  return (
    <div>
      <SearchBar searchHandler={searchHandler}/>
      <Countries countries={countries} shownCountries={shownCountries} showHandler={showHandler}/>
    </div>
  )
}

export default App
