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
// the "input" event is for instant interception of changes, since "change" will be triggered only when focus is lost
// set a delay to prevent multiple requests
searchForm.addEventListener('input', () => { debounce(handleChangeInputCityName, 1000) })
searchForm.addEventListener('submit', handleSubmitFormSearchCity)
suggestionCityList.addEventListener('click', handleClickDropdownMenu)
document.addEventListener('click', handleClickOutsideCityList)