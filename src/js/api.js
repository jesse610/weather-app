
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
        console.log(err)
    }
}

const processWeatherData = (data) => {
    const processedWeatherData = {
        location: data.location.name,
        temperature: data.current.temp_f,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
    }

    console.log(processedWeatherData)
}

const logWeatherData = async (location) => {
    try {
        const data = await fetchWeatherData(location)
        const processedData = processWeatherData(data)
        console.log(processedData)
    }
    catch(err)
    {
        console.log(err)
    }
}

export {
    logWeatherData
}