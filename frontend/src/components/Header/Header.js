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
                            {/*<lottie-player*/}
                            {/*    src="https://assets6.lottiefiles.com/private_files/lf30_kqshlcsx.json"*/}
                            {/*    background="transparent"*/}
                            {/*    speed="2"*/}
                            {/*    style="width: 50px; height: 50px"*/}
                            {/*    loop*/}
                            {/*    autoplay></lottie-player>*/}
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
                                    }}
                                    >Главная</Link>
                                </li>
                                <li>
                                    <Link to={'/about'} className="color_black" > О нас</Link>
                                </li>
                                <li>
                                    <Link to={'/reviews'}
                                          onClick={()=>{
                                              dispatch(setStatus('/reviews'))
                                          }}
                                          className="color_black" > Отзывы</Link>
                                </li>
                                <li>
                                    <Link to={'/search'}
                                          onClick={()=>{
                                              dispatch(setStatus('search'));
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
                        {/*<div className="header__mobile js-header-mobile">*/}
                        {/*    <div className="header__mobile__menu space-y-40">*/}
                        {/*        <ul className="d-flex space-y-20">*/}
                        {/*            <li><a className="color_black" href="Marketplace.html"> Marketplace</a></li>*/}
                        {/*            <li><a className="color_black" href="Collections.html"> Collections</a></li>*/}
                        {/*            <li><a className="color_black" href="Profile.html"> Profile</a></li>*/}
                        {/*            <li><a className="color_black" href="Creators.html"> Creators</a></li>*/}

                        {/*        </ul>*/}
                        {/*        <div className="space-y-20">*/}
                        {/*            <div className="header__search in_mobile w-full">*/}
                        {/*                <input type="text" placeholder="Search"/>*/}
                        {/*                <button className="header__result">*/}
                        {/*                    <i className="ri-search-line"></i>*/}
                        {/*                </button>*/}
                        {/*            </div>*/}
                        {/*            <a className="btn btn-grad btn-sm" href="Connect-wallet.html">Connect*/}
                        {/*                wallet</a>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </header>


            {/*<h1 className='header__logo'><Link to={'/'}>kyzmat24</Link></h1>*/}

            {/*<div className="header__nav">*/}
            {/*    <nav className={ showBurgerMenu ? 'header__menu show-menu' : 'header__menu'}>*/}

            {/*        <Link className={status === 'home' ? 'header__link header__link-active' : 'header__link'} to={'/'}*/}
            {/*              onClick={() => {*/}
            {/*                  dispatch(setStatus('home'));*/}
            {/*              }}>Главная</Link>*/}

            {/*        <Link className={status === 'category' ? 'header__link header__link-active' : 'header__link'}*/}
            {/*              to={'/about'} onClick={() => {*/}
            {/*            dispatch(setStatus('category'));*/}
            {/*            localStorage.setItem('category', 'restaurant');*/}
            {/*        }}>О нас</Link>*/}

            {/*        <Link className={status === 'search' ? 'header__link header__link-active' : 'header__link'}*/}
            {/*              to={'/search'} onClick={() => {*/}
            {/*                  dispatch(setStatus('search'));*/}
            {/*              }}>Поиск</Link>*/}

            {/*        <Link className={status === 'review' ? 'header__link header__link-active' : 'header__link'}*/}
            {/*              to={'/reviews'} onClick={() => {*/}
            {/*                  dispatch(setStatus('review'));*/}
            {/*              }}>Отзывы</Link>*/}
            {/*        <Link to={'/user'} onClick={()=> {*/}
            {/*            dispatch(setApp('order'));*/}
            {/*        }} className="header__link header__link-form" >Вход/Регистрация</Link>*/}
            {/*    </nav>*/}
            {/*    <div onClick={() => {*/}
            {/*        burgerMenuFunc();*/}
            {/*    }} className="mobile-btn">*/}
            {/*        <span> </span>*/}
            {/*    </div>*/}

            {/*</div>*/}

        </>
    );
};

export default Header;