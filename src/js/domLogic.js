import { getProcessedForecastData, getWeatherData } from "./api"
import { getAnimationCue, translateDateToWeekday } from "./applicationLogic"

const weatherDiv = document.querySelector('div')
const locationInput = document.querySelector('#location')
const form = document.querySelector('#weather-form')
const submitBtn = document.querySelector('#weather-form-btn')
const locationSpan = document.querySelector('#locate')
const regionSpan = document.querySelector('#region')
const countrySpan = document.querySelector('#country')
const conditionSpan = document.querySelector('#condition')
const tempSpan = document.querySelector('#temp')
const tempCSpan = document.querySelector('#tempC')
const humiditySpan = document.querySelector('#humidity')
const windSpan = document.querySelector('#wind-speed')
const windSpanKph = document.querySelector('#wind-speedKph')
const feelsLikeSpan = document.querySelector('#feels-like-temp')
const feelsLikeSpanC = document.querySelector('#feels-like-tempC')
const animationImg = document.querySelector('.weather-animation-container > img')
const cBtn = document.querySelector('#C')
const fBtn = document.querySelector('#F')
const errorDiv = document.querySelector('.error')

const addLocationFormEventListener = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let locationName = locationInput.value
        displayWeatherData(locationName)
        createWeekdayDisplay(locationName)
        form.reset()
    })
}

const displayWeatherData = async (location) => {
    try 
    {
        const weatherDataObj = await getWeatherData(location)
        locationSpan.textContent = `${weatherDataObj.location},`

        if (weatherDataObj.country == 'United States of America')
        {
            regionSpan.textContent = weatherDataObj.region
            countrySpan.textContent = ''
        }
        else
        {
            regionSpan.textContent = ''
            countrySpan.textContent = weatherDataObj.country
        }

        conditionSpan.textContent = `${weatherDataObj.condition}`
        tempSpan.textContent = `${weatherDataObj.temperature}°F`
        tempCSpan.textContent = `${weatherDataObj.temperatureC}°C`
        humiditySpan.textContent = `${weatherDataObj.humidity}%`
        windSpan.textContent = `${weatherDataObj.wind} mph`
        windSpanKph.textContent = `${weatherDataObj.windK} kph`
        feelsLikeSpan.textContent = `${weatherDataObj.feelsLikeTemp}°F`
        feelsLikeSpanC.textContent = `${weatherDataObj.feelsLikeTempC}°C`
        displayWeatherAnimation(location, weatherDataObj)
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
    span1.classList.add('f-forecast')
    div.appendChild(span1)

    let span2 = document.createElement('span')
    span2.textContent = `L:${forecast.mintempF}°F`
    span2.className = 'Ltemp'
    span2.classList.add('f-forecast')
    div.appendChild(span2)

    let span3 = document.createElement('span')
    span3.textContent = `H:${forecast.maxtempC}°C`
    span3.className = 'Htemp'
    span3.classList.add('hidden')
    span3.classList.add('c-forecast')
    div.appendChild(span3)

    let span4 = document.createElement('span')
    span4.textContent = `L:${forecast.mintempC}°C`
    span4.className = 'Ltemp'
    span4.classList.add('hidden')
    span4.classList.add('c-forecast')
    div.appendChild(span4)
}

const addTempButtonEventListeners = () => {
    cBtn.addEventListener('click', displayCTemps)
    fBtn.addEventListener('click', displayFTemps)
}

const displayCTemps = () => {
    fBtn.classList.remove('selected')
    cBtn.classList.add('selected')

    tempCSpan.classList.remove('hidden')
    tempSpan.classList.add('hidden')

    feelsLikeSpanC.classList.remove('hidden')
    feelsLikeSpan.classList.add('hidden')

    windSpanKph.classList.remove('hidden')
    windSpan.classList.add('hidden')

    document.querySelectorAll('.c-forecast').forEach(c => c.classList.remove('hidden'))
    document.querySelectorAll('.f-forecast').forEach(f => f.classList.add('hidden'))
}

const displayFTemps = () => {
    fBtn.classList.add('selected')
    cBtn.classList.remove('selected')

    tempSpan.classList.remove('hidden')
    tempCSpan.classList.add('hidden')

    feelsLikeSpan.classList.remove('hidden')
    feelsLikeSpanC.classList.add('hidden')

    windSpan.classList.remove('hidden')
    windSpanKph.classList.add('hidden')

    document.querySelectorAll('.f-forecast').forEach(f => f.classList.remove('hidden'))
    document.querySelectorAll('.c-forecast').forEach(c => c.classList.add('hidden'))
}

addTempButtonEventListeners()
fBtn.classList.add('selected')
displayWeatherData('San Francisco')
createWeekdayDisplay('San Francisco')

export {
    addLocationFormEventListener
}
