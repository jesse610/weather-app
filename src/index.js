import { getWeatherData } from "./js/api"
import { addLocationFormEventListener } from "./js/domLogic"
import './styles/normalize.css'
import './styles/style.css'
import {clouds} from "./images/clouds.gif"
import fog from "./images/fog.gif"
import night from "./images/night.gif"
import rain from "./images/rain.gif"
import snow from "./images/snow.gif"
import sunny from "./images/sunny.gif"
import thunderstorm from "./images/thunderstorm.gif"


// console.log(getWeatherData('San Francisco'))
addLocationFormEventListener()
// console.log(clouds)

const forecastTester = async () => {
    try
    {
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=7b0b90612d7c491caee32617230607&q=Hayward&days=4')
        const data = await response.json()
        console.log(data)
    }
    catch(err)
    {
        console.log(err)
    }
}

console.log(forecastTester())