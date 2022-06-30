import React, {useState} from 'react';
import './login.css';

const Login = ({setStatus, loginUser}) => {
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={'login'}>
            <form onSubmit={(e)=>{
                loginUser(e, username, password, setLoading, setUserStatus);
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
                    loading === true ? <div className={'login-preloader'}>
                        <div className="lds-ring lds-ring-white">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div>: <>
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