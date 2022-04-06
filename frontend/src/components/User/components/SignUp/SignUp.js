import React, {useState} from 'react';
import axios from "axios";
import {setAuthTokens, setUser, setNewUser} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";

const SignUp = ({setStatus}) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userStatus, setUserStatus] = useState(null);
    const dispatch = useDispatch();

    const signUp = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/users/', {
            headers: {
                'Content-Type': 'application/json'
            },
            username,
            password

        }).then(() => {
            setLoading(true);
            e.preventDefault();
            axios.post('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/token/', {
                headers: {
                    'Content-Type': 'application/json'
                },

                username,
                password


            }).then(({data}) => {
                setLoading(false);
                dispatch(setAuthTokens(data));
                dispatch(setUser(jwt_decode(data.access)));
                localStorage.setItem('authTokens', JSON.stringify(data));
                dispatch( setNewUser(true));
            }).catch(() => {
                setLoading(false)
            });

        }).catch(() => {
            setUserStatus(false);
            setLoading(false)
        });

    };
    return (
        <div className={'login'}>
            <form onSubmit={signUp}>
                <h3>Регистрация</h3>
                {
                    userStatus === false && loading === false ? <h4 className={'error'}>Пользователь с таким именем уже есть. Выберите другое имя и попрбуйте снова</h4> : ''
                }
                <input required={true} type="text" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Введите логин"/>
                <input required={true} type="password" onChange={e => setPassword(e.target.value)}
                       placeholder="Введите пароль"/>
                {
                    loading === true ? <div className="lds-ring">
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
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