import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import './service.css';
import {useDispatch, useSelector} from "react-redux";
import {getItems, getProfile, setApp} from "../../redux/reducers/item";
import {Link, useHistory, useParams} from "react-router-dom";
import avatar from '../../img/avatar.jpg';

const Service = () => {
    const element = useSelector((s)=>s.item.items);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
   const [profile, setProfile] = useState([]);
    const goBack = (e) => {
        history.goBack();
    };

    useEffect(() => {
      dispatch(getProfile(params.id));
        dispatch(getItems());

    }, []);
useEffect(()=>{
    dispatch(setApp('kyzmat'));
    setProfile(element.filter((item)=>{
        return item.id == params.id
    }))
},[element]);

    return (
        <> {
            profile.map((element) => {
                return (

                    <div className="profile" key={element.id}>


                        <div className="profile__info">
                            <Link className="close-link" to={"#"} onClick={() => {
                                dispatch(goBack);
                            }}><span className={'close-profile'}> </span></Link>
                            <div className="profile-top">
                                {
                                    element.imgsrc.length === 0
                                        ? <img src={avatar} alt=""/>
                                        :  <img src={element.imgsrc} alt=""/>
                                }

                                <div className="profile-contact">
                                    <h2>{element.title}</h2>
                                    <h3>{element.description}</h3>
                                    <p>Количество мест: <span>{element.places}</span></p>
                                    <p>Адресс: <span>{element.location}</span></p>
                                    <p>Телефон: <a href={`tel: ${element.tel}`}>{element.tel}</a></p>
                                    <p>Email: <a href={`mailto: ${element.email}`}>{element.email}</a></p>
                                    <p>Дополнительные контакты:</p>
                                    <div className="profile-social">
                                        {
                                            element.contact.length === 0 ? <p> --- </p> :
                                            element.contact.map((item)=>{
                                                if (item.name === 'facebook'){
                                                   return <a key={item.src} href={item.src} target={'_blank'}><i className="fab fa-facebook"> </i></a>
                                                } else if (item.name === 'whatsapp'){
                                                  return  <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-whatsapp"> </i></a>
                                                } else if (item.name === 'instagram'){
                                                    return  <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-instagram"> </i></a>
                                                } else if (item.name === 'telegram'){
                                                   return <a key={item.src}  href={item.src} target={'_blank'}><i className="fab fa-telegram-plane"> </i></a>
                                                } else {
                                                    return   <a key={item.src}  href={item.src} target={'_blank'}>{item.value}</a>
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
                                        element.media.length === 0 ? <p>Пользователь пока не загрузил</p> :
                                        element.media.map((item) => {
                                        if (item.name === 'img') {
                                            return (
                                                <div key={item.src} className="profile-images">
                                                    <a data-fancybox="gallery" href={`${item.src}`}>
                                                        <img className='profile-img' src={`${item.src}`} alt=""/>
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
                    </div>

                )
            })

        }
        </>

    );
};

export default Service;