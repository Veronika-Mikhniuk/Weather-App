import {
    buildTemplateCitySuggestion,
    buildTemplateWeatherCurrent,
    buildTemplateWeatherSummary
} from './templates.js'

import {
    getCurrentWeather
} from './requests.js'

// Import of Weather Icons
import sunriseIcon from '../sass/img/Icons/sunrise.svg'
import sunsetIcon from '../sass/img/Icons/sunset.svg'
import cloudyIcon from '../sass/img/Icons/partly-cloudy-day.svg';
import rainIcon from '../sass/img/Icons/rain.png';

let citySelected  // flag for resetting the status so that the city list drops out without refreshing the page
let debounceTimer // to save the timer ID for the possibility of cancellation

function getCurrentDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDay = new Date().getDay()
    const currentMonth = new Date().getMonth()
    const currentDate = new Date().getDate()

    return `${days[currentDay]}, <br>${months[currentMonth]} ${currentDate}`
}

async function formWeatherData(latitude, longitude) {
    const currentWeatherData = await getCurrentWeather(latitude, longitude)

    const cityName = document.querySelector('#city-search-input')
    const { temperature, weather_code, wind_speed_10m: wind, relative_humidity_2m: humidity, surface_pressure: pressure } = currentWeatherData.current
    const [sunrise] = currentWeatherData.daily.sunrise
    const [sunset] = currentWeatherData.daily.sunset
    const [uv_index] = currentWeatherData.daily.uv_index_max

    let currentTimeDate = currentWeatherData.current.time
    let currentTime = currentTimeDate.slice(-5, -3)

    if (currentTime[0] == 0) {
        currentTime = currentTime.slice(1)
    }

    const visibility = currentWeatherData.hourly.visibility[currentTime]

    return {
        cityName: cityName.value,
        temperature,
        weather_code,
        sunrise,
        sunset,
        uv_index,
        wind,
        humidity,
        pressure,
        visibility,
        currentTimeDate
    }
}

function getWeatherByCode(code) { // change to relative icons
    const weatherDescriptions = {
        0: { description: "Clear sky", iconDay: cloudyIcon, iconNight: rainIcon },
        1: { description: "Mainly clear", iconDay: cloudyIcon, iconNight: rainIcon },
        2: { description: "Partly cloudy", iconDay: cloudyIcon, iconNight: rainIcon },
        3: { description: "Overcast", iconDay: cloudyIcon, iconNight: rainIcon },
        45: { description: "Fog", iconDay: cloudyIcon, iconNight: rainIcon },
        48: { description: "Depositing rime fog", iconDay: cloudyIcon, iconNight: rainIcon },
        51: { description: "Light drizzle", iconDay: cloudyIcon, iconNight: rainIcon },
        53: { description: "Moderate drizzle", iconDay: cloudyIcon, iconNight: rainIcon },
        55: { description: "Dense drizzle", iconDay: cloudyIcon, iconNight: rainIcon },
        56: { description: "Light freezing drizzle", iconDay: cloudyIcon, iconNight: rainIcon },
        57: { description: "Dense freezing drizzle", iconDay: cloudyIcon, iconNight: rainIcon },
        61: { description: "Light rain", iconDay: cloudyIcon, iconNight: rainIcon },
        63: { description: "Moderate rain", iconDay: cloudyIcon, iconNight: rainIcon },
        65: { description: "Heavy rain", iconDay: cloudyIcon, iconNight: rainIcon },
        66: { description: "Light freezing rain", iconDay: cloudyIcon, iconNight: rainIcon },
        67: { description: "Heavy freezing rain", iconDay: cloudyIcon, iconNight: rainIcon },
        71: { description: "Light snowfall", iconDay: cloudyIcon, iconNight: rainIcon },
        73: { description: "Moderate snowfall", iconDay: cloudyIcon, iconNight: rainIcon },
        75: { description: "Heavy snowfall", iconDay: cloudyIcon, iconNight: rainIcon },
        77: { description: "Snow grains", iconDay: cloudyIcon, iconNight: rainIcon },
        80: { description: "Light rain showers", iconDay: cloudyIcon, iconNight: rainIcon },
        81: { description: "Moderate rain showers", iconDay: cloudyIcon, iconNight: rainIcon },
        82: { description: "Violent rain showers", iconDay: cloudyIcon, iconNight: rainIcon },
        85: { description: "Light snow showers", iconDay: cloudyIcon, iconNight: rainIcon },
        86: { description: "Heavy snow showers", iconDay: cloudyIcon, iconNight: rainIcon },
        95: { description: "Slight thunderstorm", iconDay: cloudyIcon, iconNight: rainIcon },
        96: { description: "Thunderstorm with slight hail", iconDay: cloudyIcon, iconNight: rainIcon },
        99: { description: "Thunderstorm with heavy hail", iconDay: cloudyIcon, iconNight: rainIcon }
    }

    const weatherDescription = weatherDescriptions[code]

    return weatherDescription
}

function getIconBasedOnTime(weathercode, currentTime, sunrise, sunset) {
    const currentTimeDate = new Date(currentTime)
    const sunriseDate = new Date(sunrise)
    const sunsetDate = new Date(sunset)

    if (currentTimeDate >= sunriseDate && currentTimeDate < sunsetDate) {
        return getWeatherByCode(weathercode).iconDay // DayIcon
    } else {
        return getWeatherByCode(weathercode).iconNight // NightIcon
    }
}

function renderWeather({
    cityName,
    temperature,
    weather_code,
    sunrise,
    sunset,
    uv_index,
    wind,
    humidity,
    pressure,
    visibility,
    currentTimeDate
}) {
    const weatherCurrentHTML = buildTemplateWeatherCurrent({
        cityName: cityName.toUpperCase(),
        currentDate: getCurrentDate().toUpperCase(),
        temperature,
        weatherDescription: getWeatherByCode(weather_code).description.toUpperCase(),
        weatherIconUrl: getIconBasedOnTime(weather_code, currentTimeDate, sunrise, sunset),
        uvIndex: uv_index,
        wind,
        humidity,
        visibility,
        pressure,
        sunriseTime: sunrise.slice(-5),
        sunriseIconUrl: sunriseIcon,
        sunsetTime: sunset.slice(-5),
        sunsetIconUrl: sunsetIcon
    })

    const weatherSummaryHTML = buildTemplateWeatherSummary()

    // Insertion
    const mainWeatherBlock = document.querySelector('.weather__main')
    mainWeatherBlock.innerHTML = ''

    mainWeatherBlock.insertAdjacentHTML('beforeend', weatherCurrentHTML)
    mainWeatherBlock.insertAdjacentHTML('beforeend', weatherSummaryHTML)
}

function showCitySuggestion(cities) {
    const suggestionCityList = document.querySelector('#city-suggestions')
    suggestionCityList.innerHTML = ''

    cities.forEach((city) => {
        suggestionCityList.insertAdjacentHTML('beforeend', buildTemplateCitySuggestion(city))
    })
    suggestionCityList.classList.add('search-form__suggestions_active')
    citySelected = false
}

function debounce(func, delay) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(func, delay)
}

export {
    formWeatherData,
    renderWeather,
    showCitySuggestion,
    debounce
}