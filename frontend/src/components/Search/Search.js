import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getItems, setApp, setStatus, getCategories, getLocations} from "../../redux/reducers/item";
import {Link} from "react-router-dom";
//import './search.css';
import {setHiddenFooter} from "../../redux/reducers/app";

const Search = () => {
    const [search, setSearch] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [saveSearch, setSaveSearch] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [doSearch, setDoSearch] = useState(false);
    const [filterCities, setFilterCities] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const categories = useSelector(s => s.item.categories);
    const locations = useSelector(s => s.item.locations);

    const getUserLocation = (id) =>{
        if (locations) {
            let userLocation = locations.filter((item) => {
                return item.id === id
            });
            if (userLocation[0]){
                return userLocation[0].title
            }
        }
    };

    const getSearchPattern = (strPattern) => {
        if (strPattern) return strPattern.toLowerCase().includes(name.toLowerCase())
    };
    const find = () => {
        switch (true) {
            case search && search.length !== 0 : {
                console.log('search !0');
                setSearch(() => {
                    if (name.length === 0) return [];
                    return search.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !== 0) {
                    setSaveSearch([...search])
                }
                break;
            }

            case saveSearch.length !== 0 : {
                console.log('save !0');
                setSearch(() => {
                    if (name.length === 0) return [];
                    return saveSearch.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !== 0) {
                    setSaveSearch([...search])
                }
                break;
            }

            default : {
                console.log("default");
                setSearch(() => {
                    if (name.length === 0) return [];
                    return items.filter((el) => {
                        return getSearchPattern(el.first_name) || getSearchPattern(el.username) || getSearchPattern(el.description) || getSearchPattern(el.second__name)
                    })
                });
                if (search && search.length !== 0) {
                    setSaveSearch([...search])
                }
            }

        }
        setDoSearch(true)
    };
    const findFilter = (selectId, selectParameter) => {
        if (selectId && search.length !== 0) {
            console.log("Первый");
            setSearch(search.filter((item) => {
                return `${item[selectParameter]}` === `${selectId}`
            }));
            if (search && search.length !== 0) {
                setSaveSearch([...search])
            }
        }else if (selectId) {
            console.log("Вторй");
            console.log(selectId);
            setSearch(items.filter((item) => {
                return `${item[selectParameter]}` === `${selectId}`
            }));
            if (search && search.length !== 0) {
                setSaveSearch([...search])
            }
        }
        setDoSearch(true)
    };
    const searchRegion = useCallback((regionId) => {
        if (regionId && filterCities.length !== 0) {
            console.log(regionId);
            console.log(filterCities);
            let cityId = filterCities.find((item) => {
                return `${item.location_self}` === `${regionId}`
            }).id;
            console.log(cityId);
            if (search.length !== 0) {
                console.log('search');
                setSearch(search.filter((item) => {
                    return `${item.user_location}` === `${cityId}`
                }));
                if (search && search.length !== 0) {
                    setSaveSearch([...search])
                }
            } else {
                console.log("items")
                setSearch(items.filter((item) => {
                    return `${item.user_location}` === `${cityId}`
                }));
                if (search && search.length !== 0) {
                    setSaveSearch([...search])
                }
            }
            setDoSearch(true)
        }
    }, [filterCities, items, search]);

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(getItems());
        dispatch(setStatus('search'));
        dispatch(getCategories());
        dispatch(getLocations());
        dispatch(setHiddenFooter(false));
    }, [dispatch]);
    useEffect(() => {
        setRegions(locations.filter((item) => {
            return !item.location_self
        }));
        setCities(locations.filter((item) => {
            return item.location_self
        }))
    }, [locations]);
    useEffect(() => {
        searchRegion(selectedRegion)
    }, [filterCities, selectedRegion, searchRegion]);
    useEffect(() => {
        console.log(search)
    }, [search]);
    return (
        <>
            <div className="hero_no_results">
                <div className="container">
                    <div className="container2 space-y-20">
                        <div className="box search__box">
                            <i className="ri-search-line"></i>
                        </div>
                        <div className="box input__box d-flex align-items-center space-x-20">
                            <input
                                onChange={(e)=>{
                                    setName(e.target.value);
                                    find();
                                }}
                                onKeyDown={(e) => e.code === 'Enter' && name.length !== 0 ? find() : ''}
                                type="text" className="form-control" placeholder="Что ищем?"/>
                                <div><button onClick={()=>{
                                    find();
                                }} className="btn btn-grad"><i className="ri-search-line"></i>Search</button></div>
                        </div>
                        <div className="container123 space-y-10">
                            <span className="nameInput">Категория</span>
                            <select
                                onChange={(e)=>{
                                    findFilter(e.target.value, "user_category")
                                }}
                                className="form-select
			                                    custom-select" aria-label="Default
			                                    select example">
                                <option value="0">Поиск по категории</option>
                                {
                                    categories.map((item)=>{
                                        return <option key={item.id} value={item.id}>{item.content}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className="container123 space-y-10">
                            <span className="nameInput">Область</span>
                            <select className="form-select
			                                    custom-select" aria-label="Default
			                                    select example"
                            onChange={(e)=>{
                                            setSelectedRegion(e.target.value);
                                            setFilterCities(cities.filter((item) => {
                                                return `${item.location_self}` === `${e.target.value}`
                                            }));

                            }}
                            >
                                <option value="0">Поиски по области</option>
                                            {
                                                regions.map((item) => {
                                                    return <option key={item.id} value={item.id}>{item.title}</option>
                                                })
                                            }

                            </select>
                                    {
                                        selectedRegion ? <select
                                            className="form-select
			                                    custom-select" aria-label="Default
			                                    select example"
                                            name="" id="" defaultValue="0" onChange={(e) => {

                                            console.log(e.target.selectedOptions[0].title);
                                            console.log(e.target.value);
                                            findFilter(e.target.value, "user_location")
                                        }}>
                                            <option disabled value="0">Поиск по гододу/району</option>
                                            <option value="-1">Отмена</option>
                                            {
                                                filterCities.map((item) => {
                                                    return <option key={item.id} title={item.location_self}
                                                                   value={item.id}>{item.title}</option>
                                                })
                                            }
                                        </select> : ""
                                    }
                        </div>
                    </div>
                </div>
            </div>

           <div className="container">
               <div className="row">
                   {
                       search.length === 0 && !doSearch
                           ? <h2>Введите и делайте поиск</h2>
                           : search.length === 0 && doSearch
                           ? <h2>Ничего не найдено( Проверьте правильно ли вы ввели и пробуйте снова!!</h2>
                           : search.map((item)=>{
                               return  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                   <div className="card__item four">
                                       <div className="card_body space-y-10">

                                           <div className="card_head">
                                               <Link to={`/service/${item.id}`}>
                                                   <img
                                                       src={item.profile_image}
                                                       alt="item
												img"/>
                                               </Link>
                                           </div>


                                           <h6 className="card_title">
                                               <Link to={`/service/${item.id}`} className="color_black">
                                                   {item.first_name}
                                               </Link>
                                           </h6>
                                           <div className="card_footer d-block space-y-10">
                                               <div className="card_footer justify-content-between">
                                                   <div className="creators">
                                                       <p className="txt_sm">{item.description}</p>
                                                   </div>
                                                   <a href="Home1.html#" className="">
                                                       <p className="txt_sm">
                                                           Geo: <span className="color_green txt_sm">{item.user_location ? getUserLocation(item.user_location) : "--"}</span>
                                                       </p>
                                                   </a>
                                               </div>
                                               <div className="hr"></div>
                                               <div className="d-flex
											align-items-center
											space-x-10
											justify-content-between">
                                                   <div className="d-flex align-items-center
												space-x-5">
                                                       <Link to={`/service/${item.id}`} data-toggle="modal"
                                                             data-target="#popup_history">
                                                           <p className="color_text txt_sm
														view_history">
                                                               Devoloper
                                                           </p>
                                                       </Link>
                                                   </div>
                                                   <Link to={`/service/${item.id}`} className="btn btn-sm btn-primary"
                                                         data-toggle="modal"
                                                         data-target="#popup_bid">Посмотреть</Link>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           })
                   }
               </div>
           </div>

            {/*<div className="container form_section2">*/}
            {/*    <div className="kyzmat_form search__filter">*/}
            {/*        <div className=" search__left">*/}
            {/*            <input*/}
            {/*                onKeyDown={(e) => e.code === 'Enter' && name.length !== 0 ? find() : ''}*/}
            {/*                onChange={(e) => {*/}
            {/*                    setName(e.target.value);*/}
            {/*                    find();*/}
            {/*                }}*/}
            {/*                placeholder='Поиск...' type="search"/>*/}
            {/*            <button className='search__btn' id={'search_btn'} onClick={() => {*/}
            {/*                if (name.length !== 0) find()*/}
            {/*            }} type='button'>ПОИСК*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <select name="" id="" defaultValue="0" onChange={(e) => {*/}
            {/*            setSelectedRegion(e.target.value);*/}
            {/*            setFilterCities(cities.filter((item) => {*/}
            {/*                return item.location_self == e.target.value*/}
            {/*            }));*/}
            {/*        }}>*/}
            {/*            <option disabled value="0">Поиск по области</option>*/}
            {/*            <option value="-1">Отмена</option>*/}
            {/*            {*/}
            {/*                regions.map((item) => {*/}
            {/*                    return <option key={item.id} value={item.id}>{item.title}</option>*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </select>*/}
            {/*        {*/}
            {/*            selectedRegion ? <select name="" id="" defaultValue="0" onChange={(e) => {*/}
            {/*                setSelectedCity(e.target.value);*/}
            {/*                console.log(e.target.selectedOptions[0].title);*/}
            {/*                console.log(e.target.value);*/}
            {/*                findFilter(e.target.value, "user_location")*/}
            {/*            }}>*/}
            {/*                <option disabled value="0">Поиск по гододу/району</option>*/}
            {/*                <option value="-1">Отмена</option>*/}
            {/*                {*/}
            {/*                    filterCities.map((item) => {*/}
            {/*                        return <option key={item.id} title={item.location_self}*/}
            {/*                                       value={item.id}>{item.title}</option>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </select> : ""*/}
            {/*        }*/}


            {/*        <select name="" id="" defaultValue="0" onChange={(e) => {*/}
            {/*            findFilter(e.target.value, "user_category")*/}
            {/*        }}>*/}
            {/*            <option value="0">Поиск по категории</option>*/}
            {/*            {*/}
            {/*                categories.map((item) => {*/}
            {/*                    return <option key={item.id} value={item.id}>{item.content}</option>*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </select>*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container'>*/}
            {/*    <div className="search__row row">*/}
            {/*        {search.length === 0 && !doSearch*/}
            {/*            ? <h2>Введите и делайте поиск</h2>*/}
            {/*            : search.length === 0 && doSearch*/}
            {/*                ? <h2>Ничего не найдено( Проверьте правильно ли вы ввели и пробуйте снова!!</h2>*/}
            {/*                : search.map((item) => {*/}
            {/*                    return (*/}
            {/*                        <div className={'col-4'} key={item.id}>*/}
            {/*                            <div className='item'>*/}
            {/*                                {*/}
            {/*                                    !item.profile_image ?*/}
            {/*                                        <img src={avatar} alt=""/> :*/}
            {/*                                        <img src={`${item.profile_image}`} alt=""/>*/}
            {/*                                }*/}
            {/*                                <div className='item__description'>*/}
            {/*                                    <h3 className="item__title"><Link onClick={() => {*/}
            {/*                                        dispatch(setStatus('profile'));*/}
            {/*                                    }*/}
            {/*                                    } to={`/service/${item.id}`}>{item.first_name > 20 ?*/}
            {/*                                        `${item.first_name.slice(0, 19)}...` :*/}
            {/*                                        item.first_name ? item.first_name :*/}
            {/*                                            item.username.length > 20 ? `${item.username.slice(0, 19)}...` : item.username}</Link>*/}
            {/*                                    </h3>*/}
            {/*                                    <p className="item__descr">{item.description.length > 30 ? `${item.description.slice(0, 29)}...` : item.description}</p>*/}
            {/*                                    <p className="item__text"><b>Локация*/}
            {/*                                        :</b>{item.location ? `${item.location}...` : "---"}*/}
            {/*                                    </p>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    )*/}
            {/*                })}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Search;