import React from 'react';
import {Link} from "react-router-dom";
import './header.css'
import {useDispatch, useSelector} from "react-redux";
import {setApp, setStatus} from "../../redux/reducers/item";
import logo from '../../img/logo.png';

const Header = () => {
    const dispatch = useDispatch();
    const status = useSelector((s) => s.item.status);
    let show = false;
    const burgerMenuClose = () =>{
        document.querySelector('.mobile-btn').className = 'mobile-btn';
        document.querySelector('.header__menu').className = 'header__menu';
        document.querySelectorAll('.header__link').forEach((item) => {
            if (item.className == 'header__link'){
                item.className = 'header__link'
            } else if (item.className == 'header__link header__link-active'){
                item.className = 'header__link header__link-active'
            }
        });
    };

    const burgerMenuShow = () =>{
        if (show === false) {
            document.querySelector('.mobile-btn').className = 'mobile-btn show-mobile-btn';
            document.querySelector('.header__menu').className = 'header__menu show-menu';
            document.querySelectorAll('.header__link').forEach((item) => {
                item.className = 'header__link show-link'
            });
        } else {
            burgerMenuClose();
        }
        show = !show
    };

    return (

        <header className='header'>
            <h1 className='header__logo'><Link to={'/'}><img className={'logo'} src={logo} alt=""/></Link></h1>

            <div className="header__nav">
                <nav className={'header__menu'}>

                    <Link className={status === 'home' ? 'header__link header__link-active' : 'header__link'} to={'/'}
                          onClick={() => {
                              dispatch(setStatus('home'));
                             burgerMenuClose();
                          }}>Главная</Link>

                    <Link className={status === 'category' ? 'header__link header__link-active' : 'header__link'}
                          to={'/category'} onClick={() => {
                        dispatch(setStatus('category'));
                        localStorage.setItem('category', 'restaurant');
                      burgerMenuClose();
                    }}>Категории</Link>

                    <Link className={status === 'search' ? 'header__link header__link-active' : 'header__link'}
                          to={'/search'} onClick={() => {
                              dispatch(setStatus('search'));
                       burgerMenuClose();
                          }}>Поиск</Link>

                    <Link className={status === 'review' ? 'header__link header__link-active' : 'header__link'}
                          to={'/reviews'} onClick={() => {
                              dispatch(setStatus('review'));
                     burgerMenuClose();
                          }}>Отзывы</Link>

                </nav>
                <div onClick={() => {
                   burgerMenuShow()
                }} className="mobile-btn">
                    <span> </span>
                </div>

            </div>

            <div>
                <Link to={'/user'} onClick={()=> {
                    dispatch(setApp('order'));
                }} className="header__link-form" >Вход/Регистрация</Link>
            </div>
        </header>
    );
};

export default Header;