import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./category.css";
import {useDispatch, useSelector} from "react-redux";
import {setStatus, getItems, getCategories, setApp} from "../../redux/reducers/item";
import avatar from "../../img/avatar.jpg";

const Category = () => {


    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const categories = useSelector((s) => s.item.categories);
    const [category, setCategory] = useState([]);
    const [state, setState] = useState('');
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(getItems());
        dispatch(getCategories());
        dispatch(setStatus('category'));
        setState(localStorage.getItem('category'));
    }, []);

    return (
        <section className='category'>
            {
                !showList ? <button className={"show-category-list-btn"}
                                    onClick={()=>{
                        setShowList(true)
                    }}>Открыть <br/> список <br className={'br'}/> категорий</button>
                    : <button className={"show-category-list-btn show-category-list-btn-close"}
                              onClick={()=>{
                        setShowList(false)
                    }}>Закрыть <br/> список  категорий</button>
            }
            <div className={showList ? 'category__btns category__btns-show': 'category__btns'}>

                <div className="container">
                  <div className="category__btns-row">
                            {
                                categories.map((item) => {
                                    return (
                                        <button
                                            key={`${item.id}`}
                                            className={state === item.id && category.length !== 0 ? 'active' : ''}
                                            onClick={() => {
                                                setCategory(items.filter((element) => {
                                                    return element
                                                }));
                                                setState(item.id);
                                            }}>{item.content}
                                        </button>
                                    )
                                })
                            }
                        </div>

                </div>
            </div>
            <div className='container'>
                <div className="category__row row">

                    {!category ? <h2>Выберите категорию</h2> : category.map((item) => {
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

export default Category;