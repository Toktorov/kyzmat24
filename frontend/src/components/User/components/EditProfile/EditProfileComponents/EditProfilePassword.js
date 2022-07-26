import React, {useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

const EditProfilePassword = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const authTokens = useSelector(s => s.user.authTokens);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const changePassword = (old_password, password, password2) => {
        if (old_password && password && password2 && password === password2) {
            setLoading('changePassword');
            axios.put(`/api/users/change_password/${id}/`, {
                old_password,
                password,
                password2
            }, {
                headers:{
                    Authorization: `Bearer ${authTokens.access}`
                }
            }).then(response => {
                console.log(response);
                alert('Вы успешно поменяли пароль');
                setLoading('');
            }).catch(() => {
                alert('Произошла ошибка(');
                setLoading('');
            })
        } else if (old_password && password && password2 && password !== password2) {
            alert('Пароли не совпадают(новый)');
            setLoading('');
        }

    };

    const resetPassword = () => {
        if (user.email) {
            setLoading('resetPassword');
            axios.post('/api/users/request-reset-email/',
                {
                    "email": user.email,
                    "redirect_url": "https://kyzmat24.com/user/reset-password/reset"
                },
                {
                    headers:{
                        Authorization: `Bearer ${authTokens.access}`
                    }
                }
            )
                .then(response => {
                    console.log(response);
                    alert(`Было оптравлено сообщение на адрес ${user.email}. Пожалуйста проверьте почту и следуйте инструкции в сообщении`);
                    setLoading('');
                }).catch(() => {
                alert('Произошла ошибка(');
                setLoading('');
            })
        } else {
            alert('Для сброса пароли сначала укажите свой email');
            setLoading('');
        }

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
                    onChange={e => {
                        setPassword2(e.target.value);
                        if (oldPassword && password && password2) setEditSelect('changePassword')
                    }}
                    type="text" placeholder={'Подтвердите пароль'}/>
                {
                    loading === 'changePassword' ?  <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> :  <button
                        className={editSelect === "changePassword" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                        onClick={() => changePassword(oldPassword, password, password2)}
                    >
                        сохранить
                    </button>
                }

            </div>
            <p>Настройки пароли</p>
            {
                loading === 'resetPassword' ?  <div className={'editPreloader'}>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div> :
                    <button className={'editProfile-forms-button'} onClick={() => resetPassword()}>Сбросить пароль</button>

            }
        </>
    );
};

export default EditProfilePassword;