import React, {useEffect, useState} from 'react';
import './login.css';
import axios from "axios";
import {setAuthTokens, setUser, setId} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";


const Login = ({setStatus}) => {
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
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
             localStorage.setItem('id', `${jwt_decode(data.access).user_id}`)
        }).catch((error) => {
            setUserStatus(false);
            setLoading(false);
            console.log(error)
        })
    };

    useEffect(()=>{
        console.log("Hello");
        if (localStorage.getItem('user')){

        } else {
            console.log("World!");
            axios(`/api/users/${id}`).then(({data})=>{
                console.log(data);
                dispatch(setUser(data));
                localStorage.setItem('user', JSON.stringify(data))
            });
        }

    },[id]);

    return (
        <div className={'login'}>
            <form onSubmit={(e)=>{
                loginUser(e);
              //  getUser();
            }}>
                <h3>Вход в аккаунт</h3>
                {
                    userStatus === false ? <h4 className={'error'}>Неверный пароль или логин</h4> : ''
                }

                <input required={true} type="text" name="username" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Введите логин"/>
                <input required={true} type="password" name="password" onChange={e => setPassword(e.target.value)}
                       placeholder="Введите пароль"/>
                {
                    loading === true ? <div className="lds-ring">
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                    </div> : <>
                        <button className={'login-btn'} type="submit">Войти</button>
                        <p>Нет аккаунта? Пройди <button className={'login-btn-link'}
                                                        onClick={() => setStatus('signUp')}>регистрацию</button></p>
                    </>
                }


            </form>

        </div>
    );
};

export default Login;