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
            <div className="col-lg-6 social-media">
                <h3 className="mb-20">Настройки пароли</h3>
                <div className="form-group space-y-10">
                    <div className="space-y-40">
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Сменить пароль</span>
                            <input type="text" className="form-control"
                                   onChange={e =>{
                                       setOldPassword(e.target.value)
                                   }}
                                   placeholder="Введите старый пароль"/>
                        </div>
                        <div className="d-flex flex-column">
                            <input type="text" className="form-control"
                                   onChange={e =>{
                                       setPassword(e.target.value)
                                   }}
                                   placeholder="Введите новый пароль"/>
                        </div>
                        <div className="d-flex flex-column">
                            <input type="text" className="form-control"
                                   onChange={e =>{
                                       setPassword2(e.target.value)
                                   }}
                                   placeholder="Подтвердите новый пароль"/>

                        </div>
                    </div>
                </div>
                <div>
                    {
                        loading === 'resetPassword' || loading === 'changePassword'?  <div className={'editPreloader'}>
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> : <>
                            <button
                                onClick={()=>{
                                    changePassword(oldPassword, password, password2)
                                }}
                                className="btn btn-grad">Сменить пароль</button>
                            <br/>
                            <br/>
                            <div className="hr"> </div>
                            <br/>
                            <button className="btn btn-grad" onClick={() => resetPassword()}>Сбросить пароль</button>
                        </>
                    }
                    </div>

            </div>

        </>
    );
};

export default EditProfilePassword;