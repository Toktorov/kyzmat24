import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getItems, setApp, setStatus, getCategories, getLocations} from "../../redux/reducers/item";
import {Link} from "react-router-dom";
import './search.css';
import avatar from "../../img/avatar.jpg";

const Search = () => {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const status = useSelector((s) => s.item.status);
    const categories = useSelector(s => s.item.categories);
    const locations = useSelector(s => s.item.locations);
    const [search, setSearch] = useState([]);

    const getSearchPattern = (strPattern) => {
        if (strPattern) return strPattern.toLowerCase().includes(name.toLowerCase())
    };
    const find = () => {
        setSearch(() => {
            if (name.length === 0) return [];
            return items.filter((el) => {
                return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
            })
        });
    };
    const findRegion = (regionId) => {
        if (regionId){
            if (search) {
                let cityServices = search.filter((item) => {
                    return item.location_self === regionId
                });
                let regionServices = items.filter((item) => {
                    return item.id === regionId
                });
                setSearch([...regionServices, ...cityServices])
            } else {
                let cityServices = items.filter((item) => {
                    return item.location_self === regionId
                });
                let regionServices = items.filter((item) => {
                    return item.id === regionId
                });
                setSearch([...regionServices, ...cityServices])
            }
        }
    };

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(getItems());
        dispatch(setStatus('search'));
        setSearch(JSON.parse(localStorage.getItem('array')));
        dispatch(getCategories());
        dispatch(getLocations());
    }, []);
    useEffect(() => {
        setRegions(locations.filter((item) => {
            return !item.location_self
        }));
        setCities(locations.filter((item) => {
            return item.location_self
        }))
    }, [locations]);
    return (
        <section className='search'>
            <div className="container">
                <div className="search__filter">
                    <div className="search__left">
                        <input
                            onKeyDown={(e) => e.code === 'Enter' && name.length !== 0 ? find() : ''}
                            onChange={(e) => {
                                setName(e.target.value);
                                find();
                            }}
                            placeholder='Поиск...' type="search"/>
                        <button className='search__btn' onClick={() => {
                            if (name.length !== 0) find()
                        }} type='button'>ПОИСК
                        </button>
                    </div>

                    <select name="" id="" defaultValue="0" onChange={(e) => {
                        findRegion(e.target.value)
                    }}>
                        <option disabled value="0">Поиск по области</option>
                        <option value="-1">Отмена</option>
                        {
                            regions.map((item) => {
                                return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                        }
                    </select>


                    <select name="" id="" defaultValue="0">
                        <option value="0">Поиск по категории</option>
                        {
                            categories.map((item) => {
                                return <option key={item.id} value={item.id}>{item.content}</option>
                            })
                        }
                    </select>

                </div>
            </div>
            <div className='container'>
                <div className="search__row row">
                    {search === null
                        ? <h2>Введите и делайте поиск</h2>
                        : search.length === 0
                            ? <h2>Ничего не найдено( Проверьте правильно ли вы ввели и пробуйте снова!!</h2>
                            : search.map((item) => {
                                return (
                                    <div className={'col-4'} key={item.id}>
                                        <div className='item'>
                                            {
                                                !item.profile_image ?
                                                    <img src={avatar} alt=""/> :
                                                    <img src={`${item.profile_image}`} alt=""/>
                                            }
                                            <div className='item__description'>
                                                <h3 className="item__title"><Link onClick={() => {
                                                    dispatch(setStatus('profile'));
                                                }
                                                } to={`/service/${item.id}`}>{item.first_name > 20 ?
                                                    `${item.first_name.slice(0, 19)}...` :
                                                    item.first_name ? item.first_name :
                                                        item.username.length > 20 ? `${item.username.slice(0, 19)}...` : item.username}</Link>
                                                </h3>
                                                <p className="item__descr">{item.description.length > 30 ? `${item.description.slice(0, 29)}...` : item.description}</p>
                                                <p className="item__text"><b>Локация
                                                    :</b>{item.location.length > 30 ? `${item.location.slice(0, 29)}...` : item.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                </div>
            </div>
        </section>
    );
};

export default Search;