import React, {useEffect} from 'react';
import ReactPlayer from "react-player";
import './service.css';
import {useDispatch, useSelector} from "react-redux";
import {getService, setApp} from "../../redux/reducers/item";
import {Link, useHistory, useParams} from "react-router-dom";
import avatar from '../../img/avatar.jpg';
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faWhatsapp, faTelegramPlane, faInstagram} from "@fortawesome/free-brands-svg-icons";

const Service = () => {
   const service = useSelector(s => s.item.service);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const goBack = (e) => {
        history.goBack();
    };

    useEffect(() => {
      dispatch(getService(params.id));
        dispatch(setApp('kyzmat'))
    }, []);


    return (


        <section className="profile">
            <div className="container">
                    {
                        JSON.stringify(service) === "{}" || JSON.stringify(service) === "[]" ? '' :
                            <div className="profile__block">
                                <Link className="close-link" to={"#"} onClick={() => {
                                    dispatch(goBack);
                                }}> <FontAwesomeIcon icon={faRightFromBracket}/></Link>
                                <div className="profile-top">
                                    {
                                        !service.profile_image
                                            ? <div className={"profile-image"}><img  src={avatar} alt=""/></div>
                                            :  <div className={"profile-image"}><img  src={service.profile_image} alt=""/></div>
                                    }

                                    <div className="profile-title">
                                        <h2>{service.first_name ? service.first_name : service.username}</h2>
                                        {
                                            service.last_name ? <p>{service.first_name} {service.last_name}</p>: ''
                                        }
                                        {
                                            service.first_name ?  <p><b>Имя пользователя:</b> {service.username}</p> : ''
                                        }
                                        <p><b>Описание: </b>{service.description}</p>
                                    </div>
                                    <div className="profile-info">
                                        <p>Адресс: <span>{service.location}</span></p>
                                        <p>Телефон: <a href={`tel: ${service.tel}`}>{service.tel}</a></p>
                                        <p>Email: <a href={`mailto: ${service.email}`}>{service.email}</a></p>
                                        <p>Дополнительные контакты:</p>
                                        <div className="profile-contact">
                                            {
                                                service.contact.length === 0 ? <p> --- </p> :
                                                    service.contact.map((item)=>{
                                                        if (item.name === 'facebook'){
                                                            return <a key={item.src} href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faFacebook}/></a>
                                                        } else if (item.name === 'whatsapp'){
                                                            return  <a key={item.src}  href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faWhatsapp}/> </a>
                                                        } else if (item.name === 'instagram'){
                                                            return  <a key={item.src}  href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faInstagram}/></a>
                                                        } else if (item.name === 'telegram'){
                                                            return <a key={item.src}  href={item.src} target={'_blank'}><FontAwesomeIcon icon={faTelegramPlane}/></a>
                                                        } else if (item.name === 'tel'){
                                                            return <a href={`tel:${item.src}`}>{item.src}</a>
                                                        }else{
                                                            return   <a key={item.src}  href={item.src} target={'_blank'}>{item.name}</a>
                                                        }
                                                    })
                                            }

                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="profile-bottom">
                                    <h3>ФОТО/ВИДЕО</h3>
                                    <div className="profile-media">
                                        {
                                            !service.media  ?  <p>Пользователь пока не загрузил</p> :
                                                service.media.map((item) => {
                                                    if (item.name === 'img') {
                                                        return (
                                                            <div className={'col-4'} key={item.file}>
                                                                <div className="profile-images">
                                                                    <a data-fancybox="gallery" href={`${item.file}`}>
                                                                        <img className='profile-img' src={`${item.file}`} alt="картина"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className={'col-4'} key={item.src} >
                                                                <div className="profile-images">
                                                                    <a data-fancybox="gallery" href={`${item.src}`}>
                                                                        <ReactPlayer className='profile-video' url={item.src} controls={true} alt=""/>
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
            </div>
        </section>



    );
};

export default Service;