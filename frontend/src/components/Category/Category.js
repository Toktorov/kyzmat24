import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./category.css";
import {useDispatch, useSelector} from "react-redux";
import {setStatus, getItems, getBtns, setApp} from "../../redux/reducers/item";

const Category = () => {


    const dispatch = useDispatch();
    const items = useSelector((s) => s.item.items);
    const btns = useSelector((s)=> s.item.btns);
    const [category, setCategory] = useState([]);
    const [state, setState] = useState('');
    const getCategory = (arr, category) => {
       let arr1 = arr.filter((item) => {
            return `${item?category.value: ''}`.includes(category)
        });
       let arr2 = arr1.filter((item)=>{
          return item.category.value === category && item.status === 'U'
       });

       let arr3 = arr1.filter((item)=>{
        return item.category.value !== category && item.category.value.startsWith(category) && item.status === 'U'
       });

       let arr4 =  arr1.filter((item)=>{
           return item.category.value !== category && !item.category.value.startsWith(category) && item.status === 'U'
       });
       let arr5 = arr1.filter((item)=>{
          return item.status === 'P' && item.category.value === category
       });
        let arr6 = arr1.filter((item)=>{
            return item.status === 'P' && item.category.value !== category && item.category.value.startsWith(category)
        });
        let arr7 = arr1.filter((item)=>{
            return item.status === 'P' && item.category.value !== category && !item.category.value.startsWith(category)
        });
       return setCategory([...arr5,...arr6, ...arr7, ...arr2, ...arr3, ...arr4]);

    };

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(getItems());
        dispatch(getBtns());
     dispatch(setStatus('category'));
getCategory(items, localStorage.getItem('category'));
setState(localStorage.getItem('category'));
    }, []);

    return (
        <section className='category'>
            <div className="category__btns">
                <div className="container">
                    <div className="category__btns-row">
                        {
                            btns.map((item)=>{
                                return (
                                    <button
                                        key={`${item.id}`}
                                        className={state === item.value && category.length !== 0 ? 'active': ''}
                                        onClick={() => {
                                            getCategory(items, item.value);
                                            setState(item.value);
                                        }}>{item.content}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="category__row">

                    {category.length === 0 ? <h2>Выберите категорию</h2> : category.map((item, idx) => {
                        return (
                            <div className='item' key={`${item.id}`}>
                                <img src={`${item.imgsrc}`} alt=""/>
                                <div className='item__description'>
                                    <h3 className="item__title"><Link onClick={() => {
                                        dispatch(setStatus('profile'));
                                        localStorage.setItem('id', JSON.stringify(item.id));
                                    }
                                    } to={`/service/${item.id}`}>{item.title.length > 15 ? `${item.title.substr(0, 15)}...`: item.title}</Link></h3>
                                    <p className="item__descr">{item.description.length > 20 ? `${item.description.substr(0, 20)}...`: item.description}</p>
                                    <p className="item__text"><b>Локация :</b>{item.location.length > 10 ? `${item.location.substr(0, 10)}...`: item.location}</p>
                                    <p className="item__text"><b>Количество мест : </b>{item.places.length > 10 ? `${item.places.substr(0,10)}...`: item.places}</p>
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