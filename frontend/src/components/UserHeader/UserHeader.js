import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux";
import '../Header/header.css'

const UserHeader = () => {
    const id = useSelector(s => s.user.id);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const burgerMenuFunc = () =>{
   setShowBurgerMenu(!showBurgerMenu)
    };
    return (
            <>
                <div className="bg-dark py-10">
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
                                <Link to={"#"} className="light d-flex align-items-center is_active">
                                    <i className="ri-sun-fill"> </i>
                                </Link>
                                <Link to={"#"} className="dark d-flex align-items-center">
                                    <i className="ri-moon-fill"> </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <header className="header__1 js-header " id="header">
                    <div className="container">
                        <div className="wrapper js-header-wrapper">
                            <div className="header__logo">
                                <Link to={"/"}
                                      onClick={()=>{
                                          localStorage.removeItem('editSection')
                                      }}
                                      className="h4_09" >
                                    Kyzmat24
                                </Link>
                            </div>

                            {
                                id ? <>
                                    <div className={showBurgerMenu ? 'header__mobile header__menu' : 'header__menu'}>
                                        <ul className="d-flex space-x-20">
                                            <li className="has_popup">
                                                <Link  to={'/user/orders/'} className="color_black"
                                                      onClick={()=>{
                                                          localStorage.removeItem('editSection')
                                                      }}
                                                >Заказы</Link>
                                            </li>
                                            <li>
                                                <Link to={'/user/tasks/'} className="color_black" >Мои заказы</Link>
                                            </li>
                                            <li>
                                                <Link to={'/user'}
                                                      onClick={()=>{
                                                          localStorage.removeItem('editSection')
                                                      }}
                                                      className="color_black" > Профиль</Link>
                                            </li>

                                           </ul>
                                    </div>

                                    <div
                                        onClick={()=>{
                                        burgerMenuFunc();
                                        }}
                                        className="header__burger js-header-burger"> </div>

                                </>: ''
                            }

                        </div>
                    </div>
                </header>





            </>


    );
};

export default UserHeader;