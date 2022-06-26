import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
import './orders.css';
import axios from "axios";
import {Link} from "react-router-dom";

const Orders = () => {
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);

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
                }).then(response =>{
                    console.log('update', response);
                    dispatch(getOrders())
                }).catch(error => console.log('2', error.response))
            }).catch(error => console.log('3', error.response));

    };

    useEffect(() => {

        dispatch(getOrders());


    }, []);
    return (
        <section className={'orders'}>
            <div className="container">
                <div className="row">

                    {
                        orders.map((item) => {
                            return <div className="col-4" key={item.id}>
                                <div className={'orders__item'}>
                                    <p><b>Описание:</b> {item.description}</p>
                                    <p><b>Телефон:</b> {item.tel}</p>
                                    <p><b>Категория:</b> {item.category ? item.category.content : '...'}</p>
                                   <div className="orders__item-btns">
                                       <button onClick={() => {
                                           acceptOrderFunc(item.id)
                                       }} className={'orders__item-get'}>Взять заказ
                                       </button>
                                       <Link to={`/user/orders/order/${item.id}`} className={'orders__item-more'}>Подробнее...</Link>
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