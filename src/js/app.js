import { Modal } from 'bootstrap'

import {
    searchForm,
    suggestionCityList
} from './declarations.js'

import {
    handleChangeInputCityName,
    handleSubmitFormSearchCity,
    handleClickDropdownMenu,
    handleClickOutsideCityList
} from './handlers.js'

import {
    debounce
} from './methods.js'


// add event listeners
// событие input для мгновеного перехвата изменений, так как change будет срабатывать только при потере фокуса
// ставим задержку, чтоб предотвратить множественные запросы
searchForm.addEventListener('input', () => { debounce(handleChangeInputCityName, 1000) })
searchForm.addEventListener('submit', handleSubmitFormSearchCity)
suggestionCityList.addEventListener('click', handleClickDropdownMenu)
document.addEventListener('click', handleClickOutsideCityList)