import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './header.css'
import {useDispatch, useSelector} from "react-redux";
import {setApp, setStatus} from "../../redux/reducers/item";

const Header = () => {
    const dispatch = useDispatch();
    const status = useSelector((s) => s.item.status);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const burgerMenuFunc = () =>{
        if (showBurgerMenu){
            setShowBurgerMenu(false)
        } else {
            setShowBurgerMenu(true)
        }
    };

    return (

        <header className='header'>
            <h1 className='header__logo'><Link to={'/'}>kyzmat24</Link></h1>

            <div className="header__nav">
                <nav className={ showBurgerMenu ? 'header__menu show-menu' : 'header__menu'}>

                    <Link className={status === 'home' ? 'header__link header__link-active' : 'header__link'} to={'/'}
                          onClick={() => {
                              dispatch(setStatus('home'));
                          }}>Главная</Link>

                    <Link className={status === 'category' ? 'header__link header__link-active' : 'header__link'}
                          to={'/about'} onClick={() => {
                        dispatch(setStatus('category'));
                        localStorage.setItem('category', 'restaurant');
                    }}>О нас</Link>

                    <Link className={status === 'search' ? 'header__link header__link-active' : 'header__link'}
                          to={'/search'} onClick={() => {
                              dispatch(setStatus('search'));
                          }}>Поиск</Link>

                    <Link className={status === 'review' ? 'header__link header__link-active' : 'header__link'}
                          to={'/reviews'} onClick={() => {
                              dispatch(setStatus('review'));
                          }}>Отзывы</Link>
                    <Link to={'/user'} onClick={()=> {
                        dispatch(setApp('order'));
                    }} className="header__link header__link-form" >Вход/Регистрация</Link>
                </nav>
                <div onClick={() => {
                    burgerMenuFunc();
                }} className="mobile-btn">
                    <span> </span>
                </div>

            </div>

        </header>
    );
};

export default Header;