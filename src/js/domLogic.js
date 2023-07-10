import { getProcessedForecastData, getWeatherData } from "./api"
import { getAnimationCue, processedWeatherConditionCodes, translateDateToWeekday } from "./applicationLogic"

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
        // displayWeatherAnimation(locationName)
        createWeekdayDisplay(locationName)
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
        displayWeatherAnimation(location, weatherDataObj)
        // setTimeout(() => {
        //     displayWeatherAnimation(location, weatherDataObj)
        // }, 0)
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

const displayWeatherAnimation = (location, dataObj) => {
    const animationCue = getAnimationCue(location, dataObj)
    animationImg.src = `./images/${animationCue}.gif`
}

const createWeekdayDisplay = async (location) => {
    const forecastData = await getProcessedForecastData(location)
    console.log(forecastData)
    
    for (let i = 0; i < 3; i++)
    {
        let weatherAnimation = getAnimationCue(location, forecastData[i])
        let div = document.querySelector(`#day-${i}`)
        div.textContent = ''
        let weekday = translateDateToWeekday(forecastData[i].date)

        createWeekdayForecast(div, weekday, forecastData[i], weatherAnimation)
    }
}

const createWeekdayForecast = (div, weekday, forecast, weatherAnimation) => {
    let h4 = document.createElement('h4')
    h4.textContent = weekday[0]
    div.appendChild(h4)

    let img = document.createElement('img')
    img.className = 'forecast-img'
    img.src = `./images/${weatherAnimation}.gif`
    div.appendChild(img)

    let span1 = document.createElement('span')
    span1.textContent = `H:${forecast.maxtempF}°F`
    span1.className = 'Htemp'
    div.appendChild(span1)

    let span2 = document.createElement('span')
    span2.textContent = `L:${forecast.mintempF}°F`
    span2.className = 'Ltemp'
    div.appendChild(span2)
}

displayWeatherData('Union City')
createWeekdayDisplay('Union City')

export {
    addLocationFormEventListener
}
