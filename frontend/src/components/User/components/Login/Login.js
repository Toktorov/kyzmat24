import React, {useState} from 'react';
import './login.css';

const Login = ({setStatus, loginUser}) => {
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
        <div className="edit_profile register login">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7"> </div>
                    <div className="col-lg-5">
                        <div className="right_part space-y-20">
                            <h1 className="color_white"> Welcome to Kyzmat24 </h1>
                            <p className="color_white"
                            >Еще не создали аккаунт? <button onClick={() => setStatus('signUp')}> Зарегестрируйтесь </button>
                            </p>
                            <form
                            onSubmit={(e)=>{
                                loginUser(e, username, password, setLoading, setUserStatus);
                            }}>
                                <div className="box edit_box w-full space-y-20">
                                    <div className="space-y-10">
                                        <span className="nameInput">Логин </span>
                                        <div className="confirm">
                                            <input
                                                required={true}
                                                type="text"
                                                className="form-control"
                                                placeholder="Введите логин"
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-10">
                                        <span className="nameInput">Пароль</span>
                                        <div className="confirm">
                                            <input
                                                required={true}
                                                type="password"
                                                className="form-control"
                                                placeholder="Введите пароль"
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {
                                                loading === true ? <div className={'login-preloader'}>
                                                <div className="lds-ring">
                                                    <div> </div>
                                                    <div> </div>
                                                    <div> </div>
                                                    <div> </div>
                                                </div>
                                           </div> : <button className="btn btn-grad w-full btn-lg "> Войти</button>
                                    }

                                    {
                                        userStatus === false ? <h4 className={'error'}>Неверный пароль или логин</h4> : ''
                                    }
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

        </>
    );
};

export default Login;