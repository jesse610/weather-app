
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
        condition: data.current.condition.text,
        temperature: data.current.temp_f,
        humidity: data.current.humidity,
        wind: data.current.wind_mph,
        feelsLikeTemp: data.current.feelslike_f,
        conditionCode: data.current.condition.code,
        isDay: data.current.is_day
    }

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

export {
    getWeatherData,
}