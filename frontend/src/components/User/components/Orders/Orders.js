import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
//import './orders.css';
import axios from "axios";
import {Link} from "react-router-dom";
import {getCategories, setShowPopup} from "../../../../redux/reducers/item";
import PopupComponent from "../../../PopupComponent/PopupComponent";
import {setHiddenFooter} from "../../../../redux/reducers/app";
import CategoriesPopup from "../../../PopupComponent/CategoriesPopup";

const Orders = () => {
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);
    const showPopup = useSelector(s => s.item.showPopup);
    const [message, setMessage] = useState('');
    const listWithCategory = useSelector(s => s.app.listWithCategory);
    const showListWithCategory = useSelector(s => s.app.showListWithCategory);

    const mainSelector = () => {
        if (listWithCategory.length !== 0) {
            return listWithCategory
        } else {
            return orders
        }
    };

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




    useEffect(() => {
        dispatch(getOrders());
        dispatch(getCategories());
        dispatch(setHiddenFooter(false))
    }, [dispatch]);

    return (
        <>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }

            <div className="section__creators mt-100">
                <div className="container">
                    <div className="space-y-30">
                        <div className="section_head">
                            <div className="row justify-content-between
								align-items-center">


                                <div className="col-lg-auto">
                                    <div className="dropdown">
                                     <CategoriesPopup list={orders} type={"orders"}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="section__body space-y-20">
                            <div className="row mb-20_reset">
                                {
                                    showListWithCategory && listWithCategory.length === 0
                                    ? <h3>Заказов по этой категории пока нет(</h3>
                                    :mainSelector().map((item)=>{
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
                                                                        :item.description
                                                                }
                                                            </p>
                                                            <button className="btn btn-primary btn-sm"
                                                            onClick={()=>{
                                                                acceptOrderFunc(item.id)
                                                            }}
                                                            >Взять заказ</button>
                                                            <Link to={`order-details/${item.id}`} className="btn btn-primary btn-sm">Подробнее</Link>
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
            {/*<div className="container">*/}
            {/*    <button*/}
            {/*        className={'orders-categories-button'}*/}
            {/*        onClick={()=>{*/}
            {/*        setShowList(!showList)*/}
            {/*    }}>категории</button>*/}


                   {/*<div className={showList ? "orders-category-btns orders-category-btns-show" : "orders-category-btns"}>*/}
                   {/*    <button*/}
                   {/*        onClick={()=>{*/}
                   {/*            setOrdersWithCategory(orders)*/}
                   {/*        }}*/}
                   {/*    >Все</button>*/}
                   {/*    {*/}
                   {/*        categories.map((item)=>{*/}
                   {/*            return <button key={item.id}*/}
                   {/*            onClick={()=>{*/}
                   {/*               categoryFilter(item.id)*/}
                   {/*            }}*/}
                   {/*            >{item.content}</button>*/}
                   {/*        })*/}
                   {/*    }*/}
                   {/*</div>*/}

            {/*    <div className="row">*/}

            {/*        {*/}
            {/*            ordersWithCategory.length === 0 ?<h3 className={'message-for-empty'}>Заказов по этой каегории нет(</h3> :*/}
            {/*            ordersWithCategory.map((item) => {*/}
            {/*                return <div className="col-4" key={item.id}>*/}
            {/*                    <div className={'orders__item'}>*/}
            {/*                        <p><b>Описание:</b> {item.description}</p>*/}
            {/*                        <p><b>Телефон:</b> {item.tel}</p>*/}
            {/*                        <p><b>Категория:</b> {item.category ? getOrderCategory(item.category) : '...'}</p>*/}
            {/*                        <div className="orders__item-btns">*/}
            {/*                            <button onClick={() => {*/}
            {/*                                acceptOrderFunc(item.id)*/}
            {/*                            }} className={'orders__item-get'}>Взять заказ*/}
            {/*                            </button>*/}
            {/*                            <Link to={`order-details/${item.id}`}*/}
            {/*                                  className={'orders__item-more'}>Подробнее...</Link>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            })*/}
            {/*        }*/}

            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Orders;