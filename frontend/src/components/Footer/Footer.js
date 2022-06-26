import React from 'react';
import './footer.css';
import {useSelector} from "react-redux";

const Footer = () => {
    const user = useSelector(s => s.user.user);
    const app = useSelector(s => s.item.app);
    return (
        <footer className={!user && app === 'order' ? 'footer footer-mt' : 'footer'}>
            <div className="container">
                <p>Это подвал сайта</p>
                <p>Тут пока ничего нет(</p>
                <p>Куба скоро всё сделает ;)</p>
            </div>
        </footer>
    );
};

export default Footer;