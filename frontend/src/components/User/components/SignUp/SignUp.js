import React, { useState} from 'react';
import axios from "axios";

const SignUp = ({setStatus, loginUser}) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userStatus, setUserStatus] = useState(null);

   const signUp = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('/api/users/register/', {
            headers: {
                'Content-Type': 'application/json'
            },
            customer_or_employee: "Работник",
            username,
            password,
            password2,
        }).then((response) => {
            setLoading(true);
            loginUser(e, username, password, setLoading, setUserStatus);
        }).catch((error) => {
            setUserStatus(false);
            setLoading(false);
            if (error.response.data.password){
                console.log(error.response.data?.password[0]);
            } else if(error.response.data.username){
                console.log(error.response.data?.username[0])
            }
        });
    };


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
                                >Есть аккаунт? <button onClick={() => setStatus('login')}> Войти </button>
                                </p>
                                <form
                                    onSubmit={(e)=>{
                                        signUp(e)
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
                                        <div className="space-y-10">
                                            <span className="nameInput">Подтверждение пароля</span>
                                            <div className="confirm">
                                                <input
                                                    required={true}
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Подтвердите пароль"
                                                    onChange={e => setPassword2(e.target.value)}
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
                                            </div> : <button className="btn btn-grad w-full btn-lg "
                                            type={"submit"}
                                            > Зарегистрироваться</button>
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
            {/*<form className={'kyzmat_form box_block'} onSubmit={(e)=> signUp(e)}>*/}
            {/*    <h3>Регистрация</h3>*/}
            {/*    {*/}
            {/*        userStatus === false && loading === false ?*/}
            {/*            <h4 className={'error'}>{errorMessage}</h4> : ''*/}
            {/*    }*/}
            {/*    <input required={true} type="text" onChange={(e) => setUsername(e.target.value)}*/}
            {/*           placeholder="Введите логин"/>*/}
            {/*    <input required={true} type="password" onChange={e => setPassword(e.target.value)}*/}
            {/*           placeholder="Введите пароль"/>*/}
            {/*    <input required={true} type="password" onChange={e => setPassword2(e.target.value)}*/}
            {/*           placeholder="Подтвердите пароль"/>*/}
            {/*    {*/}
            {/*        loading === true ? <div className={'login-preloader'}>*/}
            {/*            <div className="lds-ring">*/}
            {/*                <div> </div>*/}
            {/*                <div> </div>*/}
            {/*                <div> </div>*/}
            {/*                <div> </div>*/}
            {/*            </div>*/}
            {/*        </div>: <>*/}
            {/*            <button className={'login-btn'} type="submit">Зарегистрироваться</button>*/}
            {/*            <div className="register_link">*/}
            {/*            <p>Есть аккаунт?  </p><button id={'register_link2'} className={'login-btn-link box_block'}*/}
            {/*                                     onClick={() => setStatus('login')}>Войти</button></div>*/}
            {/*        </>*/}
            {/*    }*/}

            {/*</form>*/}
        </>
    );
};

export default SignUp;