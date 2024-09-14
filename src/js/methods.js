import {
    citySelected
} from './declarations.js'

import {
    buildTemplateCitySuggestion
} from './templates.js'


let debounceTimer //чтобы сохранять идентификатор тайменра для возможности отмены

function renderWeather(cityName, temperature) { // temporary
    const cityNameElement = document.querySelector('#city-name')
    const currentDateElement = document.querySelector('#current-date')
    const currentTemperature = document.querySelector('#temperature')

    cityNameElement.innerHTML = cityName
    currentDateElement.innerHTML = new Date().toLocaleDateString('ru-RU')
    currentTemperature.innerHTML = temperature
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
    renderWeather,
    showCitySuggestion,
    debounce
}