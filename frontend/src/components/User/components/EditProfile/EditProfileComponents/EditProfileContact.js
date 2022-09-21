import React, {useEffect, useState} from 'react';
import axios from "axios";
import {setUser} from "../../../../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {setShowPopup} from "../../../../../redux/reducers/item";
import PopupComponent from "../../../../PopupComponent/PopupComponent";

const EditProfileContact = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const showPopup = useSelector(s => s.item.showPopup);
    const dispatch = useDispatch();
    const [selectedContact, setSelectedContact] = useState('');
    const [contact, setContact] = useState({});
    const [deleteContactConfirm, setDeleteContactConfirm] = useState(null);
    const [message, setMessage] = useState('');

    const selectContactFunc = (e) => {
        e.target.value === 'watsapp' ?
            setContact({
                name: 'whatsapp',
                user: id
            }) :
            e.target.value === 'another' ?
                setContact({
                    user: id
                }) :
                setContact({
                    name: e.target.value,
                    user: id
                });
        setEditSelect('contact');
    };

    const createContact = () => {
        if (JSON.stringify(contact) !== "{}") {
            setLoading('create_contact');

            axios.post('/api/users/contact_create/', contact)
                .then(response => {
                    setMessage("Успешно добавлено");
                    console.log('contact', response);
                    dispatch(setUser(id));
                    setLoading('');
                }).catch(() => {
                setMessage("Произошла ошибка. Проверьте соединение с интернентом")
            })

            dispatch(setShowPopup(true))
        }

    };
    const deleteContact = (idContact) => {
        setLoading(idContact);
        if (user.contact.length === 1) {
            setMessage("У вас должен быть хотя-бы один контакт");
            dispatch(setShowPopup(true));
            setLoading('');
            setDeleteContactConfirm(null)
        } else {
            axios.delete(`/api/users/contact/delete/${idContact}`)
                .then(response => {
                    console.log(response);
                    setMessage('Вы успешно удалили');
                    dispatch(setUser(id));
                    setLoading('');
                }).catch(() => {
                setMessage("Произошла ошибка. Проверьте соединение с интернентом")
            }).finally(() => {
                dispatch(setShowPopup(true))
            })
        }
    };
    useEffect(() => {
        dispatch(setUser(id))
    }, []);
    return (
        <>{
            showPopup ? <PopupComponent messageForUsers={message}/> : ''
        }
            <div className="col-lg-6 social-media">
                <h3 className="mb-20">Контакты</h3>
                <select name="" id="" defaultValue={'0'} onChange={selectContactFunc}>
                    <option value="0" disabled>Выберите способ связи</option>
                    <option value="tel">Телефон</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="telegram">Telegram</option>
                    <option value="facebook">Facebook</option>
                    <option value="another">Другое</option>
                </select>
                <div className="form-group space-y-10">
                    <div className="space-y-40">
                        {
                            contact.name === 'tel'
                                ? <div className="d-flex flex-column">
                                    <span className="nameInput mb-10">Телефон</span>
                                    <input type="tel" className="form-control"
                                           placeholder="Номер вашего телефона"
                                           onChange={e => {
                                               setContact({
                                                   name: 'tel',
                                                   user: id,
                                                   src: `${e.target.value}`
                                               })
                                           }}
                                    />

                                </div>
                                : contact.name === 'whatsapp'
                                ? <div className="d-flex flex-column">
                                    <span className="nameInput mb-10">WhatsApp</span>
                                    <input type="text" className="form-control"
                                           placeholder="Ваш WhatsApp номер с кодом страны"
                                           onChange={e => {
                                               setContact(
                                                   {
                                                       name: 'whatsapp',
                                                       user: id,
                                                       src: `https://wa.me/${e.target.value}`
                                                   }
                                               )
                                           }}
                                    />


                                </div>
                                : contact.name === 'instagram'
                                    ? <div className="d-flex flex-column">
                                        <span className="nameInput mb-10">Instagram</span>
                                        <input type="text" className="form-control"
                                               placeholder="Ссылка на ваш instagram"
                                               onChange={e => {
                                                   setContact(
                                                       {
                                                           name: 'instagram',
                                                           user: id,
                                                           src: `${e.target.value}`
                                                       }
                                                   )
                                               }}
                                        />

                                    </div>
                                    : contact.name === 'telegram'
                                        ? <div className="d-flex flex-column">
                                            <span className="nameInput mb-10">Telegram</span>
                                            <input type="text" className="form-control"
                                                   placeholder="Ссылка на ваш Telegram"
                                                   onChange={e => {
                                                       setContact(
                                                           {
                                                               name: 'telegram',
                                                               user: id,
                                                               src: `${e.target.value}`
                                                           }
                                                       )
                                                   }}
                                            />

                                        </div>
                                        : contact.name === 'facebook'
                                            ? <div className="d-flex flex-column">
                                                <span className="nameInput mb-10">Facebook</span>
                                                <input type="text" className="form-control"
                                                       placeholder="Ссылка на ваш  facebook"
                                                       onChange={e => {
                                                           setContact(
                                                               {
                                                                   name: 'facebook',
                                                                   user: id,
                                                                   src: `${e.target.value}`
                                                               }
                                                           )
                                                       }}
                                                />

                                            </div>
                                            : contact.name === 'another' ?
                                                <>
                                                    <div className="d-flex flex-column">
                                                        <span className="nameInput mb-10">Название</span>
                                                        <input type="text" className="form-control"
                                                               placeholder="Введите название"
                                                               onChange={e => {
                                                                   setContact(
                                                                       {
                                                                           name: e.target.value,
                                                                           user: id,
                                                                       }
                                                                   )
                                                               }}
                                                        />

                                                    </div>

                                                    <div className="d-flex flex-column">
                                                        <span className="nameInput mb-10">Ссылка</span>
                                                        <input type="text" className="form-control"
                                                               placeholder="Вставьте сюда ссылку"
                                                               onChange={e => {
                                                                   setContact(
                                                                       {
                                                                           ...contact,
                                                                           src: e.target.value,
                                                                       }
                                                                   )
                                                               }}
                                                        />

                                                    </div>
                                                </>
                                                : ''
                        }


                    </div>
                </div>

                <div>
                    {
                        loading === 'create_contact' ? <div className={'editPreloader'}>
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> : <button
                            onClick={() => {
                                createContact()
                            }}
                            className="btn btn-grad">Добавить контакт</button>
                    }
                </div>
                <h3>Ваши текущие контакты:</h3>
                <ul>
                    {
                        user ?
                            user.contact.map(item => {
                                return <li key={item.id} className={'editProfile-contact-li'}>
                                    {item.name} : {item.name === 'telegram'
                                    ? item.src.slice(13)
                                    : item.name === 'instagram'
                                        ? item.src.slice(26)
                                        : item.name === 'whatsapp'
                                            ? item.src.slice(14)
                                            : item.src.slice(0, 14)}

                                    {
                                        loading === item.id ? <div className={'editPreloader'}>
                                                <div className="lds-ellipsis">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div> :
                                            <>
                                                {
                                                    deleteContactConfirm === item.id ?
                                                        <>
                                                            <span>Вы уверены?</span>
                                                            <button
                                                                className={'editProfile-forms-button editProfile-contact-li-button'}
                                                                onClick={() => setDeleteContactConfirm(null)}
                                                            >Отмена
                                                            </button>
                                                            <button
                                                                className={'editProfile-forms-button editProfile-contact-li-button'}
                                                                onClick={() => {
                                                                    deleteContact(item.id);
                                                                }
                                                                }
                                                            >Удалить
                                                            </button>
                                                        </>
                                                        :
                                                        <button
                                                            onClick={() => {
                                                                setDeleteContactConfirm(item.id);
                                                            }}
                                                            className={'editProfile-forms-button editProfile-contact-li-button'}>Удалить
                                                        </button>
                                                }
                                            </>
                                    }


                                </li>
                            }) : ''
                    }
                </ul>
            </div>

        </>
    );
};

export default EditProfileContact;