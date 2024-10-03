import { Popover } from 'bootstrap'

import {
    getGeoData
} from './requests.js'

import {
    formWeatherData,
    renderWeather,
    showCitySuggestion
} from './methods.js'

let citySelected = false // flag for submitting the form only after selecting the city

async function handleChangeInputCityName() {
    const cityName = document.querySelector('#city-search-input').value.trim()

    if (!cityName) {
        document.querySelector('#city-suggestions').classList.remove('search-form__suggestions_active')
        return
    }

    try {
        const cityGeoData = await getGeoData(cityName)

        if (cityGeoData.results && cityGeoData.results.length > 0) {
            showCitySuggestion(cityGeoData.results)
        }
    }
    catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
}

async function handleSubmitFormSearchCity(event) {
    event.preventDefault()
    const cityName = document.querySelector('#city-search-input')

    if (citySelected) {
        const { latitude, longitude } = cityName.dataset

        try {
            const weatherData = await formWeatherData(latitude, longitude)
            
            renderWeather(weatherData)
        }
        catch (error) {
            console.error('Ошибка при получении данных:', error)
            alert('Не удалось получить данные, попробуйте позже.')
        }
        cityName.value = ''
        citySelected = false
    } else {
        const popover = new Popover(cityName)
        popover.show()

        setTimeout(() => {
            popover.hide()
        }, 2000)
    }
}

function handleClickDropdownMenu({ target }) {
    const cityName = document.querySelector('#city-search-input')
    cityName.value = target.textContent.trim()
    cityName.dataset.latitude = target.dataset.latitude
    cityName.dataset.longitude = target.dataset.longitude
    citySelected = true

    document.querySelector('#city-suggestions').classList.remove('search-form__suggestions_active')
}

function handleClickOutsideCityList({ target }) {
    if (!target.closest('.search-form__suggestions') && !target.closest('.search-form__input')) {
        document.querySelector('#city-suggestions').classList.remove('search-form__suggestions_active')
    }
}

export {
    handleChangeInputCityName,
    handleSubmitFormSearchCity,
    handleClickDropdownMenu,
    handleClickOutsideCityList
}