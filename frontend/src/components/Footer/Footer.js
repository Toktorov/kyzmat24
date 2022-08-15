import React from 'react';
import './footer.css';
import {useSelector} from "react-redux";

const Footer = () => {
    const user = useSelector(s => s.user.user);
    const app = useSelector(s => s.item.app);
    return (
        <footer className={!user && app === 'order' ? 'footer footer-mt' : 'footer'}>
            <div className="container">

                <h2 className="info_text">Для сотрудничества или замечаний по нашей работе</h2>
                <div className="logo_section">
                    <img src="" alt="" className="logo"/>
                    <p className="flex_text"><a href="mailto:kyzmat24.com">kyzmat24.com</a></p>
                    <p className="flex_text"><a href="www.instagram.com">@kyzmat24</a></p>
                    <p className="flex_text"><a href="www.facebookcom">facebook</a></p>
                </div>
                <ul className="nav_bar">
                    <li><a href="/category">Category</a></li>
                    <li><a href="/search">Поиск</a></li>
                    <li><a href="/reviews">Оставить отзыв</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;