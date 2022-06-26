import React, {useState} from 'react';
import { Link } from 'react-router-dom'

import {useSelector} from "react-redux";

const UserHeader = () => {
    const id = useSelector(s => s.user.id);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const burgerMenuFunc = () =>{
        if (showBurgerMenu){
            setShowBurgerMenu(false)
        } else {
            setShowBurgerMenu(true)
        }
    };
    return (
            <header className={'header'}>
                <h1 className={'header__logo'}><Link
                    onClick={()=>{
                        localStorage.removeItem('editSection')
                    }}
                    to={'/'} >kyzmat24</Link></h1>
                {id ?<>
                <div className="header__nav">
                    <div className={showBurgerMenu ? 'header__menu show-menu' : 'header__menu'}>
                        <Link
                            onClick={()=>{
                                localStorage.removeItem('editSection')
                            }}
                            className='header__link' to={'/user/orders/'}>Заказы</Link>
                        <Link
                            onClick={()=>{
                                localStorage.removeItem('editSection')
                            }}
                            className='header__link' to={'/user/tasks/'}>Мои заказы</Link>
                        <Link
                            onClick={()=>{
                                localStorage.removeItem('editSection')
                            }}
                            className='header__link' to={'/user'}>Профиль</Link>
                    </div>

                    <div onClick={() => {
                        burgerMenuFunc();
                    }} className="mobile-btn">
                        <span> </span>
                    </div>
                </div>
                </>: ''}

            </header>


    );
};

export default UserHeader;