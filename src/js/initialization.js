import {
    formWeatherData,
    renderWeather
} from './methods.js'

import {
    buildTemplateLoadingIndicator,
    buildTemplateWelcomeScreen,
    buildTemplateMessage
} from './templates.js'

import {
    getCityNameByCoordanates
} from './requests.js'

let toastContainer = null
const MAX_TOASTS = 4

function showWelcomeScreen() {
    const welcomeScreenHTML = buildTemplateWelcomeScreen()

    const mainWeatherBlock = document.querySelector('.weather__main')
    mainWeatherBlock.innerHTML = ''
    mainWeatherBlock.insertAdjacentHTML('beforeend', welcomeScreenHTML)

    const geoButtonElement = document.querySelector('#geoLocationBtn')
    if (geoButtonElement) {
        geoButtonElement.addEventListener('click', async () => {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })
            if (permissionStatus.state === 'denied') {
                showMessage(`error`, `Location Access Blocked`, `You've blocked location access. Please enable it in your browser settings and try again, or search for a city manually.`)
                return
            }

            getUserLocation()
        })
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        showLoadingIndicator('Requesting access to your location data...')

        navigator.geolocation.getCurrentPosition(
            // Success case
            async (position) => {
                showLoadingIndicator('Determining your location...')
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                try {
                    const weatherData = await formWeatherData(latitude, longitude)
                    const cityResult = await getCityNameByCoordanates(latitude, longitude)

                    if (cityResult.success) {
                        weatherData.cityName = cityResult.cityName
                    } else {
                        showMessage(`warning`, `City Name Unavailable`, `Couldn't determine your city name, but we got your weather data! Showing coordinates instead`)
                        weatherData.cityName = `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`
                    }

                    setTimeout(() => renderWeather(weatherData), 2000)
                } catch (error) {
                    console.error('Error retrieving weather data:', error)
                    showMessage(`error`, `Technical error`, `Failed to get weather data. Please try again.${error.message}`)
                }
            },
            // Error case
            (error) => {
                console.error('Weather data error:', error)
                showWelcomeScreen()
            },
            // Options
            { timeout: 10000 }
        )
    } else {
        alert('Your browser does not support geolocation. Please enter a city manually')
        showMessage(`error`, `Technical error`, 'Your browser does not support geolocation. Please enter a city manually.')
        showWelcomeScreen()
    }
}

function showLoadingIndicator(text, effect) {
    const mainWeatherBlock = document.querySelector('.weather__main')
    const loadingIndicatorHTML = buildTemplateLoadingIndicator(text, effect)

    mainWeatherBlock.innerHTML = ''
    mainWeatherBlock.insertAdjacentHTML('beforeend', loadingIndicatorHTML)
}

function showMessage(type, title, message) {
    const messageContainer = getToastContainer()

    const existingToasts = messageContainer.querySelectorAll('.toast-notification')
    if (existingToasts.length >= MAX_TOASTS) {
        const toastsToRemove = existingToasts.length - MAX_TOASTS + 1
        for (let i = 0; i < toastsToRemove; i++) {
            closeToast(existingToasts[i])
        }
    }

    const messageHTML = buildTemplateMessage(type, title, message)
    messageContainer.insertAdjacentHTML('beforeend', messageHTML)

    const newToast = messageContainer.lastElementChild

    const closeButton = newToast.querySelector('.toast-notification__close')
    closeButton.addEventListener('click', () => {
        closeToast(newToast)
    })

    setTimeout(() => {
        newToast.classList.add('show')
    }, 50)

    setTimeout(() => {
        closeToast(newToast)
    }, 5000)
}

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div')
        toastContainer.className = 'toast-wrapper'
        document.body.appendChild(toastContainer)
    }
    return toastContainer
}

function closeToast(toastElement) {
    if (!toastElement || !toastElement.parentNode) return

    toastElement.classList.remove('show')

    setTimeout(() => {
        toastElement.classList.add('collapse')
    }, 500)

    setTimeout(() => {
        if (toastElement && toastElement.parentNode) {
            toastElement.remove()
            // check if needed to delete container
            checkAndCleanContainer()
        }
    }, 800)
}

function checkAndCleanContainer() {
    if (toastContainer && toastContainer.children.length === 0) {
        toastContainer.remove()
        toastContainer = null // Important
    }
}

function loadInitialWeather() {
    getUserLocation()
}

export {
    getUserLocation,
    loadInitialWeather,
    showWelcomeScreen
}