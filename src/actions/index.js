export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETE',
        payload: id
    }
}

export const filterFetching = () => {
    return {
        type: 'FILTER_FETCHING'
    }
}

export const filterFetched = (filters) => {
    return {
        type: 'FILTER_FETCHING',
        payload: filters
    }
}

export const filterFetchingError = () => {
    return {
        type: 'FILTER_FETCHING_ERROR'
    }
}

export const activeFilterChange = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGE',
        activeFilter: filter
    }
}