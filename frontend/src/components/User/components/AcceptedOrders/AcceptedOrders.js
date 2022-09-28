import React, {useEffect, useState} from 'react';
import './acceptedOrders.css';
import {useDispatch, useSelector} from "react-redux";
import {getAcceptOrders} from "../../../../redux/reducers/user";
import axios from "axios";
import {setHiddenFooter} from "../../../../redux/reducers/app";


const AcceptedOrders = () => {
    const acceptOrders = useSelector(s => s.user.acceptOrders);
    const [filterOrders, setFilterOrders] = useState([]);
    const [orderSelector, setOrderSelector] = useState('all');
    const dispatch = useDispatch();
    const orderFilterFunc = (selector) =>{
        setOrderSelector(selector);
        if (selector === "completed"){
            setFilterOrders(acceptOrders.filter((item)=>{
                return item.completed
            }))
        } else if(selector === "active") {
            setFilterOrders(acceptOrders.filter((item)=>{
                return !item.completed
            }))
        } else {
            setFilterOrders([])
        }
    };
    const mainSelector = ()=>{
    return orderSelector !== "all"
        ? filterOrders
        : acceptOrders
    };
    const cancelTheOrder = (orderId, acceptId) => {
        axios.delete(`/api/order/accept_order/${acceptId}`)
            .then(response => {
                console.log('delete', response);
                axios.put(`https://kyzmat24.com/api/order/accept-update/${orderId}`, {
                    status: false
                }).then(response => {
                    console.log('update', response);
                    dispatch(getAcceptOrders());
                }).catch(error => console.log(error))
            }).catch(error => console.log(error.response));
    };


    useEffect(() => {
        dispatch(getAcceptOrders());
        dispatch(setHiddenFooter(false))
    }, [dispatch]);
    return (
        <>

            <div className="section__creators mt-100">
                <div className="container">
                    <h3>Здесь вами полученные заказы</h3>
                    <div className="space-y-30">
                        <div className="section_head">
                            <div className="row justify-content-between
								align-items-center">


                                <div className="col-lg-auto">
                                    <button
                                        className={'btn btn-primary btn-sm accept-orders-filter-button'}
                                        onClick={()=>{
                                        orderFilterFunc("all")
                                    }} >Все</button>
                                    <button
                                        className={'btn btn-primary btn-sm accept-orders-filter-button'}
                                        onClick={()=>{
                                            orderFilterFunc("active")
                                        }} >Активные</button>
                                    <button
                                        className={'btn btn-primary btn-sm accept-orders-filter-button'}
                                        onClick={()=>{
                                        orderFilterFunc("completed")
                                    }} >Выполнено</button>
                                </div>

                            </div>
                        </div>
                        <div className="section__body space-y-20">
                            <div className="row mb-20_reset">
                                {
                                    mainSelector().map((item) => {
                                        return <div key={item.id} className="col-lg-4">
                                            <div className="creator_item creator_card space-y-20 mb-20">
                                                <div className="avatars flex-column space-y-10">
                                                    <div className="cover">

                                                    </div>
                                                    <div className="details">
                                                        <div>
                                                            <p className="color_black txt_sm space-y-20 mb-20">
                                                                {
                                                                    item.description.length > 30
                                                                        ? item.description.slice(0, 27) + "..."
                                                                        : item.description
                                                                }
                                                            </p>
                                                            {
                                                                item.completed ?"" : <>
                                                                    <button className="btn btn-primary btn-sm"
                                                                            onClick={() => {
                                                                                axios.put(`https://kyzmat24.com/api/order/update_completed/${item.id}`, {
                                                                                    "completed": true
                                                                                })
                                                                                    .then(response => console.log(response))
                                                                            }}
                                                                    >Выполнено
                                                                    </button>
                                                                    <button
                                                                        onClick={()=>{
                                                                            cancelTheOrder(item.id, item.acceptId)
                                                                        }}
                                                                        className="btn btn-primary btn-sm">Отказаться</button>
                                                                </>
                                                            }
                                                        </div>
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
            {/*<div className="accept-orders-btns">*/}
            {/*    <div className="container">*/}
            {/*        <button type={'button'} className={'accept-orders-btn'}>Все</button>*/}
            {/*        <button type={'button'} className={'accept-orders-btn'}>Активные</button>*/}
            {/*        <button type={'button'} className={'accept-orders-btn'}>Выполнено</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="container">*/}

            {/*    <h3>Здесь вами полученные заказы</h3>*/}
            {/*    {*/}
            {/*        acceptOrders.map((item) => {*/}
            {/*            return <div key={item.id} className={'cart-item'}>*/}
            {/*                <div className="cart-description">*/}
            {/*                    <h4>{item.description}</h4>*/}
            {/*                </div>*/}
            {/*                <div className="cart-bottom">*/}
            {/*                    <p>Категория: {item.category}</p>*/}
            {/*                    <p>Телефон: {item.tel}</p>*/}
            {/*                </div>*/}
            {/*                <button type={'button'} className={'accept-orders-btn done'} onClick={() => {*/}
            {/*                    axios.put(`https://kyzmat24.com/api/order/update_completed/${item.id}`, {*/}
            {/*                        "completed": true*/}
            {/*                    })*/}
            {/*                        .then(response => console.log(response))*/}
            {/*                }*/}
            {/*                }>Выполнено*/}
            {/*                </button>*/}
            {/*                <button onClick={() => {*/}
            {/*                    cancelTheOrder(item.id, item.acceptId)*/}
            {/*                }*/}
            {/*                } type={'button'} className={'accept-orders-btn refuse'}>Отказаться*/}
            {/*                </button>*/}
            {/*                <hr/>*/}
            {/*            </div>*/}
            {/*        })*/}
            {/*    }*/}


            {/*</div>*/}
        </>
    );
};

export default AcceptedOrders;