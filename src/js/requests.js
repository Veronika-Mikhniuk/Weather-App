async function getGeoData(cityName) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)

        if (!response.ok) {
            throw new Error(`Server error:${response.status}`)
        }

        return await response.json()
    }
    catch (error) {
        console.warn(`Request failed: ${error.message}`)
    }
}

async function getCurrentWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=sunrise,sunset&timezone=auto`)

        if (!response.ok) {
            throw new Error(`Server error:${response.status}`)
        }

        return await response.json()
    }
    catch (error) {
        console.warn(`Request failed: ${error.message}`)
    }
}

export {
    getGeoData,
    getCurrentWeather
}