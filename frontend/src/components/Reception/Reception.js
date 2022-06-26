import React, {useState} from 'react';
import "./reception.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setStatus} from "../../redux/reducers/item";
import Bg from "../../img/Bg.jpg";

const Reception = () => {
    const dispatch = useDispatch();
    const status = useSelector((s) => s.item.status);

    return (
        <section className='reception'>
            <div className="bg-img" >
                <img src={Bg} alt=""/>
            </div>
            <div className="container">
                {
                    status !== 'addItem' && status !== 'profile'
                        ? <div className={'reception__content'}>
                            <h2>Добро пожаловать в KYZMAT.COM!</h2>
                            <Link className={'reception__btn'} to={'/order'} onClick={() => {
                                dispatch(setStatus('addItem'));
                                localStorage.setItem('status', status)
                            }}>Добавить объявление </Link>
                        </div>
                        : ''


                }


            </div>
        </section>
    );
};

export default Reception;