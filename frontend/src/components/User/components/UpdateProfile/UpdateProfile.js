import React, {useState} from 'react';
import "./updateProfile.css";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {setUser} from "../../../../redux/reducers/user";

const UpdateProfile = ({setShowUpdateProfile}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [profileImage, setProfileImage] = useState(user.profile_image);
    const [description, setDescription] = useState(user.description);
    const [contact, setContact] = useState(user.contact);

    const createContact = () =>{
            axios.post('/api/users/contact_create/', contact)
                .then(response => console.log('contact',response))
    };
    const updateProfileFunc = () => {
   if (firstName && profileImage && description.trim() !== 'Пользователь не добавил описание' && description && contact){
       const data = new FormData();
       data.append('username', `${user.username}`);
       data.append('first_name', firstName);
       data.append('last_name', lastName);
       if (!user.profile_image){
           data.append('profile_image', profileImage, profileImage.name);
       }
       data.append('description', description);
       data.append('status_user', 'Usually');
       createContact();
       axios.put(`https://kyzmat24.com/api/users/update/${id}`, data)
           .then(response => {
               console.log(response);
              dispatch(setUser(id));
              setShowUpdateProfile(false)
           }).catch(error => console.log(error.response))
   } else {
       alert('Заполните все обязательные поля!')
   }
    };
    return (
        <div className={'updateProfile'}>
            <div className="updateProfile-form">
                <label>
                    <p>Введите имя или название оранизации если вы являетесь организацией(обязательно){
                        firstName ? <span className={'check check-green'}><FontAwesomeIcon icon={faCircleCheck}/></span>
                            : <span className={'check check-red'}><FontAwesomeIcon icon={faCircleXmark}/></span>
                    }</p>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>

                </label>
                <label>
                    <p>Введите фамилию или полное название компании(не обязательно) {
                        lastName ? <span className={'check check-green'}><FontAwesomeIcon icon={faCircleCheck}/></span>
                            : <span className={'check check-red'}><FontAwesomeIcon icon={faCircleXmark}/></span>
                    }</p>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>

                </label>
                <label>
                    <p>Добавьте описание о вашей деятельности(обязательно) {
                        description.trim() === 'Пользователь не добавил описание' || !description ?
                            <span className={'check check-red'}><FontAwesomeIcon icon={faCircleXmark}/></span> :
                            <span className={'check check-green'}><FontAwesomeIcon icon={faCircleCheck}/></span>
                    }</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}>

                    </textarea>

                </label>
                <label>
                    <p>Добавьте фото профиля(обязательно) {
                        profileImage ?
                            <span className={'check check-green'}><FontAwesomeIcon icon={faCircleCheck}/></span>
                            : <span className={'check check-red'}><FontAwesomeIcon icon={faCircleXmark}/></span>
                    }</p>
                    <input type="file" onChange={e => setProfileImage(e.target.files[0])}/>

                </label>
                <label>
                    <p>Добавьте свои контакты(обязательно) {
                        contact.length === 0 ?
                            <span className={'check check-red'}><FontAwesomeIcon icon={faCircleXmark}/></span>
                            : <span className={'check check-green'}><FontAwesomeIcon icon={faCircleCheck}/></span>
                    }</p>
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
                                })
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
                                    <input type="text" placeholder={'Вставьте ссылку'} onChange={e => setContact({
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
                                        <input type="text" placeholder={'Вставьте ссылку'} onChange={e => setContact({
                                            ...contact,
                                            src: e.target.value
                                        })}/>
                                    </>
                    }
                </label>
                <button onClick={()=> updateProfileFunc()}>Сделать публичным!</button>
                <button onClick={() => setShowUpdateProfile(false)}>Закрыть</button>
            </div>

        </div>
    );
};

export default UpdateProfile;