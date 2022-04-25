import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {setAuthTokens, setUser, logoutUser, setNewUser} from "../../redux/reducers/user";
import './user.css'
import {useHistory} from 'react-router-dom'

import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {setApp} from "../../redux/reducers/item";
import SignUp from "./components/SignUp/SignUp";
import axios from "axios";

const User = () => {
    const history = useHistory();
    const [status, setStatus] = useState('login');
    const newUser = useSelector(s => s.user.newUser);
    const id = useSelector(s => s.user.id);
    const [avatar, setAvatar] = useState('');

    const authTokens = useSelector(s => s.user.authTokens);
    const user = useSelector(s => s.user.user);

    let [loading, setLoading] = useState(true);

    let [notes, setNotes] = useState([]);


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
      //  axios(`/api/users/${id}`).then(({data})=> dispatch(setUser(data)));
    }, []);
    useEffect(()=>{
        if(user){
            history.push(`/user/home/${user.id}`)
        }
    }, [user]);

    return (
        <section>
            {
                newUser ? <div className={'welcome'}><h2>Добро подаловать в KYZMAT24.COM!</h2>
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
                            }}>выйти</button>
                            <div className="home-top">
                                <div className="top-left">
                                    <img className={'avatar'}
                                         src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"
                                         alt=""/>
                                    <label>
                                        Изменить/добавить фото
                                        <input onChange={(e)=> setAvatar(e.target.value)} accept='image/*' type="file"/>
                                    </label>
                                    <button onClick={()=>{
                                        axios.post('https://kyzmat24.com/api/users/update/1',{
                                            profile_image: avatar
                                        })
                                    }}>save</button>
                                </div>
                                <div className="top-right">
                                    <h2 className={'home-title'}>{user.username} <span>{user.id}</span></h2>
                                    <p className={'home-descr'}>Description Lorem ipsum dolor sit amet, consectetur
                                        adipisicing
                                        elit. Ab amet debitis velit. At consequuntur dolorem doloribus ea enim facere
                                        iure neque
                                        nobis officia, officiis quaerat quia quidem reiciendis velit voluptas.</p>
                                    <p><b>Категория:</b> категория</p>
                                    <p><b>Локация:</b> локация</p>
                                    <p><b>Доп-но:</b> доп. инф.</p>
                                    <a href={"#"}>Редактивровать профиль <i className="far fa-edit"> </i></a>
                                </div>

                            </div>
                            <hr/>
                            <div className="home-bottom">
                                <div className="bottom-form">
                                    <form className="form-photo">
                                        <label>
                                            Добавить фото
                                            <input required={true} accept={'images/*'} type="file"/>
                                        </label>
                                        <button type={'submit'}>Добавить</button>
                                    </form>
                                    <hr/>
                                    <form className="form-video">
                                        <label>
                                            Добавьте ссылку на видео в ютуб чтобы добавить видое
                                            <input required={true} type="url"/>
                                        </label>
                                        <button type={'submit'}>Добавить</button>
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

export default User;