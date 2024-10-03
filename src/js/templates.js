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
            <div class="weather__hourly">
                <!-- Add later -->
            </div>  
        </div>`
}

const buildTemplateWeatherSummary = () => {
    return `
        <div class="weather__summary">
            <div class="summary summary__today">
                <h2 class="summary__title">TODAY</h2>
                <div class="summary__max">
                    <div class="summary__info">
                        <p class="summary__temp">23°C</p>
                        <p class="summary__desc">Partlu cloudy</p>
                    </div>
                    <div class="summary__icon">
                        <div class="weather-icon">🌤️</div>
                    </div>
                </div>
                <div class="summary__min">
                    <div class="summary__info">
                        <p class="summary__temp">13°C</p>
                        <p class="summary__desc">Partlu cloudy</p>
                    </div>
                    <div class="summary__icon">
                        <div class="weather-icon">🌤️</div>
                    </div>
                </div>
            </div>
            <div class="summary summary__tomorrow">
                <h2 class="summary__title">TOMORROW</h2>
                <div class="summary__max">
                    <div class="summary__info">
                        <p class="summary__temp">23°C</p>
                        <p class="summary__desc">Partlu cloudy</p>
                    </div>
                    <div class="summary__icon">
                        <div class="weather-icon">🌤️</div>
                    </div>
                </div>
                <div class="summary__min">
                    <div class="summary__info">
                        <p class="summary__temp">13°C</p>
                        <p class="summary__desc">Partlu cloudy</p>
                    </div>
                    <div class="summary__icon">
                        <div class="weather-icon">🌤️</div>
                    </div>
                </div>
            </div>
        </div>`
}

export {
    buildTemplateCitySuggestion,
    buildTemplateWeatherCurrent,
    buildTemplateWeatherSummary
}