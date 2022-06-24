import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../../../../../redux/reducers/user";

const EditProfileEdit = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [description, setDescription] = useState(user.description);
    const [location, setLocation] = useState(user.location);
    const [another, setAnother] = useState(user.another);
    const [profileImage, setProfileImage] = useState(null);

const profileImageText = () =>{
    if (profileImage){
        return profileImage.name.length > 10 ? profileImage.name.slice(0, 10) + '...' : profileImage.name
    } else {
        return 'Выбрать фото'
    }
};

    const updateUser = (key, value) => {
        if (key === editSelect) {
            setLoading(key);
            axios.put(`https://kyzmat24.com/api/users/update/${id}`, {
                username: user.username,
                [key]: value,
            }).then(response => {
                console.log(response);
                alert('Вы успешно поменяли');
                axios(`/api/users/${id}`).then(({data}) => {
                    dispatch(setUser(data));
                    localStorage.setItem('user', JSON.stringify(data));
                    setLoading('')
                })
            }).catch(error => console.log(error.response))
        }
    };
    const updateProfileImage = () => {
        if (profileImage) {
            setLoading('profile_image');
            const data = new FormData;
            data.append('profile_image', profileImage, profileImage.name);
            data.append('username', user.username);
            axios.put(`https://kyzmat24.com/api/users/update/${id}`, data).then(response => {
                console.log(response);
                axios(`/api/users/${id}`).then(({data}) => {
                    dispatch(setUser(data));
                    localStorage.setItem('user', JSON.stringify(data));
                    setLoading('')
                })
            }).catch(error => console.log(error.response))
        } else {
            alert('Выберите фото')
        }
    };

    return (
        <>
            <div className={'editProfile-forms-label'}>
                <p className={'editProfile-label-profilePhoto-text'}>Изменить/добавить фото профиля:</p>
                <label className={'editProfile-label-profilePhoto'}>
                    {
                        profileImageText()
                    }
                    <input className={'editProfile-input-profilePhoto'}
                           onChange={(e) => {
                               setProfileImage(e.target.files[0]);
                               setEditSelect('profile_image')
                           }} accept='image/*'
                           type="file"/>
                </label>
                {
                    loading === 'profile_image' ? <div className={'editPreloader'}>
                            <div className="lds-ellipsis">
                                <div> </div>
                                <div> </div>
                                <div> </div>
                                <div> </div>
                            </div>
                        </div> :
                        <button
                            className={editSelect === "profile_image" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                            onClick={() => updateProfileImage()}>сохранить
                        </button>
                }
            </div>
            <div className={'editProfile-forms-label'}>
                <p>Как вас зовут или название организации(компании):</p>
                <input type="text" value={firstName} onChange={e => {
                    setFirstName(e.target.value);
                    setEditSelect('first_name')
                }}/>
                {
                    loading === 'first_name' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div> :<button
                        className={editSelect === "first_name" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                        type={'button'} onClick={() => updateUser('first_name', firstName)}>сохранить
                    </button>
                }

            </div>
            <div className={'editProfile-forms-label'}>
                <p>Фамилия или полное название организации(компании):</p>
                <input
                    type="text" value={lastName} onChange={e => {
                    setLastName(e.target.value);
                    setEditSelect('last_name')
                }}/>
                {
                    loading === 'last_name' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div> : <button
                        className={editSelect === "last_name" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                        type={'button'} onClick={() => updateUser('last_name', lastName)}>сохранить
                    </button>
                }

            </div>
            <div className={'editProfile-forms-label'}>
                <p>email:</p>
                <input type="text" value={email} onChange={e => {
                    setEmail(e.target.value);
                    setEditSelect('email')
                }}/>
                {
                    loading === 'email' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div> :<button
                        className={editSelect === "email" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                        type={'button'} onClick={() => updateUser('email', email)}>сохранить
                    </button>
                }
            </div>
            <div className={'editProfile-forms-label'}>
                <p>описание:</p>
                <textarea value={description} onChange={e => {
                    setDescription(e.target.value);
                    setEditSelect('description')
                }}>

                        </textarea>
                {
                    loading === 'description' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div> : <button
                        className={editSelect === "description"
                            ? 'editProfile-forms-button editProfile-forms-button-descr editProfile-forms-button-selected'
                            : 'editProfile-forms-button editProfile-forms-button-descr'}
                        type={'button'} onClick={() => updateUser('description', description)}>сохранить
                    </button>
                }

            </div>
            <div className={'editProfile-forms-label'}>
                <p>локация:</p>
                <select name="" id="">
                    {
                        typeof location !== 'string' ?
                            location.map((item) => {
                                return <option value="" key={item}>{item}</option>
                            }) : <option value="">{location}</option>
                    }
                </select>
            </div>

            <div className={'editProfile-forms-label'}>
                <p>другое:</p>
                <input type="text" value={another} onChange={e => setAnother(e.target.value)}/>
            </div>
        </>
    );
};

export default EditProfileEdit;