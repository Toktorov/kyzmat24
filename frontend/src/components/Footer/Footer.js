import React from 'react';
import './footer.css';
import {Link} from "react-router-dom";
import {faFacebook, faInstagram, faWhatsapp, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Footer = () => {
    return (
        <>
            <footer className="footer__1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 space-y-20">
                            <div className="footer__logo">
                                <Link  to={"/"}>
                                    Kyzmat24
                                </Link>
                            </div>
                            <p className="footer__text">
                                Kyzmat24 - это плотформа для поиска работы или сотрудника
                            </p>
                            <div>
                                <ul className="footer__social space-x-10 mb-40">
                                    {/*<li><Link to={"/"}> <FontAwesomeIcon icon={faFacebook}/> </Link>*/}
                                    {/*</li>*/}
                                    {/*<li><Link to={"/"}> <FontAwesomeIcon icon={faInstagram}/> </Link>*/}
                                    {/*</li>*/}
                                    <li><a href={"https://wa.me/+996771830438"} target={'_blank'}> <FontAwesomeIcon icon={faWhatsapp}/> </a>
                                    </li>
                                    <li>
                                        <a href="tel:+996 771 830 438"><FontAwesomeIcon icon={faPhone}/> +996 771 830 438</a>
                                    </li>
                                    {/*<li><Link to={"/"}> <FontAwesomeIcon icon={faYoutube}/> </Link>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>

                        </div>
                        <p className="copyright text-center">
                            Copyright © 2022. Created with love by Bezbak, Kubanychbek, Kurmanbek.
                            <br/>
                            Beknazar - General director
                            <br/>
                            Kubanychbek - Technical director
                            <br/>
                            Azamat - Finance director
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;