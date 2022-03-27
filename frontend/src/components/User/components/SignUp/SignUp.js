import React, {useState} from 'react';
import axios from "axios";

const SignUp = ({setStatus}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) =>{
        e.preventDefault();
        axios.post('http://kyzmat24.com/api/users/', {
            headers: {
                'Content-Type': 'application/json'
            },
            username,
            password

        }).then(() => {
            alert('Регистрация пройдена')
        }).catch(()=>{
            alert('Не прошли(')
        })

    };
    return (
        <div className={'login'}>
            <form onSubmit={signUp}>
                <input required={true} type="text"  onChange={(e) => setUsername(e.target.value)} placeholder="Введите логин" />
                <input required={true} type="password"  onChange={e => setPassword(e.target.value)} placeholder="Введите пароль" />
                <button type="submit">Зарегистрироваться</button>
                <p>Есть аккаунт? <button onClick={()=> setStatus('login')}>Войти</button></p>
            </form>
        </div>
    );
};

export default SignUp;