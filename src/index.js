import { getProcessedForecastData, getWeatherData } from "./js/api"
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
getProcessedForecastData('hayward')
// console.log(clouds)
