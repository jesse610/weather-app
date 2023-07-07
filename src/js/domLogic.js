import { logWeatherData } from "./api"

const weatherDiv = document.querySelector('div')
const locationInput = document.querySelector('#location')
const form = document.querySelector('#weather-form')
const submitBtn = document.querySelector('#weather-form-btn')


const addLocationFormEventListener = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let locationName = locationInput.value
        logWeatherData(locationName)
    })
}

export {
    addLocationFormEventListener
}
