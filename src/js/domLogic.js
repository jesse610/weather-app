import { getWeatherData } from "./api"
import { getAnimationCue, processedWeatherConditionCodes } from "./applicationLogic"

const weatherDiv = document.querySelector('div')
const locationInput = document.querySelector('#location')
const form = document.querySelector('#weather-form')
const submitBtn = document.querySelector('#weather-form-btn')
const locationSpan = document.querySelector('#locate')
const regionSpan = document.querySelector('#region')
const conditionSpan = document.querySelector('#condition')
const tempSpan = document.querySelector('#temp')
const humiditySpan = document.querySelector('#humidity')
const windSpan = document.querySelector('#wind-speed')
const feelsLikeSpan = document.querySelector('#feels-like-temp')
const weatherAnimiationContainer = document.querySelector('.weather-animation-container')
const animationImg = document.querySelector('.weather-animation-container > img')
const errorDiv = document.querySelector('.error')



const addLocationFormEventListener = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let locationName = locationInput.value
        displayWeatherData(locationName)
        displayWeatherAnimation(locationName)
        form.reset()
    })
}

const displayWeatherData = async (location) => {
    try 
    {
        const weatherDataObj = await getWeatherData(location)
        console.log(weatherDataObj)
        locationSpan.textContent = `${weatherDataObj.location},`
        regionSpan.textContent = weatherDataObj.region
        conditionSpan.textContent = `Condition: ${weatherDataObj.condition}`
        tempSpan.textContent = `Temp: ${weatherDataObj.temperature}°F`
        humiditySpan.textContent = `Humidity: ${weatherDataObj.humidity}%`
        windSpan.textContent = `Wind speed: ${weatherDataObj.wind} mph`
        feelsLikeSpan.textContent = `Feels like: ${weatherDataObj.feelsLikeTemp}°F`
    }
    catch(err)
    {
        errorDiv.textContent = 'Error, please try again.'
        console.error(err)
        setTimeout(() => {
            errorDiv.textContent = ''
        }, 4000)
    }
}

const displayWeatherAnimation = async (location) => {
    const animationCue = await getAnimationCue(location)
    animationImg.src = `./images/${animationCue}.gif`
}

displayWeatherData('Union City')
displayWeatherAnimation('Union City')

export {
    addLocationFormEventListener
}
