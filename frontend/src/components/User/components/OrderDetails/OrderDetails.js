import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
import {getCategories, getLocations, setShowPopup} from "../../../../redux/reducers/item";
import "./orderDetails.css"
import axios from "axios";
import {setHiddenFooter} from "../../../../redux/reducers/app";
import Footer from "../../../Footer/Footer";
import PopupComponent from "../../../PopupComponent/PopupComponent";

const OrderDetails = () => {
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);
    const categories = useSelector(s => s.item.categories);
    const locations = useSelector(s => s.item.locations);
    const showPopup = useSelector(s => s.item.showPopup);
    const params = useParams();
    const history = useHistory();
    const [details, setDetails] = useState({});
    const [message, setMessage] = useState("");

    const getOrderDetails = () => {
        setDetails(orders.filter((item) => {
            return item.id == params.id
        })[0])
    };

    const getOrderCategory = (id) => {
        if (categories) {
            let orderCategory = categories.filter((item) => {
                return item.id === id
            });
            if (orderCategory[0]) {
                return orderCategory[0].content
            }

        }
    };

    const getOrderLocation = (id) => {
        if (locations) {
            let orderLocation = locations.filter((item) => {
                return item.id === id
            });
            if (orderLocation[0]) {
                return orderLocation[0].title
            }
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
            setMessage("Вы взяли заказ. Для посмотра посмотрите раздел мои заказы");
            console.log('accept', data);
            axios.put(`/api/order/accept-update/${orderId}`, {
                status: true
            }).then(response => {
                console.log('update', response);
                dispatch(getOrders())
            }).catch(error => console.log('2', error.response))

        }).catch(error => {
            console.log('3', error.response);
        setMessage("Кто-то уже до вас взял заказ(")
        }).finally(()=>{
            setShowPopup(true)
        });

    };

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getCategories());
        dispatch(getLocations());
        dispatch(setHiddenFooter(true))
    }, []);
    useEffect(() => {
        getOrderDetails();
    }, [orders]);
    return (
        <section className={"order-details"}>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }
            <div className="container">
                <div className="order-details-card">
                    <p><b>Описание: </b>{details.description}</p>
                    <p><b>Категория: </b>{details.category ? getOrderCategory(details.category) : '--'}</p>
                    <p><b>Локация: </b>{details.location ? getOrderLocation(details.location) : '--'}</p>
                    <p><b>Контакты: </b><a href={`tel: ${details.tel}`}>{details.tel}</a></p>
                    <p><b>Email: </b>{details.email ? <a href={`mailto: ${details.email}`}>{details.email}</a> : '--'}
                    </p>
                    <div className="order-details-card-btns">
                        <button className="btn btn-primary btn-sm"
                                onClick={() => {
                                    acceptOrderFunc(details.id)
                                }}
                        >Взять заказ
                        </button>
                        <button className={'order-details-go-back'}
                                onClick={() => {
                                    history.goBack()
                                }}
                        >Назад
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default OrderDetails;