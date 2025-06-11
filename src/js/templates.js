// Import of Weather Icons
import sunIcon from '../sass/img/Icons/sun-full.svg'
import cloudIcon from '../sass/img/Icons/overcast.svg'
import welcomeScreenIcon from '../sass/img/Icons/partly-cloudy-day.svg'
import geopositionIcon from '../sass/img/Icons/geoposition-icon.png'
import locationIcon from '../sass/img/Icons/location-icon.png'

const buildTemplateCitySuggestion = (city) => {
    return `
        <li class="search-form__suggestion-item dropdown-item" data-latitude="${city.latitude}" data-longitude="${city.longitude}">
            ${city.name}, ${city.country}
        </li>`
}

const buildTemplateWeatherCurrent = ({
    cityName,
    currentDate,
    temperature,
    weatherDescription,
    weatherIconUrl,
    uvIndex,
    wind,
    humidity,
    visibility,
    pressure,
    sunriseTime,
    sunriseIconUrl,
    sunsetTime,
    sunsetIconUrl
}) => {
    return `
        <div class="weather__content">
            <div class="weather__current">
                <div class="current">
                    <h1 class="current__city" id="city-name">${cityName}</h1>
                    <p class="current__date" id="current-date">${currentDate}</p>
                    <div class="current__info">
                        <div class="current__temp">
                            <p class="current__degrees" id="current-temperature">${temperature}°C</p>
                            <p class="current__description" id="current-weather-description">${weatherDescription}</p>
                        </div>
                        <div class="current__icon" id="current-icon">
                            <img src="${weatherIconUrl}" alt="Weather icon">
                        </div>
                    </div>
                </div>
                <div class="current__other-params">
                    <div class="current__params">
                        <div class="current__param-names">
                            <p class="current__param-name">Max UV Index</p>
                            <p class="current__param-name">Wind</p>
                            <p class="current__param-name">Humidity</p>
                            <p class="current__param-name">Visibility</p>
                            <p class="current__param-name">Pressure</p>
                        </div>
                        <div class="current__param-values">
                            <p class="current__param-value" id="max-uv-index">${uvIndex} of 10</p>
                            <p class="current__param-value" id="current-wind">${wind} km/h</p>
                            <p class="current__param-value" id="current-humidity">${humidity} %</p>
                            <p class="current__param-value" id="current-visibility">${visibility / 1000} km</p>
                            <p class="current__param-value" id="current-pressure">${pressure} hPa</p>
                        </div>
                    </div>
                    <div class="current__sun">
                        <div class="current__sunrise">
                            <p class="current__sunrise-time" id="sunrise-time">${sunriseTime}</p>
                            <div class="current__sunrise-icon">
                                <img src="${sunriseIconUrl}" alt="Sunrise icon">
                            </div>
                        </div>
                        <div class="current__sunset">
                            <p class="current__sunset-time" id="sunset-time">${sunsetTime}</p>
                            <div class="current__sunset-icon">
                                <img src="${sunsetIconUrl}" alt="Sunset icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}

const buildTemplateWeatherSummary = ({
    todayTempMax,
    todayTempMin,
    tomorrowTempMax,
    tomorrowTempMin,
    todayDayWeatherDescription,
    todayNightWeatherDescription,
    tomorrowDayWeatherDescription,
    tomorrowNightWeatherDescription,
    todayDayIcon,
    todayNightIcon,
    tomorrowDayIcon,
    tomorrowNightIcon
}) => {
    return `
        <div class="weather__summary">
            <div class="summary summary__today">
                <h2 class="summary__title">TODAY</h2>
                <div class="summary__max">
                    <div class="summary__info">
                        <p class="summary__temp">${todayTempMax}°C</p>
                        <p class="summary__desc">${todayDayWeatherDescription}</p>
                    </div>
                    <div class="summary__icon">
                        <img src="${todayDayIcon}" alt="Today day icon">
                    </div>
                </div>
                <div class="summary__min">
                    <div class="summary__info">
                        <p class="summary__temp">${todayTempMin}°C</p>
                        <p class="summary__desc">${todayNightWeatherDescription}</p>
                    </div>
                    <div class="summary__icon">
                        <img src="${todayNightIcon}" alt="Today night icon">
                    </div>
                </div>
            </div>
            <div class="summary summary__tomorrow">
                <h2 class="summary__title">TOMORROW</h2>
                <div class="summary__max">
                    <div class="summary__info">
                        <p class="summary__temp">${tomorrowTempMax}°C</p>
                        <p class="summary__desc">${tomorrowDayWeatherDescription}</p>
                    </div>
                    <div class="summary__icon">
                        <img src="${tomorrowDayIcon}" alt="Tomorrow day icon">
                    </div>
                </div>
                <div class="summary__min">
                    <div class="summary__info">
                        <p class="summary__temp">${tomorrowTempMin}°C</p>
                        <p class="summary__desc">${tomorrowNightWeatherDescription}</p>
                    </div>
                    <div class="summary__icon">
                        <img src="${tomorrowNightIcon}" alt="Tomorrow night icon">
                    </div>
                </div>
            </div>
        </div>`
}

const buildTemplateWeatherHourly = (hourlyItems) => {
    return `
        <div class="weather__hourly-wrapper">
            ${hourlyItems}
        </div>
    `
}

const buildTemplateWeatherHourlyItem = ({ hour, temp, weatherIconUrl }) => {
    return `
        <div class="hourly hourly__item">
            <h2 class="hourly__hour">${hour}</h2>
            <div class="hourly__icon">
                <img src="${weatherIconUrl}" alt="Hourly icon">
            </div>
            <p class="hourly__temp">${temp}°C</p>
        </div>
    `
}

const buildTemplateWeatherDaily = (dailyItems) => {
    return `
        <div class="weather__daily-wrapper">
            ${dailyItems}
        </div>
    `
}

const buildTemplateWeatherDailyItem = ({ day, tempMax, tempMin, weatherIconUrl }) => {
    return `
        <div class="daily daily__item">
            <h2 class="daily__week-day">${day}</h2>
            <div class="daily__icon">
                <img src="${weatherIconUrl}" alt="Daily icon">
            </div>
            <div class="daily__temp">
                <p class="daily__temp-max">${tempMax}°C</p>
                <p class="daily__temp-min">${tempMin}°C</p>
            </div>
        </div>
    `
}

const buildTemplateLoadingIndicator = (text, effect = '') => {
    return `
        <div class="loading-indicator ${effect}">
            <div class="loading-indicator__loader">
                <div class="loading-indicator__sun">
                    <img src="${sunIcon}" alt="Sun" class="loading-indicator__sun-image">
                </div>
                <div class="loading-indicator__cloud loading-indicator__cloud--front">
                    <img src="${cloudIcon}" alt="Cloud" class="loading-indicator__cloud-image">
                </div>
                <div class="loading-indicator__cloud loading-indicator__cloud--back">
                    <img src="${cloudIcon}" alt="Cloud" class="loading-indicator__cloud-image">
                </div>
            </div>
            <p class="loading-indicator__text">${text}</p>
        </div>
    `
}

const buildTemplateWelcomeScreen = () => {
    return `
        <div class="welcome-screen">
            <div class="welcome-screen__icon">
                <img src="${welcomeScreenIcon}" alt="cloud" class="welcome-screen__icon-image">
            </div>
            <h1 class="welcome-screen__title">Weather App</h1>
            
            <div class="welcome-screen__search-hint">Start by searching for your city</div>
            <div class="welcome-screen__instruction">
                Use the search bar above to find weather for any location
            </div>

            <div class="welcome-screen__divider">
                <div class="welcome-screen__divider-line"></div>
                <div class="welcome-screen__divider-text">or</div>
                <div class="welcome-screen__divider-line"></div>
            </div>

            <div class="welcome-screen__geolocation">
                <div class="welcome-screen__geo-icon">
                    <img src="${geopositionIcon}" alt="geo" class="welcome-screen__geo-image">
                </div>
                <div class="welcome-screen__geo-title">Use Your Current Location</div>
                <div class="welcome-screen__access-instruction">
                    You've blocked location access for this website. To get weather for your current location, you'll need to allow access.
                    <ul class="welcome-screen__access-tips">
                        <li>Look for the <img src="${locationIcon}" alt="lock" class="inline-icon"> lock icon in your address bar</li>
                        <li>Click it and change Location to "Allow"</li>
                        <li>Then try the button below to request access again</li>
                    </ul>
                </div>
                <button class="welcome-screen__geo-button" id="geoLocationBtn">
                    Try to get location access again
                </button>
            </div>
        </div>
    `
}

const buildTemplateMessage = (type, title, message) => {
    const icons = {
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="toast-notification__icon-svg" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>`,
        
        warning: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="toast-notification__icon-svg" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>`
    }

    return `
        <div class="toast-notification toast-notification--${type}">
            <div class="toast-notification__icon">
                ${icons[type]}
            </div>
            <div class="toast-notification__content">
                <div class="toast-notification__title">${title}</div>
                <div class="toast-notification__message">${message}</div>
            </div>
            <button class="toast-notification__close">×</button>
        </div>
    `
}

export {
    buildTemplateCitySuggestion,
    buildTemplateWeatherCurrent,
    buildTemplateWeatherSummary,
    buildTemplateWeatherHourly,
    buildTemplateWeatherHourlyItem,
    buildTemplateWeatherDaily,
    buildTemplateWeatherDailyItem,
    buildTemplateLoadingIndicator,
    buildTemplateWelcomeScreen,
    buildTemplateMessage
}