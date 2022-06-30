import React, {useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

const EditProfilePassword = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const changePassword = (old_password, password, password2) => {
        if (old_password && password && password2 && password === password2){
            setLoading('changePassword');
            axios.put(`/api/users/change_password/${id}/`, {
                old_password,
                password,
                password2
            }).then(response => console.log(response))
        } else if (old_password && password && password2 && password !== password2){
            alert('Пароли не совпадают(новый)')
        }

    };

    const resetPassword = () => {
        axios.post('/api/users/request-reset-email/',
            {
                "email": user.email,
                "redirect_url": "https://kyzmat24.com/user/reset-password/reset"
            }
        )
            .then(response => console.log(response))
    };
    return (
        <>
            <div className="editProfile-forms-label">
                <p>Сменить пароль</p>
                <input
                    onChange={e => {
                        setOldPassword(e.target.value);
                        if (oldPassword && password && password2) setEditSelect('changePassword')
                    }}
                    type="text" placeholder={'Введите старый пароль'}/>
                <input
                    onChange={e => {
                        setPassword(e.target.value);
                        if (oldPassword && password && password2) setEditSelect('changePassword')
                    }}
                    type="text" placeholder={'Введите новый пароль'}/>
                <input
                    onChange={e =>{
                        setPassword2(e.target.value);
                        if (oldPassword && password && password2) setEditSelect('changePassword')
                    }}
                    type="text" placeholder={'Подтвердите пароль'}/>
                <button
                    className={editSelect === "changePassword" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                onClick={()=> changePassword(oldPassword, password, password2)}
                >
                    сохранить
                </button>
            </div>
            <p>Настройки пароли</p>
            <button onClick={() => resetPassword()}>Сбросить пароль</button>
        </>
    );
};

export default EditProfilePassword;