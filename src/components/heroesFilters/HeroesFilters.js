import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filtersFetching, filtersFetched, filtersFetchingError, activeFiltersChange } from '../../actions/index';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, activeFilter, filtersLoadingStatus } = useSelector(state => state);

    const { request } = useHttp();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching())
            .then(data => dispatch(filtersFetched(data)))
            .then(data => dispatch(activeFiltersChange(data)))
            .catch(() => filtersFetchingError())
        // eslint-disable-next-line
    }, [])


    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if (filtersLoadingStatus === 'error') {
        return <Spinner />
    }




    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;