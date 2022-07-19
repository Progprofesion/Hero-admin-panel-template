
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions/index';

import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

const HeroesFilters = () => {

    const { filters, activeFilter, filtersLoadingStatus } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if (filtersLoadingStatus === 'error') {
        return <div>error</div>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <div>not filters</div>
        }
        return arr.map(({ name, className, label }) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            })
            return <button
                key={name}
                name={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}>
                {label}</button>
        })
    }

    const elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;