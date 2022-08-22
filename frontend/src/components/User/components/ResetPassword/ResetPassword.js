import React, {useEffect, useState} from 'react';
import axios from "axios";
import './resetPassword.css';
import {useDispatch, useSelector} from "react-redux";
import {setShowPopup} from "../../../../redux/reducers/item";
import PopupComponent from "../../../PopupComponent/PopupComponent";
import {setHiddenFooter} from "../../../../redux/reducers/app";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const showPopup = useSelector(s => s.item.showPopup);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const token = window.location.href.slice(window.location.href.indexOf('token=') + 6 );
    const start = window.location.href.indexOf('uidb64=') + 7;
    const end = window.location.href.indexOf("&", start);
    const uidb64 = window.location.href.slice(start, end );
    const resetFunc = () =>{
        if (newPassword === newPassword2){
            setLoading(true);
            axios.patch(`/api/users/password-reset-complete`,{
                "password": newPassword,
                token,
                uidb64
            }).then(response =>{
                console.log(response);
                setMessage('Вы успешно поменяли пароль')
            }).catch((error)=>{
                console.log(error.response);
                setMessage('Произошла ошибка(')
            }).finally(()=>{
                setLoading(false);
                dispatch(setShowPopup(true))
            })
        } else {
            setMessage('Пароли не совпадают');
            dispatch(setShowPopup(true))
        }

    };
    useEffect(()=>{
        dispatch(setHiddenFooter(false))
    });
    return (
        <div className={'form_section'}>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }
            <form className={'kyzmat_form'}>
                <input required type="password" placeholder={'Введите новый пароль'} onChange={e => setNewPassword(e.target.value)}/>
                <input required type="password" placeholder={'Подтвердите новый пароль'} onChange={e => setNewPassword2(e.target.value)}/>
                {
                    loading ?  <div className="lds-ring">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                        :<button type={'button'} onClick={()=>{
                            if (newPassword && newPassword2){
                                resetFunc();
                            }
                        }}>Save</button>
                }
            </form>
        </div>
    );
};

export default ResetPassword;