import React, {useEffect, useState} from 'react';
import {setAuthTokens, logoutUser, setNewUser} from "../../redux/reducers/user";
import './user.css'
import {useHistory} from 'react-router-dom'

import {faPlus,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {setApp} from "../../redux/reducers/item";
import SignUp from "./components/SignUp/SignUp";
import ReactPlayer from "react-player";
import MediaCreate from "./components/MediaCreate/MediaCreate";
import EditProfile from "./components/EditProfile/EditProfile";

const User = () => {
    var jQuery = window.$;
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
    const [update, setUpdate] = useState(null);
    const [status, setStatus] = useState('login');
    const newUser = useSelector(s => s.user.newUser);
    const authTokens = useSelector(s => s.user.authTokens);
    const user = useSelector(s => s.user.user);
    const [showMediaCreate, setShowMediaCreate] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    let [loading, setLoading] = useState(true);
    const dispatch = useDispatch();







    let updateToken = async () => {

        let response = await fetch('https://kyzmat24.com/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        });

        let data = await response.json();

        if (response.status === 200) {
            dispatch(setAuthTokens(data));
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            dispatch(logoutUser())
        }

        if (loading) {
            setLoading(false)
        }
    };


    useEffect(() => {

        if (loading) {
            // updateToken()
        }

        let fourMinutes = 1000 * 60 * 4;

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes);
        return () => clearInterval(interval)

    }, [authTokens, loading]);

    useEffect(() => {
        //   getNotes();
    }, [authTokens]);

    useEffect(() => {
        dispatch(setApp('order'));
        console.log(window.location);

    }, []);
    useEffect(() => {
        if (user) {
            history.push(`/user/home/${user.id}`)
        }
    }, [user]);

    return (
        <section>
            {
                showEditProfile ? <EditProfile setShowEditProfile={setShowEditProfile}/>: ''
            }
            {
                showMediaCreate ? <MediaCreate setShowMediaCreate={setShowMediaCreate}/> : ''
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
                user ?
                    <>
                        <div className={'home'}>
                            <button onClick={() => {
                                dispatch(logoutUser());
                                history.push(`/user`)
                            }}>выйти
                            </button>
                            <div className="home-top">
                                <div className="top-left">
                                    <img className={'avatar'}
                                         src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"
                                         alt=""/>
                                </div>
                                <div className="top-right">
                                    <h2 className={'home-title'}>{user.first_name ? user.first_name : user.username} <span>{user.id}</span></h2>
                                    {
                                        user.first_name ? <p><b>Имя пользователя:</b> {user.username}</p>: ''
                                    }
                                    <p className={'home-descr'}><b>Описание</b> {user.description} </p>
                                    <p><b>Категория:</b> {user.category}</p>
                                    <p><b>Локация:</b> {user.location} </p>
                                    <p><b>Доп-но:</b> доп. инф.</p>
                                    <p><b>Контакты: </b>{user.contact.map((item) => {
                                        return <span key={item.id}>{item.src}</span>
                                    })}</p>
                                    <button onClick={()=> setShowEditProfile(true)} className={'edit-profile-button'}>Редактивровать профиль <FontAwesomeIcon icon={faPenToSquare} /></button>
                                    {
                                        !user.verifed ? <>
                                            <p className={'verified__message'}>Пройдите верификацию для безопасности! <a href="#">подробнее...</a></p>
                                            <button>Пройти!</button>
                                        </> : ''
                                    }
                                </div>
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
                                                    <div key={item.file} className="profile-images">
                                                        <a data-fancybox="gallery" href={`${item.file}`}>
                                                            <img className='profile-img' src={`${item.file}`} alt="картина"/>
                                                        </a>
                                                        <button>delete</button>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={item.src} className="profile-images">
                                                        <a data-fancybox="gallery" href={`${item.src}`}>
                                                            <ReactPlayer className='profile-video' url={item.src} controls={true} alt=""/>
                                                        </a>
                                                        <button>delete</button>
                                                    </div>
                                                )

                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </>

                    : status === 'login' ? <Login setStatus={setStatus}/> : <SignUp setStatus={setStatus}/>
            }
        </section>
    );
};

export default User