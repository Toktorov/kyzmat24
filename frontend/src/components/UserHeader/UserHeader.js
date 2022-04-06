import React from 'react';
import { Link } from 'react-router-dom'
import "./header.css";
import {useSelector} from "react-redux";
import logo from '../../img/logo.png'

const UserHeader = () => {
    const user = useSelector(s => s.user.user);

    return (
            <header>
                <h1><Link className='header-link' to={'/'} ><img className={'logo'} src={logo} alt=""/></Link></h1>
                {user ?<>
                <Link className='header-link' to={'/user/orders'}>Заказы</Link>
                <Link className='header-link' to={'/user/tasks'}>Мои заказы</Link>
                <Link className='header-link' to={'/user'}>Профиль</Link>
                </>: ''}

            </header>


    );
};

export default UserHeader;