import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {setAuthTokens, setId, setUser} from "../../redux/reducers/user";
import './user.css'
import {useHistory} from 'react-router-dom';
import altAvatar from '../../img/avatar.jpg';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getLocations, setApp} from "../../redux/reducers/item";
import SignUp from "./components/SignUp/SignUp";
import ReactPlayer from "react-player";
import MediaCreate from "./components/MediaCreate/MediaCreate";
import EditProfile from "./components/EditProfile/EditProfile";
import PopupMedia from "./PopupMedia";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import {faFacebook, faInstagram, faTelegramPlane, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import LogoutPopup from "./LogoutPopup";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {setHiddenFooter} from "../../redux/reducers/app";
import Footer from "../Footer/Footer";
import profileBg from '../../assets/img/bg/prrofile.png';

const User = () => {

    const history = useHistory();
    const [status, setStatus] = useState('login');
    const user = useSelector(s => s.user.user);
    const authTokens = useSelector(s => s.user.authTokens);
    const id = useSelector(s => s.user.id);
    const locations = useSelector(s => s.item.locations);
    const categories = useSelector(s => s.item.categories);
    const [showMediaCreate, setShowMediaCreate] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showMediaPopup, setShowMediaPopup] = useState(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const dispatch = useDispatch();

    const loginUser = (e, username, password, setLoading, setUserStatus) => {
        setLoading(true);
        e.preventDefault();
        axios.post('/api/token/obtain', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            username,
            password
        }).then(({data}) => {
            console.log(data);
            setUserStatus(true);
            setLoading(false);
            localStorage.setItem('authTokens', JSON.stringify(data));
            dispatch(setAuthTokens(data));
            dispatch(setId(jwt_decode(data.access).user_id));
            localStorage.setItem('id', `${jwt_decode(data.access).user_id}`);
            dispatch(setUser(jwt_decode(data.access).user_id));
        }).catch((error) => {
            setUserStatus(false);
            setLoading(false);
            console.log(error)
        })
    };

    const getUserLocation = (id) => {
        if (locations) {
            let userLocation = locations.filter((item) => {
                return item.id === id
            });
            if (userLocation[0]) {
                return userLocation[0].title
            }
        }
    };
    const getUserCategory = (id) => {
        if (categories) {
            let userCategory = categories.filter((item) => {
                return item.id === id
            });
            if (userCategory[0]) {
                return userCategory[0].content
            }

        }
    };

    useEffect(() => {
        if (user && authTokens) {
            history.push(`/user/home/${user.id}`)
        }
    }, [user, authTokens, history]);

    useEffect(() => {
        dispatch(setApp('order'));
        dispatch(setUser(id));
        dispatch(getLocations());
        dispatch(getCategories());
        dispatch(setHiddenFooter(true));
        dispatch(setHiddenFooter(true));
    }, [dispatch, id]);

    return (
        <section className={"details-wrapper"}>
            {
                showLogoutPopup ? <LogoutPopup setShowLogoutPopup={setShowLogoutPopup}/> : ''
            }
            {
                showEditProfile ? <EditProfile setShowEditProfile={setShowEditProfile}/> : ''
            }
            {
                showMediaCreate ? <MediaCreate setShowMediaCreate={setShowMediaCreate}/> : ''
            }
            {
                showUpdateProfile ? <UpdateProfile setShowUpdateProfile={setShowUpdateProfile}/> : ''
            }

            {
                id ?
                    <>
                        {
                            user ? <>

                                    <div className="mb-100">
                                        <div className="hero__profile">
                                            <div className="cover">
                                                <img src={profileBg} alt=""/>
                                            </div>
                                            <div className="infos">
                                                <div className="container">
                                                    <div
                                                        className="row flex-wrap align-items-center justify-content-between sm:space-y-50">
                                                        <div className="col-md-auto mr-20">
                                                            <div className="avatars d-flex space-x-20
										align-items-center">
                                                                <div className="avatar_wrap">
                                                                        <img className="avatar avatar-lg"
                                                                               src={user && user.profile_image ? user.profile_image: altAvatar}
                                                                               alt="avatar"/>
                                                                </div>
                                                                <h5>{user.username}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-8">
                                                <div className="profile__sidebar">
                                                    <div className="space-y-40">
                                                        <div className="space-y-10">
                                                            <h5>Обо мне</h5>
                                                            <div className="box space-y-20">
                                                                <p className="text_info_adi"><span
                                                                    className="txt_sm color_text">Описание: </span>
                                                                    {user.description}
                                                                </p>
                                                                <div className="row">
                                                                    <div className="col-8">
                                                                    <span
                                                                        className="txt_sm color_text">Категория:</span>
                                                                        <h4>{getUserCategory(user.user_category)}</h4>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <span className="txt_sm color_text">Локация:</span>
                                                                        <h4>{getUserLocation(user.user_location)}</h4>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <Link
                                                                            className={'txt_sm'}
                                                                            to={'/user/edit'}>Перейти в настройки</Link>
                                                                    </div>
                                                                    <div className="col-8">

                                                                        <button
                                                                            className={'logout-btn'}
                                                                           onClick={(e) => {
                                                                               e.preventDefault();
                                                                               setShowLogoutPopup(true)
                                                                           }}
                                                                        >Выйти из аккаунта</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-10">
                                                            <h5>Контакты</h5>
                                                            <div className="box">
                                                                <ul className="social_profile space-y-10 overflow-hidden">
                                                                    {
                                                                        user.contact.length === 0 ? '---' :
                                                                            user.contact.map((item) => {
                                                                                if (item.name === 'facebook') {
                                                                                    return <a
                                                                                        className="color_text"
                                                                                        rel="noreferrer"
                                                                                              key={item.src}
                                                                                        href={item.src}
                                                                                              target={'_blank'}>
                                                                                        <FontAwesomeIcon icon={faFacebook}/></a>
                                                                                } else if (item.name === 'whatsapp') {
                                                                                    return <a
                                                                                        rel="noreferrer"
                                                                                        className="color_text"
                                                                                              key={item.src}
                                                                                        href={item.src}
                                                                                              target={'_blank'}>
                                                                                        <FontAwesomeIcon icon={faWhatsapp}/>
                                                                                    </a>
                                                                                } else if (item.name === 'instagram') {
                                                                                    return <a
                                                                                        rel="noreferrer"
                                                                                        className="color_text"
                                                                                              key={item.src}
                                                                                        href={item.src}
                                                                                              target={'_blank'}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faInstagram}/></a>
                                                                                } else if (item.name === 'telegram') {
                                                                                    return <a
                                                                                        rel="noreferrer"
                                                                                        className="color_text"
                                                                                              key={item.src}
                                                                                        href={item.src}
                                                                                              target={'_blank'}><FontAwesomeIcon
                                                                                        icon={faTelegramPlane}/></a>
                                                                                } else {
                                                                                    return <a
                                                                                        rel="noreferrer"
                                                                                        className="color_text"
                                                                                              key={item.src}
                                                                                        href={item.src}
                                                                                              target={'_blank'}>{item.src}</a>
                                                                                }
                                                                            })
                                                                    }

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="profile__content">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="space-x-10">
                                                            <h5 className="">Медиа</h5>
                                                            <div className="">
                                                                <button
                                                                    className={"show-media-create-button"}
                                                                onClick={()=> setShowMediaCreate(true)}
                                                                ><FontAwesomeIcon icon={faPlus}/></button>
                                                                <div className="row">
                                                                    {
                                                                        user && user.media.length === 0 ? <p>Вы пока ничего не загрузили</p> :
                                                                            user.media.map((item) => {
                                                                                if (item.name === 'img') {
                                                                                    return (
                                                                                        <div className={'col-lg-6'}
                                                                                             key={item.file}>
                                                                                            <div className="profile-images">
                                                                                                {
                                                                                                    showMediaPopup === item.id ? <PopupMedia
                                                                                                        setShowMediaPopup={setShowMediaPopup}
                                                                                                        mediaId={item.id}/> : <button
                                                                                                        onClick={() => {
                                                                                                            setShowMediaPopup(item.id)
                                                                                                        }}
                                                                                                        className={'profile-images-btn'}>...</button>
                                                                                                }
                                                                                                <a data-fancybox="gallery"
                                                                                                   href={`${item.file}`}>
                                                                                                    <img
                                                                                                        className='profile-img'
                                                                                                        src={`${item.file}`}
                                                                                                        alt="картина"/>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div className={'col-lg-6'}
                                                                                             key={item.src}>
                                                                                            <div className="profile-images">
                                                                                                {
                                                                                                    showMediaPopup === item.id ? <PopupMedia
                                                                                                        setShowMediaPopup={setShowMediaPopup}
                                                                                                        mediaId={item.id}/> : <button
                                                                                                        onClick={() => {
                                                                                                            setShowMediaPopup(item.id)
                                                                                                        }}
                                                                                                        className={'profile-images-btn'}>...</button>
                                                                                                }
                                                                                                <a data-fancybox="gallery"
                                                                                                   href={`${item.src}`}>
                                                                                                    <ReactPlayer
                                                                                                        className='profile-video'
                                                                                                        url={item.src}
                                                                                                        controls={true}
                                                                                                        alt=""/>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    )

                                                                                }
                                                                            })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*    <div className={'profile__block'}>*/}
                                    {/*    <div className="profile-top">*/}

                                    {/*        <div className="profile-image">*/}
                                    {/*            <img className={'avatar'}*/}
                                    {/*                 src={user.profile_image ? user.profile_image : altAvatar}*/}
                                    {/*                 alt=""/>*/}
                                    {/*        </div>*/}

                                    {/*        <div className="profile-text">*/}
                                    {/*            <div className="profile-title">*/}
                                    {/*                <h2>{user.first_name ? user.first_name : user.username}*/}
                                    {/*                    <span>{user.id}</span></h2>*/}
                                    {/*                {*/}
                                    {/*                    user.last_name ? <p>{user.first_name} {user.last_name}</p> : ''*/}
                                    {/*                }*/}
                                    {/*                {*/}
                                    {/*                    user.first_name ? <p><b>Имя пользователя:</b> {user.username}</p> : ''*/}
                                    {/*                }*/}
                                    {/*                <p><b>Описание:</b> {user.description} </p>*/}
                                    {/*            </div>*/}

                                    {/*            <div className="profile-info">*/}
                                    {/*                <p><b>Категория:</b> {user.user_category ? getUserCategory(user.user_category): "--"}</p>*/}
                                    {/*                <p><b>Локация:</b> {user.user_location ? getUserLocation(user.user_location): "--"} </p>*/}
                                    {/*                <p><b>Email:</b> {user.email} </p>*/}
                                    {/*                <p><b>Доп-но:</b> доп. инф.</p>*/}
                                    {/*                <p><b>Контакты: </b></p>*/}
                                    {/*                <div className={"profile-contact"}>{*/}
                                    {/*                    user.contact.length === 0 ? '---' :*/}
                                    {/*                        user.contact.map((item) => {*/}
                                    {/*                            if (item.name === 'facebook') {*/}
                                    {/*                                return <a key={item.src} href={item.src} target={'_blank'}>*/}
                                    {/*                                    <FontAwesomeIcon icon={faFacebook}/></a>*/}
                                    {/*                            } else if (item.name === 'whatsapp') {*/}
                                    {/*                                return <a key={item.src} href={item.src} target={'_blank'}>*/}
                                    {/*                                    <FontAwesomeIcon icon={faWhatsapp}/> </a>*/}
                                    {/*                            } else if (item.name === 'instagram') {*/}
                                    {/*                                return <a key={item.src} href={item.src} target={'_blank'}>*/}
                                    {/*                                    <FontAwesomeIcon icon={faInstagram}/></a>*/}
                                    {/*                            } else if (item.name === 'telegram') {*/}
                                    {/*                                return <a key={item.src} href={item.src}*/}
                                    {/*                                          target={'_blank'}><FontAwesomeIcon*/}
                                    {/*                                    icon={faTelegramPlane}/></a>*/}
                                    {/*                            } else {*/}
                                    {/*                                return <a key={item.src} href={item.src}*/}
                                    {/*                                          target={'_blank'}>{item.src}</a>*/}
                                    {/*                            }*/}
                                    {/*                        })*/}
                                    {/*                }</div>*/}
                                    {/*                <div className="link_class">*/}
                                    {/*                    <p><Link to={"/user/edit"} className={'edit-profile-button'}>Редактивровать*/}
                                    {/*                        профиль <FontAwesomeIcon icon={faPenToSquare}/></Link></p>*/}
                                    {/*                    {*/}
                                    {/*                        !user.email ? <>*/}
                                    {/*                            <p className={'verified__message'}>Добавьте email для*/}
                                    {/*                                безопасности! Без email невозможно будет восстановить пароль!!!</p>*/}
                                    {/*                        </> : ''*/}
                                    {/*                    }*/}
                                    {/*                    {*/}
                                    {/*                        user.status_user === 'Free' ? <>*/}
                                    {/*                            <p className={'verified__message'}>Ваш профиль не публичный! Чтобы*/}
                                    {/*                                сделать его публичным <button*/}
                                    {/*                                    onClick={() => setShowUpdateProfile(true)}>НАЖМИТЕ!</button>*/}
                                    {/*                            </p>*/}
                                    {/*                        </> : ''*/}
                                    {/*                    }*/}
                                    {/*                    <button onClick={() => {*/}
                                    {/*                        setShowLogoutPopup(true);*/}
                                    {/*                    }}*/}
                                    {/*                            className={'logout-btn'}>Выйти*/}
                                    {/*                    </button>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}


                                    {/*    </div>*/}
                                    {/*    <hr/>*/}
                                    {/*    <div className="profile-bottom">*/}

                                    {/*        <div className="bottom-row">*/}
                                    {/*            <button*/}
                                    {/*                onClick={() => setShowMediaCreate(true)}*/}
                                    {/*                className={'button-create-media'}><FontAwesomeIcon icon={faPlus}/></button>*/}
                                    {/*            {*/}
                                    {/*                user.media.map(item => {*/}
                                    {/*                    if (item.name === 'img') {*/}
                                    {/*                        return (*/}
                                    {/*                            <div className={"col-4"} key={item.file}>*/}
                                    {/*                                <div className="profile-images">*/}
                                    {/*                                    {*/}
                                    {/*                                        showMediaPopup === item.id ? <PopupMedia*/}
                                    {/*                                            setShowMediaPopup={setShowMediaPopup}*/}
                                    {/*                                            mediaId={item.id}/> : <button*/}
                                    {/*                                            onClick={() => {*/}
                                    {/*                                                setShowMediaPopup(item.id)*/}
                                    {/*                                            }}*/}
                                    {/*                                            className={'profile-images-btn'}>...</button>*/}
                                    {/*                                    }*/}

                                    {/*                                    <a data-fancybox="gallery" href={`${item.file}`}>*/}
                                    {/*                                        <img className='profile-img' src={`${item.file}`}*/}
                                    {/*                                             alt="картина"/>*/}
                                    {/*                                    </a>*/}

                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        )*/}
                                    {/*                    } else {*/}
                                    {/*                        return (*/}
                                    {/*                            <div className={"col-4"} key={item.src}>*/}
                                    {/*                                <div className="profile-images">*/}
                                    {/*                                    {*/}
                                    {/*                                        showMediaPopup === item.id ? <PopupMedia*/}
                                    {/*                                            setShowMediaPopup={setShowMediaPopup}*/}
                                    {/*                                            mediaId={item.id}/> : <button*/}
                                    {/*                                            onClick={() => {*/}
                                    {/*                                                setShowMediaPopup(item.id)*/}
                                    {/*                                            }}*/}
                                    {/*                                            className={'profile-images-btn'}>...</button>*/}
                                    {/*                                    }*/}

                                    {/*                                    <a data-fancybox="gallery" href={`${item.src}`}>*/}
                                    {/*                                        <ReactPlayer className='profile-video'*/}
                                    {/*                                                     url={item.src} controls={true} alt=""/>*/}
                                    {/*                                    </a>*/}
                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        )*/}

                                    {/*                    }*/}
                                    {/*                })*/}
                                    {/*            }*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </>
                                : <div className={'preloader'}>
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                        }
                    </>

                    : status === 'login' ? <Login loginUser={loginUser} setStatus={setStatus}/> :
                    <SignUp loginUser={loginUser} setStatus={setStatus}/>
            }
            <Footer/>
        </section>
    );
};

export default User