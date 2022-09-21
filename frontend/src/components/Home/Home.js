import './home.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getItems, getLocations, setApp, setStatus} from "../../redux/reducers/item";
import React, {useEffect, useState} from "react";
import avatar from '../../img/avatar.jpg';
import Reception from "../Reception/Reception";
import {setHiddenFooter} from "../../redux/reducers/app";
import CategoriesPopup from "./CategoriesPopup";
import {getOrders} from "../../redux/reducers/user";

const Home = () => {
    const categories = useSelector((s) => s.item.categories);
    const [category, setCategory] = useState([]);
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [selectCategory, setSelectCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showcaseOrders, setShowcaseOrders] = useState([]);
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const locations = useSelector(s => s.item.locations);
    const mainSelector = () => {
        if (category && selectCategory) {
            return category
        } else {
            return items
        }
    };
    const getUserLocation = (id) => {
        if (locations) {
            let userLocation = locations.filter((item) => {
                return item.id === id
            });
            if (userLocation[0]) {
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
        dispatch(getOrders())
    }, []);
useEffect(()=>{
    setShowcaseOrders(orders.filter((item, idx)=>{
        return idx > orders.length - 4
    }))
},[orders]);

    return (
        <>
            <Reception/>
            <div className="section__artists mt-100">

                <div className="container">
                    <div className="space-y-30">
                        <div className="section_head">
                            <h2 className="section__title">Заказы</h2>
                        </div>
                        <div className=" ">

                            <div className="row section_body">
                                {
                                    showcaseOrders.map((item) => {
                                        return  <div key={item.id} className="max-w500 col-3">
                                            <div className="creator_item creator_card rounded_border space-x-10">
                                                <div className="avatars space-x-10">
                                                    <div>
                                                        <span className="price color_green">{
                                                            item.description.length > 20
                                                            ? item.description.slice(0, 17) + "..."
                                                                : item.description
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }


                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-100">
                <div className="container">
                    <div className="section__head">
                        <div className="d-md-flex
							sm:space-y-20
							space-x-20
							align-items-center">
                            <h2 className="section__title text-center">Услуги</h2>
                            <button
                                onClick={() => {
                                    setShowCategoryList(!showCategoryList)
                                }}
                                className="btn btn-primary btn-sm
											"
                                type="button"

                            >
                                Категории
                            </button>

                            {
                                showCategoryList
                                    ? <CategoriesPopup items={items} setCategory={setCategory} categories={categories}
                                                       setSelectCategory={setSelectCategory}
                                                       setSelectedCategory={setSelectedCategory}
                                                       selectedCategory={selectedCategory}/>
                                    : ''
                            }


                        </div>
                    </div>
                    <div className="row">
                        {
                            selectCategory && category.length === 0 ?
                                <p>Публичных услуг по этой категории пока нет(</p>
                                : items && locations ?
                                mainSelector().map((item) => {
                                    return <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
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
                                                                Geo: <span
                                                                className="color_green txt_sm">{item.user_location ? getUserLocation(item.user_location) : "--"}</span>
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
                                                        <Link to={`/service/${item.id}`}
                                                              className="btn btn-sm btn-primary"
                                                              data-toggle="modal"
                                                              data-target="#popup_bid">Посмотреть</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div className={'preloader'}>
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>


            {/*<button className={"show-category-list-btn"}*/}
            {/*        onClick={()=>{*/}
            {/*            setShowList(!showList)*/}
            {/*        }}>категории</button>*/}
            {/*<Reception/>*/}
            {/*<div className={showList ? 'category__btns category__btns-show': 'category__btns'}>*/}
            {/*    <button*/}
            {/*        className={!selectedCategory ? 'select-category-btn selected-category-btn': 'select-category-btn'}*/}
            {/*        onClick={()=>{*/}
            {/*        setSelectCategory(false);*/}
            {/*        setSelectedCategory(null)*/}
            {/*    }}>Все</button>*/}
            {/*    {*/}
            {/*        categories ? categories.map((item) => {*/}
            {/*            return (*/}
            {/*                <button*/}
            {/*                    key={`${item.id}`}*/}
            {/*                    className={selectedCategory === item.id ? 'select-category-btn selected-category-btn' : 'select-category-btn'}*/}
            {/*                    onClick={() => {*/}
            {/*                        setCategory(items.filter((element) => {*/}
            {/*                            return element.user_category == item.id*/}
            {/*                        }));*/}
            {/*                        setSelectCategory(true);*/}
            {/*                        setSelectedCategory(item.id);*/}
            {/*                    }}>{item.content}*/}
            {/*                </button>*/}
            {/*            )*/}
            {/*        }) : ''*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<div className='container'>*/}

            {/*    <div className='row home__row'>*/}
            {/*        {*/}
            {/*            selectCategory && category.length === 0?*/}
            {/*              <p>Публичных услуг по этой категории пока нет(</p>*/}
            {/*            : items && locations ?*/}
            {/*            mainSelector().map((item) => {*/}
            {/*            return (*/}

            {/*                <div className={'col-4'} key={item.id}>*/}
            {/*                    <div className='item'>*/}
            {/*                        {*/}
            {/*                            !item.profile_image ?*/}
            {/*                                <img src={avatar} alt=""/> :*/}
            {/*                                <img src={`${item.profile_image}`} alt=""/>*/}
            {/*                        }*/}
            {/*                        <div className='item__description'>*/}
            {/*                            <h3 className="item__title"><Link onClick={() => {*/}
            {/*                                dispatch(setStatus('profile'));*/}
            {/*                            }*/}
            {/*                            } to={`/service/${item.id}`}>{item.first_name > 20 ?*/}
            {/*                                `${item.first_name.slice(0, 19)}...` :*/}
            {/*                                item.first_name ? item.first_name :*/}
            {/*                                    item.username.length > 20 ? `${item.username.slice(0, 19)}...` : item.username}</Link>*/}
            {/*                            </h3>*/}
            {/*                            <p className="item__descr">{item.description.length > 30 ? `${item.description.slice(0, 29)}...` : item.description}</p>*/}
            {/*                            <p className="item__text"><b>Локация*/}
            {/*                                :</b> {item.user_location ? getUserLocation(item.user_location) : "---"}</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*            )*/}
            {/*        }): ""*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    );
};

export default Home;