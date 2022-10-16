import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import './service.css';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getLocations, getService, setApp} from "../../redux/reducers/item";
import {useParams, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faWhatsapp, faTelegramPlane, faInstagram} from "@fortawesome/free-brands-svg-icons";
import Footer from "../Footer/Footer";
import {setHiddenFooter} from "../../redux/reducers/app";

const Service = () => {
    const serviceRedux = useSelector(s => s.item.service);
    const locations = useSelector(s => s.item.locations);
    const categories = useSelector(s => s.item.categories);
    const [service, setService] = useState({});
    const dispatch = useDispatch();
    const params = useParams();
   const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    const getUserLocation = (id) => {
        if (locations) {
            let userLocation = locations.filter((item) => {
                return item.id === id
            });
            if (userLocation[0]){
                return userLocation[0].title
            }
        }
    };
    const getUserCategory = (id) => {
        if (categories) {
            let userCategory = categories.filter((item) => {
                return item.id === id
            });
            if(userCategory[0]){
                return userCategory[0].content
            }

        }
    };

    useEffect(()=>{
        setService(serviceRedux)
    }, [serviceRedux]);
    useEffect(() => {
        setService({});
        dispatch(getService(params.id));
        dispatch(setApp('kyzmat'));
        dispatch(getLocations());
        dispatch(getCategories());
        dispatch(setHiddenFooter(true));
    }, [dispatch, params.id]);

    return (


        <div className={'details-wrapper'}>
            {
                JSON.stringify(service) === '{}' ?  <div className={'login-preloader'}>
                        <div className="lds-ring">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div>
                    :<div className="container">
                        <button
                            onClick={()=>{
                                goBack()
                            }}
                            className="btn btn-white btn-sm my-40">
                            Назад
                        </button>
                        <div className="item_details">
                            <div className="row sm:space-y-20">
                                <div className="col-lg-6">
                                    <img className="item_img" src={service.profile_image}
                                         alt=""/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="space-y-20">
                                        <h3>{service.first_name}</h3>
                                        <div className="d-flex justify-content-between">
                                            <div className="space-x-10 d-flex align-items-center">
                                                <p>Имя пользователя: {service.username}</p>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="space-y-20">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="tabs-1"
                                                         role="tabpanel">
                                                        <p><span
                                                            className="txt txt_sm_bold color_black">Описание: </span>
                                                            {service.description}
                                                        </p>
                                                        <p>
                                                            <span className="txt txt_sm_bold color_black">Категория: </span>
                                                            {getUserCategory(service.user_category)}
                                                        </p>
                                                        <p>
                                                            <span className="txt txt_sm_bold color_black">Локация: </span>
                                                            {service.user_location ? getUserLocation(service.user_location): "--"}
                                                        </p>
                                                        <p>
                                                            <span className="txt txt_sm_bold color_black">Email: </span>
                                                            {service.email}
                                                        </p>
                                                        <p>
                                                            <span className="txt txt_sm_bold color_black">Контакты: </span>
                                                            {
                                                                service.contact.length === 0 ? <p> --- </p> :
                                                                                                    service.contact.map((item) => {
                                                                                                        if (item.name === 'facebook') {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={item.src}
                                                                                                                target={'_blank'}>
                                                                                                                <FontAwesomeIcon icon={faFacebook}/></a>
                                                                                                        } else if (item.name === 'whatsapp') {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={item.src}
                                                                                                                target={'_blank'}>
                                                                                                                <FontAwesomeIcon icon={faWhatsapp}/> </a>
                                                                                                        } else if (item.name === 'instagram') {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={item.src}
                                                                                                                target={'_blank'}>
                                                                                                                <FontAwesomeIcon icon={faInstagram}/></a>
                                                                                                        } else if (item.name === 'telegram') {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={item.src}
                                                                                                                      target={'_blank'}><FontAwesomeIcon
                                                                                                                icon={faTelegramPlane}/></a>
                                                                                                        } else if (item.name === 'tel') {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={`tel:${item.src}`}>{item.src}</a>
                                                                                                        } else {
                                                                                                            return <a className={"service-contact-link"}
                                                                                                                rel="noreferrer"
                                                                                                                key={item.src}
                                                                                                                href={item.src}
                                                                                                                      target={'_blank'}>{item.name}</a>
                                                                                                        }
                                                                                                    })
                                                            }
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="hr2"> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-50 top_margin">
                            <h3 className="mb-30">Фото/Видео</h3>
                            <div className="row display-flex">
                                {
                                    !service.media ? <p>Пользователь пока не загрузил</p> :
                                        service.media.map((item) => {
                                            if (item.name === 'img') {
                                                return (
                                                    <div className={'col-xxl-3 col-xl-4 col-lg-6'} key={item.file}>
                                                        <div className="profile-images">
                                                            <a data-fancybox="gallery" href={`${item.file}`}>
                                                                <img className='profile-img' src={`${item.file}`}
                                                                     alt="картина"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className={'col-xxl-3 col-xl-4 col-lg-6'} key={item.src}>
                                                        <div className="profile-images">
                                                            <a data-fancybox="gallery" href={`${item.src}`}>
                                                                <ReactPlayer className='profile-video'
                                                                             url={item.src} controls={true} alt=""/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )

                                            }
                                        })}


                            </div>
                        </div>
                    </div>
            }
            <Footer/>
        </div>


    );
};

export default Service;