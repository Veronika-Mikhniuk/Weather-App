import {
    getGeoData,
    getCurrentWeather
} from './requests.js'

import {
    renderWeather,
    showCitySuggestion
} from './methods.js'

let citySelected = false //флаг для отправки формы только после выбора города

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

    if (citySelected) {
        const cityName = document.querySelector('#city-search-input')
        const { latitude, longitude } = cityName.dataset

        try {
            const currentWeatherData = await getCurrentWeather(latitude, longitude)
            const { temperature } = currentWeatherData.current_weather
            renderWeather(cityName.value, temperature)
        }
        catch (error) {
            console.error('Ошибка при получении данных:', error)
            alert('Не удалось получить данные, попробуйте позже.')
        }
        cityName.value = ''
    } else {
        alert('Выберите город из списка.') /// изменить здесь на поповер, высплывающий на две секундв
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
    if(!target.closest('.search-form__suggestions') && !target.closest('.search-form__input')) {
        document.querySelector('#city-suggestions').classList.remove('search-form__suggestions_active')
    }
}

export {
    handleChangeInputCityName,
    handleSubmitFormSearchCity,
    handleClickDropdownMenu,
    handleClickOutsideCityList
}