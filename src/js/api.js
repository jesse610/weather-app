
const fetchWeatherData = async (location) => {
    try 
    {
        const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=7b0b90612d7c491caee32617230607&q=${location}`)
        const data = await promise.json()
        console.log(data)
        return data
    }
    catch(err)
    {
        console.error(err)
        throw err
    }
}

const processWeatherData = (data) => {
    const processedWeatherData = {
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        condition: data.current.condition.text,
        temperature: data.current.temp_f,
        temperatureC: data.current.temp_c,
        humidity: data.current.humidity,
        wind: data.current.wind_mph,
        windK: data.current.wind_kph,
        feelsLikeTemp: data.current.feelslike_f,
        feelsLikeTempC: data.current.feelslike_c,
        conditionCode: data.current.condition.code,
        isDay: data.current.is_day
    }
    console.log(processedWeatherData)
    return processedWeatherData
}

const getWeatherData = async (location) => {
    try {
        const data = await fetchWeatherData(location)
        const processedData = processWeatherData(data)
        return processedData
    }
    catch(err)
    {
        throw err
    }
}

const fetchForecastData = async (location) => {
    try
    {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7b0b90612d7c491caee32617230607&q=${location}&days=4`)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(err)
    {
        throw err
    }
}

const processForecastData = (data) => {
    const processedForecastData = data.forecast.forecastday.slice(1, 4).map((forecast, index) => (
        {
            date: forecast.date,
            maxtempF: forecast.day.maxtemp_f,
            maxtempC: forecast.day.maxtemp_c,
            mintempF: forecast.day.mintemp_f,
            mintempC: forecast.day.mintemp_c,
            conditionCode: forecast.day.condition.code,
            isDay: 1
        }
    ))

    return processedForecastData
}

const getProcessedForecastData = async (location) => {
    try {
        const forecastData = await fetchForecastData(location)
        const processedData = processForecastData(forecastData)
        return processedData
    }
    catch(err)
    {
        console.log(err)
    }

}

export {
    getWeatherData,
    getProcessedForecastData
}