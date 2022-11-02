import React, {useEffect, useState} from 'react';
import './acceptedOrders.css';
import {useDispatch, useSelector} from "react-redux";

import {setHiddenFooter} from "../../../../redux/reducers/app";
import {getAcceptOrders} from "../../../../redux/reducers/user";
import AcceptOrdersPopup from "./AcceptOrdersPopup";


const AcceptedOrders = () => {
    const acceptOrders = useSelector(s => s.user.acceptOrders);
    const [filterOrders, setFilterOrders] = useState([]);
    const [orderSelector, setOrderSelector] = useState('all');
    const [showPopup, setShowPopup] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [acceptId, setAcceptId] = useState(null);
    const [message, setMessage] = useState('');
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



    useEffect(() => {
        dispatch(getAcceptOrders());
        dispatch(setHiddenFooter(false))
    }, [dispatch]);
    return (
        <>
            {
                showPopup ?
                    <AcceptOrdersPopup
                        message={message}
                    setShowPopup={setShowPopup}
                                       orderId={orderId}
                                       acceptId={acceptId}
                                       setAcceptId={setAcceptId}
                    />
                    : ''
            }

            <div className="section__creators mt-100">
                <div className="container">
                    <h3>Здесь вами полученные заказы</h3>
                    <div className="space-y-30">
                        <div className="section_head">
                            <div className="row justify-content-between
								align-items-center">


                                <div className="col-lg-auto">
                                    <button
                                        className={orderSelector === 'all'
                                        ? 'btn btn-sm accept-orders-filter-button accept-orders-filter-button-active'
                                            : 'btn btn-sm accept-orders-filter-button'
                                        }
                                        onClick={()=>{
                                        orderFilterFunc("all")
                                    }} >Все</button>
                                    <button
                                        className={orderSelector === 'active'
                                            ? 'btn btn-sm accept-orders-filter-button accept-orders-filter-button-active'
                                            : 'btn btn-sm accept-orders-filter-button'
                                        }
                                        onClick={()=>{
                                            orderFilterFunc("active")
                                        }} >Активные</button>
                                    <button
                                        className={orderSelector === 'completed'
                                            ? 'btn btn-sm accept-orders-filter-button accept-orders-filter-button-active'
                                            : 'btn btn-sm accept-orders-filter-button'
                                        }
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
                                                                              setShowPopup(true);
                                                                              setOrderId(item.id);
                                                                              setMessage('Вы уверены что хотите пометить как выполнено?')
                                                                            }}
                                                                    >Выполнено
                                                                    </button>
                                                                    <button
                                                                        onClick={()=>{
                                                                            setShowPopup(true);                                                                              setMessage('Вы уверены что хотите пометить как выполнено?')
                                                                            setMessage('Вы уверены что хотите отказаться?');
                                                                            setOrderId(item.id);
                                                                            setAcceptId(item.acceptId)
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