import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getItems, setApp, setStatus, getCategories, getLocations} from "../../redux/reducers/item";
import {Link} from "react-router-dom";
import './search.css';
import avatar from "../../img/avatar.jpg";

const Search = () => {
    const [search, setSearch] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [saveSearch, setSaveSearch] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [filterCities, setFilterCities] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const categories = useSelector(s => s.item.categories);
    const locations = useSelector(s => s.item.locations);

    const getSearchPattern = (strPattern) => {
        if (strPattern) return strPattern.toLowerCase().includes(name.toLowerCase())
    };
    const find = () => {
        switch (true) {
            case search && search.length !== 0 :{
                console.log('search !0');
                setSearch(() => {
                    if (name.length === 0) return [];
                   return  search.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !== 0){
                    setSaveSearch([...search])
                }
                break;
            }

            case saveSearch.length !== 0 :{
                console.log('save !0');
                setSearch(() => {
                    if (name.length === 0) return [];
                  return saveSearch.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !==0){
                    setSaveSearch([...search])
                }
                break;
            }

            default :{
                console.log("default");
                setSearch(() => {
                    if (name.length === 0) return [];
                   return items.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !==0){
                    setSaveSearch([...search])
                }
            }

        }

    };
    const findFilter = (selectId, selectParameter) => {
       if (selectId && search.length !== 0){
            setSearch(search.filter((item) => {
                return item[selectParameter] == selectId
            }));
           if (search && search.length !==0){
               setSaveSearch([...search])
           }
        }  if (selectId){
            setSearch(items.filter((item) => {
                return item[selectParameter] == selectId
            }));
            if (search && search.length !==0){
                setSaveSearch([...search])
            }
        }
    };
    const searchRegion = (regionId) =>{
        if (regionId && filterCities.length !== 0){
            console.log(regionId);
            console.log(filterCities);
            let cityId = filterCities.find((item)=>{
                return item.location_self == regionId
            }).id;
            console.log(cityId);
            if (search.length !== 0){
                console.log('search');
              setSearch(  search.filter((item)=>{
                  return item.user_location == cityId
              }));
                if (search && search.length !==0){
                    setSaveSearch([...search])
                }
            } else {
                console.log("items")
                setSearch(items.filter((item)=>{
                    return item.user_location == cityId
                }));
                if (search && search.length !==0){
                    setSaveSearch([...search])
                }
            }
        }
    };

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(getItems());
        dispatch(setStatus('search'));
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
    useEffect(()=>{
        searchRegion(selectedRegion)
    }, [filterCities]);
    useEffect(()=>{
        console.log(search)
    },[search]);
    return (
        <section className='search'>
            <div className="container form_section2">
                <div className="kyzmat_form search__filter">
                        <div className=" search__left">
                        <input
                            onKeyDown={(e) => e.code === 'Enter' && name.length !== 0 ? find() : ''}
                            onChange={(e) => {
                                setName(e.target.value);
                                find();
                            }}
                            placeholder='Поиск...' type="search"/>
                        <button className='search__btn' id={'search_btn'} onClick={() => {
                            if (name.length !== 0) find()
                        }} type='button'>ПОИСК
                        </button>
                    </div>

                    <select name="" id="" defaultValue="0" onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setFilterCities(cities.filter((item)=>{
                            return item.location_self == e.target.value
                        }));
                       // findFilter(e.target.value, "user_location");
                    }}>
                        <option disabled value="0">Поиск по области</option>
                        <option value="-1">Отмена</option>
                        {
                            regions.map((item) => {
                                return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                        }
                    </select>
                    {
                        selectedRegion ?  <select name="" id="" defaultValue="0" onChange={(e) => {
                            setSelectedCity(e.target.value);
                            console.log(e.target.selectedOptions[0].title);
                            console.log(e.target.value);
                            findFilter(e.target.value, "user_location")
                        }}>
                            <option disabled value="0">Поиск по гододу/району</option>
                            <option value="-1">Отмена</option>
                            {
                                filterCities.map((item) => {
                                    return <option key={item.id} title={item.location_self} value={item.id}>{item.title}</option>
                                })
                            }
                        </select> : ""
                    }


                    <select name="" id="" defaultValue="0" onChange={(e)=>{
                        findFilter(e.target.value, "user_category")
                    }}>
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
                    {!search
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
                                                    :</b>{item.location ? `${item.location}...` : "---"}
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