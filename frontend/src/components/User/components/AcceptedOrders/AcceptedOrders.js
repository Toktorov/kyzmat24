import React, {useEffect} from 'react';
import './acceptedOrders.css';
import {useDispatch, useSelector} from "react-redux";
import {getAcceptOrders} from "../../../../redux/reducers/user";
import axios from "axios";

const AcceptedOrders = () => {
    const acceptOrders = useSelector(s => s.user.acceptOrders);
    const dispatch = useDispatch();
    const cancelTheOrder = (orderId) => {
        axios.put(`/api/order/accept-update/${orderId}`, {
            status: false
        }).then(response =>{
            console.log('update', response);
        })
            .catch(error => console.log(error))
    };

    useEffect(() => {
        dispatch(getAcceptOrders());
    }, []);
    return (
        <section className={'accept-orders'}>
            <div className="accept-orders-btns">
                <div className="container">
                    <button type={'button'} className={'accept-orders-btn'}>Все</button>
                    <button type={'button'} className={'accept-orders-btn'}>Активные</button>
                    <button type={'button'} className={'accept-orders-btn'}>Выполнено</button>
                </div>
            </div>
            <div className="container">

                <h1>Здесь будут вами полученные заказы</h1>
                {
                    acceptOrders.map((item) => {
                        return <div key={item.id} className={'cart-item'}>
                            <div className="cart-description">
                                <h4>{item.description}</h4>
                            </div>
                            <div className="cart-bottom">
                                <p>Категория: {item.category}</p>
                                <p>Телефон: {item.tel}</p>
                            </div>
                            <button type={'button'} className={'accept-orders-btn done'} onClick={() => {
                                axios.put(`https://kyzmat24.com/api/order/update_completed/${item.id}`, {
                                    "completed": true
                                })
                                    .then(response => console.log(response))
                            }
                            }>Выполнено
                            </button>
                            <button onClick={() => {
                                axios.put(`https://kyzmat24.com/api/order/accept-update/${item.id}`, {
                                    status: false
                                }).then(response => console.log('update', response)).catch(error => console.log(error))
                            }
                            } type={'button'} className={'accept-orders-btn refuse'}>Отказаться
                            </button>
                            <hr/>
                        </div>
                    })
                }


            </div>
        </section>
    );
};

export default AcceptedOrders;