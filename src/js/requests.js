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
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature,relative_humidity_2m,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`)

        if (!response.ok) {
            throw new Error(`Server error:${response.status}`)
        }

        return await response.json()
    }
    catch (error) {
        console.warn(`Request failed: ${error.message}`)
    }
}

async function getCityNameByCoordanates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=31669a8670114a72874506b241b3b3a9`)

        if (!response.ok) {
            throw new Error(`'Failed to get city name from coordinates':${response.status}`)
        }

        const data = await response.json()

        if (!data.features || data.features.length === 0) {
            throw new Error('No city data found for your coordinates')
        }

        const cityData = data.features[0].properties
        const userCityName = cityData.city || cityData.county || cityData.state
        const userCountryName = cityData.country

        if (!userCityName) {
            throw new Error('City name not available in response')
        }

        let fullCityName
        if (userCityName && userCountryName) {
            fullCityName = `${userCityName}, ${userCountryName}`
        } else if (userCityName) {
            fullCityName = userCityName
        }

        return {
            success: true,
            cityName: fullCityName,
            error: null
        }
    }
    catch (error) {
        console.warn(`Request failed: ${error.message}`)
        return {
            success: false,
            cityName: null,
            error: error.message
        }
    }
}

export {
    getGeoData,
    getCurrentWeather,
    getCityNameByCoordanates
}