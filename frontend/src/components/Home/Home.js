import './home.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getItems, getLocations, setApp, setStatus} from "../../redux/reducers/item";
import React, {useEffect, useState} from "react";
import avatar from '../../img/avatar.jpg';
import Reception from "../Reception/Reception";
import {setHiddenFooter} from "../../redux/reducers/app";

const Home = () => {
    const categories = useSelector((s) => s.item.categories);
    const [category, setCategory] = useState([]);
    const [showList, setShowList] = useState(false);
    const [selectCategory, setSelectCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const locations = useSelector(s => s.item.locations);
    const mainSelector = () =>{
      if (category && selectCategory){
          return category
      }  else {
          return items
      }
    };
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
    useEffect(() => {
        dispatch(getItems());
        dispatch(getLocations());
        dispatch(setStatus('home'));
        dispatch(getCategories());
        dispatch(setApp('kyzmat'));
        dispatch(setHiddenFooter(false));
    }, []);


    return (
        <section className={'home'}>
            <button className={"show-category-list-btn"}
                    onClick={()=>{
                        setShowList(!showList)
                    }}>категории</button>
            <Reception/>
            <div className={showList ? 'category__btns category__btns-show': 'category__btns'}>
                <button
                    className={!selectedCategory ? 'select-category-btn selected-category-btn': 'select-category-btn'}
                    onClick={()=>{
                    setSelectCategory(false);
                    setSelectedCategory(null)
                }}>Все</button>
                {
                    categories ? categories.map((item) => {
                        return (
                            <button
                                key={`${item.id}`}
                                className={selectedCategory === item.id ? 'select-category-btn selected-category-btn' : 'select-category-btn'}
                                onClick={() => {
                                    setCategory(items.filter((element) => {
                                        return element.user_category == item.id
                                    }));
                                    setSelectCategory(true);
                                    setSelectedCategory(item.id);
                                }}>{item.content}
                            </button>
                        )
                    }) : ''
                }
            </div>
            <div className='container'>

                <div className='row home__row'>
                    {
                        selectCategory && category.length === 0?
                          <p>Публичных услуг по этой категории пока нет(</p>
                        : items && locations ?
                        mainSelector().map((item) => {
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
                                            :</b> {item.user_location ? getUserLocation(item.user_location) : "---"}</p>
                                    </div>
                                </div>
                            </div>

                        )
                    }): ""
                    }
                </div>
            </div>
        </section>

    );
};

export default Home;