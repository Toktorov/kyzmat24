import React, {useEffect} from 'react';
//import './reviews.css'
import {useDispatch} from "react-redux";
import {setApp, setStatus} from "../../redux/reducers/item";
import {setHiddenFooter} from "../../redux/reducers/app";
import requests from "../../assets/img/bg/requests.png";

const Reviews = () => {
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('review'));
        dispatch(setHiddenFooter(false))
    },[dispatch]);
    return (

        <>
            <div className="requests">
                <div className="container">
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
                                                      className="mb-0">
			                                </textarea>
                                        </div>
                                        <div className="requests_footer">

                                            <div>
                                                <button className="btn
			                                        btn-grad">Добавить</button>
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