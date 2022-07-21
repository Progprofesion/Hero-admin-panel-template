
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions/index';

import Spinner from '../spinner/Spinner';

import classNames from 'classnames';

const HeroesFilters = () => {

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching())
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, [request])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if (filtersLoadingStatus === 'error') {
        return <div>Error</div>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        return arr.map(({ name, label, className }) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button
                id={name}
                key={name}
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