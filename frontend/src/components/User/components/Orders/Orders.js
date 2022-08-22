import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
import './orders.css';
import axios from "axios";
import {Link} from "react-router-dom";
import {getCategories, setShowPopup} from "../../../../redux/reducers/item";
import PopupComponent from "../../../PopupComponent/PopupComponent";
import {setHiddenFooter} from "../../../../redux/reducers/app";

const Orders = () => {
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);
    const categories = useSelector(s => s.item.categories);
    const showPopup = useSelector(s => s.item.showPopup);
    const [showList, setShowList] = useState(false);
    const [ordersWithCategory, setOrdersWithCategory] = useState([]);
    const [message, setMessage] = useState('');

    const acceptOrderFunc = (orderId) => {
        axios.put(`/api/order/update/${orderId}`, {
            status: true
        }).then(({data}) => console.log(data)).catch(error => console.log('1', error.response));

        axios.post('/api/order/create_accept_order/', {
            user: id,
            order: orderId
        }).then(({data}) => {
            console.log('accept', data);
            axios.put(`/api/order/accept-update/${orderId}`, {
                status: true
            }).then(response => {
                console.log('update', response);
                setMessage("Вы взяли заказ. Откройте раздел мои" )

            }).catch(error => {
                console.log('2', error.response);
                setMessage("Упс. Кто-то уже взял этот заказ")
            })

        }).catch(error => console.log('3', error.response)).finally(()=>{
            dispatch(setShowPopup(true));
            dispatch(getOrders());
        });

    };
    const getOrderCategory = (id) =>{
        if (categories) {
            let orderCategory = categories.filter((item) => {
                return item.id === id
            });
            if(orderCategory[0]){
                return orderCategory[0].content
            }

        }
    };

    const categoryFilter = (id) =>{
      let  withCategories = orders.filter((element)=>{
          return element.category
      });
        setOrdersWithCategory(withCategories.filter((element)=>{
            return element.category.id === id
        }))
    };

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getCategories());
        dispatch(setHiddenFooter(false))
    }, []);
    useEffect(()=>{
        setOrdersWithCategory(orders)
    },[orders]);
    return (
        <section className={'orders'}>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }
            <div className="container">
                <button
                    className={'orders-categories-button'}
                    onClick={()=>{
                    setShowList(!showList)
                }}>категории</button>


                   <div className={showList ? "orders-category-btns orders-category-btns-show" : "orders-category-btns"}>
                       <button
                           onClick={()=>{
                               setOrdersWithCategory(orders)
                           }}
                       >Все</button>
                       {
                           categories.map((item)=>{
                               return <button key={item.id}
                               onClick={()=>{
                                  categoryFilter(item.id)
                               }}
                               >{item.content}</button>
                           })
                       }
                   </div>

                <div className="row">

                    {
                        ordersWithCategory.length === 0 ?<h3 className={'message-for-empty'}>Заказов по этой каегории нет(</h3> :
                        ordersWithCategory.map((item) => {
                            return <div className="col-4" key={item.id}>
                                <div className={'orders__item'}>
                                    <p><b>Описание:</b> {item.description}</p>
                                    <p><b>Телефон:</b> {item.tel}</p>
                                    <p><b>Категория:</b> {item.category ? getOrderCategory(item.category) : '...'}</p>
                                    <div className="orders__item-btns">
                                        <button onClick={() => {
                                            acceptOrderFunc(item.id)
                                        }} className={'orders__item-get'}>Взять заказ
                                        </button>
                                        <Link to={`order-details/${item.id}`}
                                              className={'orders__item-more'}>Подробнее...</Link>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </section>
    );
};

export default Orders;