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

export {
    buildTemplateCitySuggestion,
    buildTemplateWeatherCurrent,
    buildTemplateWeatherSummary,
    buildTemplateWeatherHourly,
    buildTemplateWeatherHourlyItem,
    buildTemplateWeatherDaily,
    buildTemplateWeatherDailyItem
}