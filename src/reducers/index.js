const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: [],

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
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)

            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            }
        case 'FILTER_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTER_FECTHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            }
        case 'FILTER_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        case 'HEROES_DELETE':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;