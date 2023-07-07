import { logger } from "./js/api"

logger('hello')

const getApiInfo = async () => {
    try 
    {
        const promise = await fetch('https://api.weatherapi.com/v1/current.json?key=7b0b90612d7c491caee32617230607&q=San Francisco')
        const data = await promise.json()
        console.log(data)
    }
    catch(err)
    {
        console.log(err)
    }
}

getApiInfo()