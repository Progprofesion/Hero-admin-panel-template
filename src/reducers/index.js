const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filteredHero: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
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
                filteredHero: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTERS_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHero: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;