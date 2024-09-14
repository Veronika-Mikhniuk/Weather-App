const buildTemplateCitySuggestion = (city) => {
    return `
        <li class="search-form__suggestion-item dropdown-item" data-latitude="${city.latitude}" data-longitude="${city.longitude}">
            ${city.name}, ${city.country}
        </li>`
}

export {
    buildTemplateCitySuggestion
}