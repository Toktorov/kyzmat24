import React, {useEffect, useState} from 'react';
import {setAuthTokens, setUser, logoutUser, setNewUser} from "../../redux/reducers/user";
import './user.css'
import {useHistory} from 'react-router-dom'

import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {setApp} from "../../redux/reducers/item";
import SignUp from "./components/SignUp/SignUp";
import axios from "axios";

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
    const [update, setUpdate] = useState(null);
    const [change, setChange] = useState('');
    const [status, setStatus] = useState('login');
    const newUser = useSelector(s => s.user.newUser);
    const id = useSelector(s => s.user.id);
    const [avatar, setAvatar] = useState('');
    const [photo, setPhoto] = useState('');
    const authTokens = useSelector(s => s.user.authTokens);
    const user = useSelector(s => s.user.user);
    let [loading, setLoading] = useState(true);
    let [notes, setNotes] = useState([]);
    const dispatch = useDispatch();

    const updateUser = (key, value) => {
        axios.put(`https://kyzmat24.com/api/users/update/${id}`, {
            ...user,
            [key]: value,
        }).then(response => {
            console.log(response);
            axios(`/api/users/${id}`).then(({data}) => {
                dispatch(setUser(data));
                localStorage.setItem('user', JSON.stringify(data))
            })
        })
    };


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
            //   dispatch(setUser(jwt_decode(data.access)));
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
        console.log(window.location)
        //  axios(`/api/users/${id}`).then(({data})=> dispatch(setUser(data)));
    }, []);
    useEffect(() => {
        if (user) {
            history.push(`/user/home/${user.id}`)
        }
    }, [user]);

    return (
        <section>
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
                                    <label>
                                        Изменить/добавить фото
                                        <input onChange={(e) => setAvatar(e.target.value)} accept='image/*'
                                               type="file"/>
                                    </label>

                                    <button
                                        onClick={() => {
                                            axios.put(`https://kyzmat24.com/api/users/update_password/${id}`, {
                                                headers: {
                                                    Authorization: `Bearer ${authTokens.access}`
                                                },
                                                old_password: 'kuba2020',
                                                new_password: 'admin',
                                            }).then(response => console.log(response))
                                        }}
                                    >change password
                                    </button>

                                    <button onClick={() => {
                                        axios.post('/api/users/request-reset-email/',
                                            {
                                                "email": "kuba.duishobaevich@gmail.com",
                                                "redirect_url": "https://kyzmat24.com/api/users/password-reset-complete"
                                            }
                                        )
                                            .then(response => console.log(response))
                                    }}>reset
                                    </button>

                                </div>
                                <div className="top-right">
                                    <h2 className={'home-title'}>{user.username} <span>{user.id}</span>
                                        <button onClick={() => {
                                            setUpdate('username');
                                        }}><i className="far fa-edit"> </i></button>
                                    </h2>

                                    {
                                        update === 'description'
                                            ? <>
                                                <input value={change} onChange={(e) => setChange(e.target.value)}
                                                       type="text"/>
                                                <button onClick={() => setUpdate(null)}>cancel</button>
                                                <button onClick={() => {
                                                    updateUser('description', change);
                                                    setUpdate(null)
                                                }}>save
                                                </button>
                                            </>
                                            : <p className={'home-descr'}><b>Описание</b> {user.description}
                                                <button onClick={() => {
                                                    setUpdate('description');
                                                    setChange(user.description)
                                                }}><i className="far fa-edit"> </i></button>
                                            </p>
                                    }


                                    <p><b>Категория:</b> категория
                                        <button onClick={() => {
                                            setUpdate('category')
                                        }}><i className="far fa-edit"> </i></button>
                                    </p>
                                    <p><b>Локация:</b> {user.location}
                                        <button onClick={() => {
                                            setUpdate('location')
                                        }}><i className="far fa-edit"> </i></button>
                                    </p>
                                    <p><b>Доп-но:</b> доп. инф.</p>
                                    <p><b>Контакты: </b>{user.contact.map((item) => {
                                        return <span key={item.id}>{item.src}</span>
                                    })}</p>
                                    <a href={"#"}>Редактивровать профиль <i className="far fa-edit"> </i></a>
                                    <button onClick={() => {
                                        axios.post('/api/users/contact_create/', {
                                            "name": "tel",
                                            "src": "0559996474",
                                            "user": id
                                        }).then((response) => console.log(response))
                                    }}>Добавить контакт
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <div className="home-bottom">
                                <div className="bottom-form">
                                    <form enctype="multipart/form-data" className="form-photo" method={"POST"} action={'/api/users/media_create/'} >
                                        <label>
                                            Добавить фото
                                            <input name={'file'} required={true}
                                                   type="file"  accept="image/*"/>
                                        </label>
                                        <input type="hidden" value={'img'} name={'name'}/>
                                        <input type="hidden" value={''} name={'src'}/>
                                        <input type="hidden" value={id} name={'user'}/>
                                        <button type={'submit'} >Добавить
                                        </button>
                                    </form>
                                    <hr/>
                                    <form className="form-video">
                                        <label>
                                            Добавьте ссылку на видео в ютуб чтобы добавить видое
                                            <input required={true} type="url"/>
                                        </label>
                                        <input onClick="window.location.href = 'http://localhost:3000/user/home/11';"
                                               type="submit" value="Submit request"/>
                                    </form>
                                </div>
                                <div className="bottom-row">
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                    <div className="bottom-media">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU"
                                            alt=""/>
                                        <button>delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul>
                            {notes.map(note => (
                                <li key={note.id}>{note.body}</li>
                            ))}
                        </ul>

                    </>

                    : status === 'login' ? <Login setStatus={setStatus}/> : <SignUp setStatus={setStatus}/>
            }
        </section>
    );
};

export default User