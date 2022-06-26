import React, {useState} from 'react';
import axios from "axios";
import {setUser} from "../../../../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";

const EditProfileContact = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const dispatch = useDispatch();

    const [contact, setContact] = useState({});
    const [deleteContactConfirm, setDeleteContactConfirm] = useState(null);

    const createContact = () => {
        if (JSON.stringify(contact) !== "{}" && contact.src) {
            setLoading('create_contact');
            axios.post('/api/users/contact_create/', contact)
                .then(response => {
                    alert('Вы успешно сохранили');
                    console.log('contact', response);
                    dispatch(setUser());
                    setLoading('');
                })
        } else {
            alert('Заполните форму полностью')
        }

    };
    const deleteContact = (idContact) => {
        setLoading(idContact);
        axios.delete(`/api/users/contact/delete/${idContact}`)
            .then(response => {
                console.log(response);
                alert('Вы успешно удалили');
                dispatch(setUser());
                setLoading('');
            })
    };
    return (
        <>
            <div className={'editProfile-forms-label'}>
                <p>контакты:</p>
                <select onChange={e => {
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
                }}>
                    <option value="0" selected disabled>Выберите способ связи</option>
                    <option value="tel">Телефон</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="telegram">Telegram</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="another">Другое</option>
                </select>
                {
                    contact.name === 'tel' ?
                        <input type="tel" placeholder={'Введите номер'} onChange={e => setContact({
                            ...contact,
                            src: e.target.value
                        })}/> :
                        contact.name === 'whatsapp' ?
                            <>
                                <span>Обязательно пишите с кодом страны</span>
                                <input type="tel" placeholder={'Введите номер'} onChange={e => setContact({
                                    ...contact,
                                    src: `https://wa.me/${e.target.value}`
                                })}/></> :
                            contact.name === 'instagram' || contact.name === 'telegram' || contact.name === 'twitter' || contact.name === 'facebook' ?
                                <input type="text" placeholder={'Вставьте ссылку'}
                                       onChange={e => setContact({
                                           ...contact,
                                           src: e.target.value
                                       })}/>
                                :
                                <>
                                    <input type="text" placeholder={'Введите свой вариант'}
                                           onChange={e => setContact({
                                               ...contact,
                                               name: e.target.value
                                           })}/>
                                    <input type="text" placeholder={'Вставьте ссылку'}
                                           onChange={e => setContact({
                                               ...contact,
                                               src: e.target.value
                                           })}/>
                                </>
                }
                {
                    loading === 'create_contact' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : <button
                        className={editSelect === "contact" ?
                            'editProfile-forms-button editProfile-forms-button-contact editProfile-forms-button-selected'
                            : 'editProfile-forms-button editProfile-forms-button-contact'}
                        onClick={() => {
                            createContact();
                        }
                        }>сохранить
                    </button>
                }
            </div>
            <div>
                <p>Ваши контакты:</p>
                <ul className={'editProfile-contact-ul'}>
                    {
                        user ?
                        user.contact.map(item => {
                            return <li className={'editProfile-contact-li'}>
                                {item.name} : {item.name === 'telegram'
                                ? item.src.slice(13)
                                : item.name === 'instagram'
                                    ? item.src.slice(26)
                                    : item.name === 'whatsapp'
                                        ? item.src.slice(14)
                                        : item.src}

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