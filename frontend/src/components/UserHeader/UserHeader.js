import React from 'react';
import { Link } from 'react-router-dom'
import "./header.css";
import {useSelector} from "react-redux";

const UserHeader = () => {
    const user = useSelector(s => s.user.user);

    return (
            <header>
                <h1 className={'header__logo'}><Link to={'/'} >kyzmat24</Link></h1>
                {user ?<>
                <Link className='header-link' to={'/user/orders/'}>Заказы</Link>
                <Link className='header-link' to={'/user/tasks/'}>Мои заказы</Link>
                <Link className='header-link' to={'/user'}>Профиль</Link>
                </>: ''}

            </header>


    );
};

export default UserHeader;