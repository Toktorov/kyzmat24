import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {setAuthTokens, setId, setNewUser, setUser} from "../../redux/reducers/user";
import './user.css'
import {useHistory} from 'react-router-dom';
import altAvatar from '../../img/avatar.jpg';
import {faPlus,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {setApp} from "../../redux/reducers/item";
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

const User = () => {
    const HELLO_RU = 'Мы рады, что вы проявили интерес к сервису  kyzmat24.\n' +
        '\n' +
        'Kyzmat24 - это сервис, с помощью которого вы можете вызвать нужного вам мастера.\n' +
        '\n' +
        'Вам больше не нужно звонить знакомым и изучать объявления, чтобы найти мастера. Достаточно разместить заказ в несколько кликов и дождаться звонка исполнителя. \n' +
        '\n' +
        'Как это работает?\n' +
        '\n' +
        'Например: у вас протекает кран в ванной.\n' +
        '\n' +
        '1. Вы выбираете категорию: "Сантехника".\n' +
        '2. Добавляете описание задания: "Поменять кран в ванной", указываете свой бюджет или оставляете цену открытой.\n' +
        '3. Сантехники, зарегистрированные на Kyzmat24, сразу получат уведомление а тот, кто свободен откликнется на вашу заявку и позвонит вам сам.\n' +
        '4. По итогу оказанной услуги, закройте свой заказ и поставьте оценку мастеру. \n' +
        '\n' +
        '---\n' +
        'Вы можете выбрать мастера из нескольких. Для этого, при оформлении заявки, выберите пункт "Ждать отклики".\n' +
        'Мастера отправят вам предложения, а вам останется выбрать понравившегося на основании рейтинга и отзывов.\n' +
        '\n' +
        'Если вам не подходит позвонивший вам исполнитель, откажитесь от него во вкладке "отклики" в вашей заявке и вам позвонит другой мастер.\n' +
        '---\n' +
        '\n' +
        '⚠️ ВАЖНО! Kyzmat24 - не доска объявлений, и чтобы стать исполнителем, необходимо пройти верификацию. Для этого на главном экране пройдите по ссылке "СТАТЬ ИСПОЛНИТЕЛЕМ". \n' +
        'У нас заказчик размещает заявку - мастер откликается и звонит. Заявки, содержащие рекламу, для удобства пользователей отменяются.\n' +
        '\n' +
        '*Eсли у вас есть вопросы с радостью ответим на них.\n' +
        'Служба поддержки работает с 9:00 до 18:00 c понедельника по пятницу.\n' +
        '\n' +
        'Всего вам наилучшего!';
    const HELLO_KG = 'Кош келдиңиз! \n' +
        '“Kyzmat24” тиркемеси Сиз үчүн кызматта!\n' +
        '\n' +
        'Kyzmat24- бул тиркеме менен сиз каалаган мастериңизди таап, үйүңүзгө чакыра аласыз.\n' +
        '\n' +
        'Мындан ары мастерлерди тааныштарыңыздан, инстаграмм , фейсбуктан издеп убара болбойсуз. Тиркемеге сизге керек кызматка заказ бересиз, бүттү. Сиз менен аткаруучу тарап өзү байланышат.\n' +
        '\n' +
        '\n' +
        'Бул кандай иштейт деп түшүнбөй жатасызбы?\n' +
        '\n' +
        '\n' +
        'Мисалы: Сиздин ваннаңыздын кранынан суу агып жатат дейли..\n' +
        '1. Сиз категориялардан    “Сантехника” кызматын тандайсыз;\n' +
        '2. Тапшырма жазасыз:” Ваннанын кранын алмаштыруу”-деп. Сиз өзүңүз төлөм аткара ала турган сумманы киргизсеңиз да болот же болбосо бааны жазбай койсонуз да болот.\n' +
        '3. “Kyzmat24” тиркемесине катталган сантехниктерге билдирүү келээри менен алар сиз менен өздөрү байланышат.\n' +
        '4. Акырында сиз көрсөткөн кызматы үчүн мастерге отзыв жазып өз бааңызды коё аласыз.\n' +
        '- - - - - \n' +
        'Сиз каалаган мастериңизди тандасаңыз да болот.. Ал үчүн арыз толтурууда “ Ждать отклики” пунктун тандап алыңыз.\n' +
        'Мастер сизге өз кызматын сунуштайт. Сиз каалаган мастерди рейтингине карап тандай аласыз.\n' +
        '\n' +
        'Эгер мастер туура келбесе, сиз мастердин кызматынан баш тартсаңыз, сизге ошол эле пунктан башка мастерлер байланышат.\n' +
        '\n' +
        'Эскертүү! Kyzmat24-бул жарыя тактайчасы эмес! Бул тиркемеге аткаруучу катары кошулууну кааласаңыз верификациядан өтүшүңүз керек! Бул үчүн “Стать ИСПОЛНИТЕЛЕМ” ссылкасы аркылуу кириңиз.\n' +
        'Бизде кардар өзүнүн заказын жазат, мастер билдирүү келээри менен өзү байланышат. Реклама маанисинде жазылган арыздар кабыл алынбайт. \n' +
        '\n' +
        'Сизде кандайдыр бир суроо жаралса, биз жооп берүүгө даярбыз.\n' +
        'Кардарды колдоо кызматы жумуш күндөрү саат 9:00дөн 18:00гө чейин иштейт. Ишемби-Жекшемби күндөрү дем алыш.';
    const history = useHistory();
    const [status, setStatus] = useState('login');
    const newUser = useSelector(s => s.user.newUser);
    const user = useSelector(s => s.user.user);
    const authTokens = useSelector(s => s.user.authTokens);
    const id = useSelector(s => s.user.id);
    const [showMediaCreate, setShowMediaCreate] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showMediaPopup, setShowMediaPopup] = useState(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const dispatch = useDispatch();

    const loginUser = (e , username, password, setLoading, setUserStatus) => {
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


    useEffect(() => {
        if (user && authTokens) {
            history.push(`/user/home/${user.id}`)
        }
    }, [user]);

    useEffect(() => {
       dispatch(setApp('order'));
           dispatch(setUser(id));
    }, []);

    return (
        <section>
            {
                showLogoutPopup ? <LogoutPopup setShowLogoutPopup={setShowLogoutPopup}/> : ''
            }
            {
                showEditProfile ? <EditProfile setShowEditProfile={setShowEditProfile}/>: ''
            }
            {
                showMediaCreate ? <MediaCreate setShowMediaCreate={setShowMediaCreate}/> : ''
            }
            {
                showUpdateProfile ? <UpdateProfile setShowUpdateProfile={setShowUpdateProfile}/>: ''
            }
            {
                newUser ? <div className={'welcome'}><p> {HELLO_RU} <br/> <br/>{HELLO_KG}</p>
                    <button onClick={() => {
                        dispatch(setNewUser(false))
                    }
                    }>ok
                    </button>
                </div> : ''
            }
            {
                id ?
                    <div className={'container'}>
                        {
                            user ? <div className={'user-home'}>
                                <div className="home-top">

                                    <div className="top-left">
                                        <img className={'avatar'}
                                             src={user.profile_image ? user.profile_image : altAvatar}
                                             alt=""/>
                                    </div>

                                    <div className="profile-title    top-right">
                                        <h2 className={'home-title'}>{user.first_name ? user.first_name : user.username} <span>{user.id}</span></h2>
                                        {
                                            user.last_name ? <p>{user.first_name} {user.last_name}</p>: ''
                                        }
                                        {
                                            user.first_name ? <p><b>Имя пользователя:</b> {user.username}</p>: ''
                                        }
                                        <p className={'home-descr'}><b>Описание:</b> {user.description} </p>
                                    </div>
                                    <div className="profile-info top-right2">
                                        <p><b>Категория:</b> {user.category}</p>
                                        <p><b>Локация:</b> {user.location} </p>
                                        <p><b>Email:</b> {user.email} </p>
                                        <p><b>Доп-но:</b> доп. инф.</p>
                                        <p><b>Контакты: </b>{
                                            user.contact.length === 0 ? '---' :
                                                user.contact.map((item)=>{
                                                    if (item.name === 'facebook'){
                                                        return <a key={item.src} href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faFacebook}/></a>
                                                    } else if (item.name === 'whatsapp'){
                                                        return  <a key={item.src}  href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faWhatsapp}/> </a>
                                                    } else if (item.name === 'instagram'){
                                                        return  <a key={item.src}  href={item.src} target={'_blank'}> <FontAwesomeIcon icon={faInstagram}/></a>
                                                    } else if (item.name === 'telegram'){
                                                        return <a key={item.src}  href={item.src} target={'_blank'}><FontAwesomeIcon icon={faTelegramPlane}/></a>
                                                    } else {
                                                        return   <a key={item.src}  href={item.src} target={'_blank'}>{item.src}</a>
                                                    }
                                                })
                                        }</p>
                                        <div className="link_class">
                                        <p><Link to={"/user/edit"} className={'edit-profile-button'}>Редактивровать профиль <FontAwesomeIcon icon={faPenToSquare} /></Link></p>
                                        {
                                            !user.verifed ? <>
                                                <p className={'verified__message'}>Пройдите верификацию для безопасности! <a href="#">подробнее...</a></p>
                                                <button>Пройти!</button>
                                            </> : ''
                                        }
                                        {
                                            user.status_user === 'Free' ? <>
                                                <p className={'verified__message'}>Ваш профиль не публичный! Чтобы сделать его публичным <button onClick={()=> setShowUpdateProfile(true)}>НАЖМИТЕ!</button></p>
                                            </> : ''
                                        }
                                        <button onClick={()=>{
                                            setShowLogoutPopup(true);
                                        }}
                                                className={'logout-btn'}>Выйти</button>
                                    </div>                                    </div>

                                </div>
                                <hr/>
                                <div className="home-bottom">

                                    <div className="bottom-row">
                                        <button
                                            onClick={() => setShowMediaCreate(true)}
                                            className={'button-create-media'}><FontAwesomeIcon icon={faPlus} /></button>
                                        {
                                            user.media.map(item => {
                                                if (item.name === 'img') {
                                                    return (
                                                        <div className={"col-4"} key={item.file}>
                                                            <div  className="profile-images">
                                                                {
                                                                    showMediaPopup === item.id ? <PopupMedia setShowMediaPopup={setShowMediaPopup} mediaId={item.id}/> : <button
                                                                        onClick={()=> {
                                                                            setShowMediaPopup(item.id)
                                                                        }}
                                                                        className={'profile-images-btn'}>...</button>
                                                                }

                                                                <a data-fancybox="gallery" href={`${item.file}`}>
                                                                    <img className='profile-img' src={`${item.file}`} alt="картина"/>
                                                                </a>

                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className={"col-4"} key={item.src}>
                                                            <div  className="profile-images">
                                                                {
                                                                    showMediaPopup === item.id ? <PopupMedia setShowMediaPopup={setShowMediaPopup} mediaId={item.id}/> : <button
                                                                        onClick={()=> {
                                                                            setShowMediaPopup(item.id)
                                                                        }}
                                                                        className={'profile-images-btn'}>...</button>
                                                                }

                                                                <a data-fancybox="gallery" href={`${item.src}`}>
                                                                    <ReactPlayer className='profile-video' url={item.src} controls={true} alt=""/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                                : <div className={'preloader'}>
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                        }
                    </div>

                    : status === 'login' ? <Login loginUser={loginUser} setStatus={setStatus}/> : <SignUp loginUser={loginUser} setStatus={setStatus}/>
            }
        </section>
    );
};

export default User