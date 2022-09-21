import React from 'react';
//import './footer.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Footer = () => {
    const user = useSelector(s => s.user.user);
    const app = useSelector(s => s.item.app);
    return (
        <>
            <footer className="footer__1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 space-y-20">
                            <div className="footer__logo">
                                <a className="h4_09" href="index.html">
                                    Kyzmat24
                                </a>
                            </div>
                            <p className="footer__text">
                                Kyzmat24 - это плотформа для поиска работы или сотрудника
                            </p>
                            <div>
                                <ul className="footer__social space-x-10 mb-40">
                                    <li><a href="Home1.html"> <i className="ri-facebook-line"></i> </a>
                                    </li>
                                    <li><a href="Home1.html"> <i className="ri-messenger-line"></i> </a>
                                    </li>
                                    <li><a href="Home1.html"> <i className="ri-whatsapp-line"></i> </a>
                                    </li>
                                    <li><a href="Home1.html"> <i className="ri-youtube-line"></i> </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <p className="copyright text-center">
                            Copyright © 2022. Created with love by Bezbak, Kubanych, Kurmanbek.
                        </p>
                    </div>
                </div>
            </footer>
            {/*<div className="container flex_block">*/}

            {/*    <h2 className="info_text">Для сотрудничества или замечаний по нашей работе</h2>*/}
            {/*    <div className="info_block_footer">*/}
            {/*    <div className="logo_section">*/}
            {/*        <h1 className='footer__logo'><Link to={'/'}>kyzmat24</Link></h1>*/}
            {/*        <p className="flex_text"><a href="mailto:kyzmat24.com"><FontAwesomeIcon icon={faEnvelope} /> kyzmat24@gmail.com</a></p>*/}
            {/*        <p className="flex_text"><a href="#"><FontAwesomeIcon icon={faInstagram}/> @kyzmat24</a></p>*/}
            {/*        <p className="flex_text"><a href="#"><FontAwesomeIcon icon={faFacebook}/> facebook</a></p>*/}
            {/*    </div>*/}
            {/*    <ul className="nav_bar">*/}
            {/*        <li><Link to="/about">О нас</Link></li>*/}
            {/*        <li><Link to="/search">Поиск</Link></li>*/}
            {/*        <li><Link to="/reviews">Оставить отзыв</Link></li>*/}
            {/*    </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Footer;