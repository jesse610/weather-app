// api key
// https://api.weatherapi.com/v1/current.json?key=7b0b90612d7c491caee32617230607&q=hayward
// 7b0b90612d7c491caee32617230607

const logger = (text) => {
    console.log(text)
}

const getApiInfo = async () => {
    const promise = await fetch('https://api.weatherapi.com/v1/current.json?key=7b0b90612d7c491caee32617230607&q=hayward')
    console.log(promise)
}

export {
    logger
}