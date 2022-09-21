import React from 'react';
//import "./reception.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import inHero1 from "../../assets/img/bg/in_hero1.png";
import {setStatus} from "../../redux/reducers/item";
import Bg from "../../img/Bg.jpg";

const Reception = () => {
    const dispatch = useDispatch();
    const status = useSelector((s) => s.item.status);
    return (
        <>

            <div className="hero__1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="hero__left space-y-20">
                                <h1 className="hero__title">
                                    Найти работу или
                                    работника за 5 минут
                                </h1>
                                <p className="hero__text txt">Kyzmat24 - это плотформа для поиска работы или
                                    сотрудника</p>
                                <div className="space-x-20 d-flex flex-column flex-md-row
										sm:space-y-20">
                                    <Link to={'/order'} className="btn btn-primary">Добавить обьявление</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img className="img-fluid w-full" id="img_js"
                                 src={inHero1}
                                 alt=""/>
                        </div>
                    </div>

                </div>
            </div>


            {/*<div className="bg-img" >*/}
            {/*    <img src={Bg} alt=""/>*/}
            {/*</div>*/}
            {/*<div className="container">*/}
            {/*    {*/}
            {/*        status !== 'addItem' && status !== 'profile'*/}
            {/*            ? <div className={'reception__content'}>*/}
            {/*                <h2>Добро пожаловать в KYZMAT.COM!</h2>*/}
            {/*                <Link className={'reception__btn'} to={'/order'} onClick={() => {*/}
            {/*                    dispatch(setStatus('addItem'));*/}
            {/*                    localStorage.setItem('status', status)*/}
            {/*                }}>Добавить объявление </Link>*/}
            {/*            </div>*/}
            {/*            : ''*/}


            {/*    }*/}


            {/*</div>*/}
        </>
    );
};

export default Reception;