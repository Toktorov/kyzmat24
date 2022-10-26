import React, {useEffect, useState} from 'react';
//import './reviews.css'
import {useDispatch, useSelector} from "react-redux";
import {setApp, setShowPopup, setStatus} from "../../redux/reducers/item";
import {setHiddenFooter} from "../../redux/reducers/app";
import requests from "../../assets/img/bg/requests.png";
import axios from "axios";
import PopupComponent from "../PopupComponent/PopupComponent";

const Reviews = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const showPopup = useSelector(s => s.item.showPopup);
    const [loading, setLoading] = useState(false);
    const postReview = () => {
        if (message.trim().length !== 0) {
            setLoading(true);
    axios.post('/api/order/review/', {
        message
    }).then((response) => {
        setPopupMessage("Спасибо за отзыв!");
        setMessage('');
        console.log(response)
    }).catch((error)=>{
        setPopupMessage("Произошла ошибка. Проверьте соединение с интернетом и попробуйте снова");
        console.log(error)
    }).finally(()=>{
        dispatch(setShowPopup(true));
        setLoading(false)
    })
        }
    };

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('review'));
        dispatch(setHiddenFooter(false));
    }, [dispatch]);
    return (

        <>
            <div className="requests">
                <div className="container">
                    {
                        showPopup
                            ? <PopupComponent messageForUsers={popupMessage}/>
                            : ''
                    }
                    <div className="row justify-content-center">

                        <div className="col-lg-8 col-md-10 requests__content">
                            <div className="requests__wrap space-y-20">
                                <div>
                                    <h1 className="text-left">Оставить отзыв</h1>
                                </div>
                                <div className="box is__big">
                                    <div className="space-y-20 mb-0">

                                        <div className="space-y-10">
                                            <span className="nameInput">Ваш отзыв</span>
                                            <textarea
                                                value={message}
                                                onChange={(e)=>{
                                                    setMessage(e.target.value)
                                                }}
                                                className="mb-0">
			                                </textarea>
                                        </div>
                                        <div className="requests_footer">

                                            <div>
                                                {
                                                    loading
                                                        ? <div className={'login-preloader preloader'}>
                                                        <div className="lds-ring">
                                                            <div> </div>
                                                            <div> </div>
                                                            <div> </div>
                                                            <div> </div>
                                                        </div>
                                                    </div>
                                                        : <button
                                                            onClick={()=>{
                                                                postReview();
                                                            }}
                                                            className="btn
			                                        btn-grad">Добавить
                                                        </button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 contact__img">
                            <div className="img__wrap">
                                <img src={requests} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
};

export default Reviews;