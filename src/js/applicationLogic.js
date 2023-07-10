import { getWeatherData } from "./api"

const weatherConditionCodes = (day) => {
    const simplifiedCodes = [
        {
            clouds: [1003, 1006, 1009]
        },
        {
            rain: [1063, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246]
        },
        {
            snow: [1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252, 1255, 1258]
        },
        {
            thunder: [1087, 1273, 1276, 1279, 1282]
        },
    ]

    const dayCode = [
        {
            sunny: [1000]
        }
    ]

    const nightCode = [
        {
            night: [1000]
        }
    ]

    if (day == true || day == undefined)
    {
        return simplifiedCodes.concat(dayCode)
    }

    return simplifiedCodes.concat(nightCode)
}

const getWeatherConditionCodes = (isDay) => {
    if (isDay == 1)
    {
        return weatherConditionCodes(true)
    }

    return weatherConditionCodes(false)
}

const getAnimationCue = (location, dataObj) => {
    console.log(dataObj)
    const code = dataObj.conditionCode
    const isDay = dataObj.isDay
    const processedWeathercodes = getWeatherConditionCodes(isDay);

    console.log(processedWeathercodes)
    console.log(isDay)

    for (let i = 0; i < processedWeathercodes.length; i++)
    {
        for(const key in processedWeathercodes[i])
        {
            if (processedWeathercodes[i][key].includes(code))
            {
                return key
            }
        }
    }
}

const translateDateToWeekday = (date) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekdayIndex = new Date(date).getDay()
    const filteredWeekday = days.filter((day, index) => index == weekdayIndex)
    return filteredWeekday
}

export {
    weatherConditionCodes,
    getAnimationCue,
    translateDateToWeekday
}