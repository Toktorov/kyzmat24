import React, {useEffect, useState} from 'react';
import axios from "axios";
import {setAuthTokens, setUser, setNewUser, setId} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const SignUp = ({setStatus}) => {
    const id = useSelector(s => s.user.id);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userStatus, setUserStatus] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
   const signUp = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('api/users/', {
            headers: {
                'Content-Type': 'application/json'
            },
            username,
            email: "",
            first_name: "",
            last_name: "",
            description: "",
            profile_image: null,
            location: "",
            another: "",
            password

        }).then(() => {
            setLoading(true);
            e.preventDefault();
            axios.post('api/token/obtain', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                username,
                password
            }).then(({data}) => {
                setUserStatus(true);
                localStorage.setItem('authTokens', JSON.stringify(data));
                dispatch(setAuthTokens(data));
                dispatch(setId(jwt_decode(data.access).user_id));
                localStorage.setItem('id', `${jwt_decode(data.access).user_id}`);
            }).catch((error) => {
                setUserStatus(false);
                setLoading(false);
            });


        }).catch(() => {
            setUserStatus(false);
            setLoading(false);
        });
    };
    useEffect(()=>{
        if (localStorage.getItem('user')){

        } else {
            axios(`/api/users/${id}`).then(({data})=>{
                dispatch(setUser(data));
                localStorage.setItem('user', JSON.stringify(data));
                dispatch(setNewUser(true));
                setLoading(false);
            });
        }

    },[id]);
    return (
        <div className={'login'}>
            <form onSubmit={signUp}>
                <h3>Регистрация</h3>
                {
                    userStatus === false && loading === false ?
                        <h4 className={'error'}>Пользователь с таким именем уже есть. Выберите другое имя и попрбуйте
                            снова</h4> : ''
                }
                <input required={true} type="text" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Введите логин"/>
                <input required={true} type="password" onChange={e => setPassword(e.target.value)}
                       placeholder="Введите пароль"/>
                {
                    loading === true ? <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div> : <>
                        <button className={'login-btn'} type="submit">Зарегистрироваться</button>
                        <p>Есть аккаунт? <button className={'login-btn-link'}
                                                 onClick={() => setStatus('login')}>Войти</button></p>
                    </>
                }

            </form>
        </div>
    );
};

export default SignUp;