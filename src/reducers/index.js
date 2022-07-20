const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    filteredHeroes: [],
    acttiveFilters: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.acttiveFilters === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.acttiveFilters)

            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTERS_CHANGED':
            return {
                ...state,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        case 'HEROES_CREATED':
            const newCreateHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreateHeroList,
                filteredHeroes: state.acttiveFilters === 'all' ?
                    newCreateHeroList :
                    newCreateHeroList.filter(item => item.element === state.acttiveFilters)
            }
        case 'HEROES_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.acttiveFilters === 'all' ?
                    newHeroList :
                    newHeroList.filter(item => item.element === state.acttiveFilters)
            }

        default: return state
    }
}

export default reducer;