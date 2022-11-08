import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../../../../../redux/reducers/user";
import {setShowPopup} from "../../../../../redux/reducers/item";
import PopupComponent from "../../../../PopupComponent/PopupComponent";

const EditProfileEdit = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const showPopup = useSelector(s => s.item.showPopup);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [first_name, setFirst_name] = useState(user ? user.first_name : '');
    const [last_name, setLast_name] = useState(user ? user.last_name : '');
    const [description, setDescription] = useState(user ? user.description : '');
    const [profile_image, setProfile_image] = useState(null);

    const updateUser = () => {
        setLoading(true);
        const data = new FormData();

        if (profile_image) {
            data.append('profile_image', profile_image, profile_image.name);
            data.append('username', user.username);
            data.append('first_name', first_name);
            data.append('last_name', last_name);
            data.append('description', description);
        } else {
            data.append('username', user.username);
            data.append('first_name', first_name);
            data.append('last_name', last_name);
            data.append('description', description);
        }


        axios.put(`/api/users/update/${id}`, data).then(response => {
            console.log(response);
            setMessage('Изменения сохранены');
            dispatch(setUser(id));
            setLoading('');
            setEditSelect('')
        }).catch(error => {
            setMessage('Произошла ошибка. Проверьте соединение с интернетом');
            setLoading(false);
            setEditSelect('');
            console.log(error.response)
        }).finally(() => {
            dispatch(setShowPopup(true))
        })

    };

    useEffect(() => {
        setFirst_name(user ? user.first_name : '');
        setLast_name(user ? user.last_name : '');
        setDescription(user ? user.description : '');
        setProfile_image(null);
    }, [user]);
    useEffect(() => {
        dispatch(setUser(id));
    }, [dispatch, id]);


    return (
        <>
            {
                showPopup ? <PopupComponent messageForUsers={message}/> : ''
            }

            <div className="col-lg-6 social-media">
                <h3 className="mb-20">Редактировать</h3>
                <div className="form-group space-y-10">
                    <div className="space-y-40">
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Как вас зовут или название организации(компании)</span>
                            <input type="text" className="form-control"
                                   value={first_name}
                            onChange={(e)=>{
                                      setFirst_name(e.target.value);
                                      setEditSelect(true)
                            }}
                            />


                        </div>
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Фамилия или полное название организации(компании)</span>
                            <input type="text" className="form-control"
                                   value={last_name}
                            onChange={(e)=>{
                                setLast_name(e.target.value);
                                setEditSelect(true)
                            }}
                            />

                        </div>
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Описание</span>
                            <input type="text" className="form-control"
                                   value={description}
                            onChange={(e)=>{
                                setDescription(e.target.value);
                                setEditSelect(true)
                            }}
                            />

                        </div>
                    </div>
                </div>
                <div>
                    {
                            loading === true ? <div className={'editPreloader'}>
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> :
                                <button
                                    onClick={()=>{
                                        if (editSelect){
                                            updateUser()
                                        }
                                    }}
                                    className="btn btn-grad">Сохранить</button>

                    }

                    </div>
            </div>
            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p className={'editProfile-label-profilePhoto-text'}>Изменить/добавить фото профиля:</p>*/}
            {/*    <label className={'editProfile-label-profilePhoto'}>*/}
            {/*        {*/}
            {/*            profileImageText()*/}
            {/*        }*/}
            {/*        <input className={'editProfile-input-profilePhoto'}*/}
            {/*               onChange={(e) => {*/}
            {/*                   setProfile_image(e.target.files[0]);*/}
            {/*                   setEditSelect(true)*/}
            {/*               }} accept='image/*'*/}
            {/*               type="file"/>*/}
            {/*    </label>*/}
            {/*</div>*/}



            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>Как вас зовут или название организации(компании):</p>*/}
            {/*    <input type="text" value={first_name} onChange={e => {*/}
            {/*        setFirst_name(e.target.value);*/}
            {/*        setEditSelect(true)*/}
            {/*    }}/>*/}


            {/*</div>*/}

            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>Фамилия или полное название организации(компании):</p>*/}
            {/*    <input*/}
            {/*        type="text" value={last_name} onChange={e => {*/}
            {/*        setLast_name(e.target.value);*/}
            {/*        setEditSelect(true)*/}
            {/*    }}/>*/}

            {/*</div>*/}

            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>описание:</p>*/}
            {/*    <textarea value={description} onChange={e => {*/}
            {/*        setDescription(e.target.value);*/}
            {/*        setEditSelect(true)*/}
            {/*    }}>*/}

            {/*            </textarea>*/}
            {/*</div>*/}

            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>другое:</p>*/}
            {/*    <input type="text" value={another != null ? another: ''} onChange={e => {*/}
            {/*        setAnother(e.target.value);*/}
            {/*        setEditSelect(true)*/}
            {/*    }}/>*/}
            {/*</div>*/}
            {/*{*/}
            {/*    loading ? <div className={'editPreloader'}>*/}
            {/*        <div className="lds-ellipsis">*/}
            {/*            <div></div>*/}
            {/*            <div></div>*/}
            {/*            <div></div>*/}
            {/*            <div></div>*/}
            {/*        </div>*/}
            {/*    </div> : <button*/}
            {/*        className={editSelect*/}
            {/*            ? 'editProfile-forms-button editProfile-forms-button-descr editProfile-forms-button-selected'*/}
            {/*            : 'editProfile-forms-button editProfile-forms-button-descr'}*/}
            {/*        type={'button'} onClick={() => {*/}
            {/*        if (editSelect){*/}
            {/*            updateUser()*/}
            {/*        }*/}
            {/*        }*/}
            {/*    }>сохранить*/}
            {/*    </button>*/}
            {/*}*/}
        </>
    );
};

export default EditProfileEdit;