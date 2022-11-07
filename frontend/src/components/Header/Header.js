import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './header.css'
import {useDispatch, useSelector} from "react-redux";
import { setStatus} from "../../redux/reducers/item";

const Header = () => {
    const dispatch = useDispatch();
    const authTokens = useSelector(s => s.user.authTokens);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const burgerMenuFunc = () =>{
       setShowBurgerMenu(!showBurgerMenu)
    };

    return (

        <>

            <div className="bg-dark py-10" >
                <div className="container">
                    <div
                        className="text-center
						d-flex
						justify-content-between
						space-x-10
						align-items-center">
                        <div className="space-x-10 d-flex align-items-center">
                            <p className="color_white">
                                Скоро будет доступна
                                <span> тёмная тема </span>
                            </p>
                        </div>

                        <div className="mode_switcher space-x-10">
                            <Link to={'#'} className="light d-flex align-items-center is_active">
                                <i className="ri-sun-fill"> </i>
                            </Link>
                            <Link to={'#'} className="dark d-flex align-items-center">
                                <i className="ri-moon-fill"> </i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <header className="header__1 js-header ">
                <div className="container">
                    <div className="wrapper js-header-wrapper">
                        <div className="header__logo">
                            <Link to={"/"}
                                  onClick={()=>{
                                      dispatch(setStatus('home'));
                                  }}
                                >
                                Kyzmat24
                            </Link>
                        </div>


                        <div className={showBurgerMenu ? "header__mobile header__menu" : "header__menu"}>
                            <ul className="d-flex space-x-20">
                                <li className="has_popup">
                                    <Link to={'/'} className="color_black"
                                    onClick={()=>{
                                        dispatch(setStatus('home'));
                                        setTimeout(()=>{
                                            burgerMenuFunc()
                                        }, 250);
                                    }}
                                    >Главная</Link>
                                </li>
                                <li>
                                    <Link to={'/about'} className="color_black" > О нас</Link>
                                </li>
                                <li>
                                    <Link to={'/reviews'}
                                          onClick={()=>{
                                              dispatch(setStatus('/reviews'));
                                              setTimeout(()=>{
                                                  burgerMenuFunc()
                                              }, 250);
                                          }}
                                          className="color_black" > Отзывы</Link>
                                </li>
                                <li>
                                    <Link to={'/search'}
                                          onClick={()=>{
                                              dispatch(setStatus('search'));
                                              setTimeout(()=>{
                                                  burgerMenuFunc()
                                              }, 250);
                                          }}
                                          className="color_black" >Поиск</Link>
                                </li>

                            </ul>
                        </div>


                       <div className={"header__right"}>
                        <div className="header__btns">
                            <Link to={"/user"} className="btn btn-grad btn-sm">
                                {
                                    authTokens
                                        ? "Профиль"
                                        : 'Регистрация/Войти'
                                }
                                     </Link>
                        </div>
                        <div
                            onClick={()=>{
                                burgerMenuFunc()
                            }}
                            className="header__burger js-header-burger"> </div>
                    </div>

                    </div>
                </div>
            </header>


        </>
    );
};

export default Header;