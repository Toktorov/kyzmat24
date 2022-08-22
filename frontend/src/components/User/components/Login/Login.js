import React, {useState} from 'react';
import './login.css';

const Login = ({setStatus, loginUser}) => {
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={'form_section'}>
            <form className={'box_block kyzmat_form'} onSubmit={(e)=>{
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
                        <div className="lds-ring">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div>: <>
                        <button className={'login-btn'} type="submit">Войти</button>
                        <div className="register_link">
                        <p>Нет аккаунта? Пройди </p><button id={'register_link2'} className={'box_block'}
                                                        onClick={() => setStatus('signUp')}>регистрацию</button>

                    </div>
                        </>
                }


            </form>

        </div>
    );
};

export default Login;