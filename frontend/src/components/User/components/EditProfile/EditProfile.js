import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import "./editProfile.css";
import EditProfileEdit from "./EditProfileComponents/EditProfileEdit";
import EditProfileContact from "./EditProfileComponents/EditProfileContact";
import EditProfilePassword from "./EditProfileComponents/EditProfilePassword";
import EditProfileAccount from "./EditProfileComponents/EditProfileAccount";
import {setHiddenFooter} from "../../../../redux/reducers/app";

const EditProfile = () => {
    const user = useSelector(s => s.user.user);
    const dispatch = useDispatch();
    const [editSection, setEditSection] = useState(localStorage.getItem('editSection') ? localStorage.getItem('editSection') : 'profile');
    const [editSelect, setEditSelect] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(()=>{
        dispatch(setHiddenFooter(false))
    });
    return (
        <section className={'editProfile'}>
            <div className="container">
                <div className="editProfile-row">
                    <div className="editProfile-select-btns">
                        <button className={
                            editSection === 'profile' ?
                                'editProfile-select-btns-button editProfile-select-btns-button-active' :
                                'editProfile-select-btns-button'
                        }
                                onClick={() => {
                                    setEditSection('profile');
                                    localStorage.setItem('editSection', 'profile')
                                }}
                        >Редактировать профиль
                        </button>
                        <button className={
                            editSection === 'contact' ?
                                'editProfile-select-btns-button editProfile-select-btns-button-active' :
                                'editProfile-select-btns-button'
                        }
                                onClick={() => {
                                    setEditSection('contact');
                                    localStorage.setItem('editSection', 'contact')
                                }}
                        >Контакты
                        </button>
                        <button className={
                            editSection === 'account' ?
                                'editProfile-select-btns-button editProfile-select-btns-button-active' :
                                'editProfile-select-btns-button'
                        }
                                onClick={() => {
                                    setEditSection('account');
                                    localStorage.setItem('editSection', 'account')
                                }}
                        >Настройки аккаунта
                        </button>
                        <button className={
                            editSection === 'password' ?
                                'editProfile-select-btns-button editProfile-select-btns-button-active' :
                                'editProfile-select-btns-button'
                        }
                                onClick={() => {
                                    setEditSection('password');
                                    localStorage.setItem('editSection', 'password')
                                }}
                        >Изменить/сбросить пароль
                        </button>
                    </div>
                    <div className="editProfile-forms">
                        {
                            editSection === 'profile' ?
                                <EditProfileEdit loading={loading} setLoading={setLoading} editSelect={editSelect} setEditSelect={setEditSelect}/> :
                                editSection === 'contact' ?
                                    <EditProfileContact loading={loading} setLoading={setLoading} editSelect={editSelect} setEditSelect={setEditSelect}/> :
                                    editSection === 'password' ?
                                        <EditProfilePassword loading={loading} setLoading={setLoading} editSelect={editSelect} setEditSelect={setEditSelect}/> :
                                        editSection === 'account' ?
                                            <EditProfileAccount loading={loading} setLoading={setLoading} editSelect={editSelect}
                                                                setEditSelect={setEditSelect}/> :
                                            <p>Другие настройки</p>
                        }

                    </div>
                </div>

            </div>
        </section>
    );
};

export default EditProfile;