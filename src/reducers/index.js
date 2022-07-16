const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filesLoadingStatus: 'idle',
    filteredHeroes: [],
    activeFilter: 'all'
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
                filteredHeroes: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filesLoadingStatus: 'loading',

            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filesLoadingStatus: 'idle',
                filters: action.payload
            }
        case 'FILTER_FETCHING_ERROR':
            return {
                ...state,
                filesLoadingStatus: 'error',
            }
        case 'ACTIVE_FILTER_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        case 'HEROES_DELETED':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroes :
                    newHeroes.filter(item => item.element !== state.activeFilter)
            }
        default: return state
    }

}

export default reducer;