import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setShowPopup} from "../../../../../redux/reducers/item";
import PopupComponent from "../../../../PopupComponent/PopupComponent";
import {setUser} from "../../../../../redux/reducers/user";

const EditProfilePassword = ({editSelect, setEditSelect, loading, setLoading}) => {
    const dispatch = useDispatch();
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const authTokens = useSelector(s => s.user.authTokens);
    const showPopup = useSelector(s => s.item.showPopup);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

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
                setMessage('Вы успешно поменяли пароль');
            }).catch((error) => {
                console.log(error.response);
                setMessage('Вы ввели неверный текущий пароль');
            }).finally(()=>{
                setLoading('');
                dispatch(setShowPopup(true))
            })
        } else if (old_password && password && password2 && password !== password2) {
            setMessage('Пароли не совпадают(новый)');
            setLoading('');
            dispatch(setShowPopup(true))
        }

    };

    const resetPassword = () => {
        if (user.email) {
            setLoading('resetPassword');
            axios.post('/api/users/request-reset-email/',
                {
                    "email": user.email,
                    "redirect_url": "https://kyzmat24.com/user/reset-password/reset"
                }
            )
                .then(response => {
                    console.log(response);
                    setMessage(`Было оптравлено сообщение на адрес ${user.email}. Пожалуйста проверьте почту и следуйте инструкции в сообщении`);
                }).catch(() => {
                setMessage('Произошла ошибка(');
            }).finally(()=>{
                setLoading('');
                dispatch(setShowPopup(true))
            })
        } else {
            setMessage('Для сброса пароли сначала укажите свой email');
            setLoading('');
            dispatch(setShowPopup(true))
        }

    };

    useEffect(()=>{
        dispatch(setUser(id))
    });
    return (
        <>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }
            <p>Настройки пароли</p>
                <form>

                    <label className="editProfile-forms-label">
                        <p>Сменить пароль:</p>
                        <input
                            onChange={e => {
                                setOldPassword(e.target.value);
                                if (oldPassword && password && password2) setEditSelect('changePassword')
                            }}
                            type="text" placeholder={'Введите старый пароль'}/>
                    </label>
                    <label className="editProfile-forms-label">
                        <input
                            onChange={e => {
                                setPassword(e.target.value);
                                if (oldPassword && password && password2) setEditSelect('changePassword')
                            }}
                            type="text" placeholder={'Введите новый пароль'}/>
                    </label>
                    <label className="editProfile-forms-label">
                        <input
                            onChange={e => {
                                setPassword2(e.target.value);
                                if (oldPassword && password && password2) setEditSelect('changePassword')
                            }}
                            type="text" placeholder={'Подтвердите пароль'}/>
                    </label>
                    {
                        loading === 'changePassword' ?  <div className={'editPreloader'}>
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> :  <button
                            type={'button'}
                            className={editSelect === "changePassword" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                            onClick={() => changePassword(oldPassword, password, password2)}
                        >
                            сохранить
                        </button>
                    }
                </form>

<p>Забыли пароль ?</p>
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