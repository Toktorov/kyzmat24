import React, {useEffect} from 'react';
import ReactPlayer from "react-player";
import './service.css';
import {useDispatch, useSelector} from "react-redux";
import {getService, setApp} from "../../redux/reducers/item";
import {Link, useHistory, useParams} from "react-router-dom";
import avatar from '../../img/avatar.jpg';

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


                    <div className="profile">

                        {
                            JSON.stringify(service) === "{}" || JSON.stringify(service) === "[]" ? '' :
                                <div className="profile__info">
                                    <Link className="close-link" to={"#"} onClick={() => {
                                        dispatch(goBack);
                                    }}><span className={'close-profile'}> </span></Link>
                                    <div className="profile-top">
                                        {
                                            !service.profile_image
                                                ? <img src={avatar} alt=""/>
                                                :  <img src={service.profile_image} alt=""/>
                                        }

                                        <div className="profile-contact">
                                            <h2>{service.username}</h2>
                                            <h3>{service.description}</h3>
                                            <p>Количество мест: <span>{service.places}</span></p>
                                            <p>Адресс: <span>{service.location}</span></p>
                                            <p>Телефон: <a href={`tel: ${service.tel}`}>{service.tel}</a></p>
                                            <p>Email: <a href={`mailto: ${service.email}`}>{service.email}</a></p>
                                            <p>Дополнительные контакты:</p>
                                            <div className="profile-social">
                                                {
                                                    service.contact.length === 0 ? <p> --- </p> :
                                                        service.contact.map((item)=>{
                                                            if (item.name === 'facebook'){
                                                                return <a key={item.src} href={item.src} target={'_blank'}><i className="fab fa-facebook"> </i></a>
                                                            } else if (item.name === 'whatsapp'){
                                                                return  <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-whatsapp"> </i></a>
                                                            } else if (item.name === 'instagram'){
                                                                return  <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-instagram"> </i></a>
                                                            } else if (item.name === 'telegram'){
                                                                return <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-telegram-plane"> </i></a>
                                                            } else {
                                                                return   <a key={item.src}  href={item.src} target={'_blank'}>{item.src}</a>
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
                                                                <div key={item.file} className="profile-images">
                                                                    <a data-fancybox="gallery" href={`${item.file}`}>
                                                                        <img className='profile-img' src={`${item.file}`} alt="картина"/>
                                                                    </a>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div key={item.src} className="profile-images">
                                                                    <a data-fancybox="gallery" href={`${item.src}`}>
                                                                        <ReactPlayer className='profile-video' url={item.src} controls={true} alt=""/>
                                                                    </a>
                                                                </div>
                                                            )

                                                        }
                                                    })}

                                        </div>



                                    </div>
                                </div>
                        }

                    </div>



    );
};

export default Service;