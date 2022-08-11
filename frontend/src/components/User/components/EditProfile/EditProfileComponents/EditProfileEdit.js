import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../../../../../redux/reducers/user";
import {getLocations} from "../../../../../redux/reducers/item";

const EditProfileEdit = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const locations = useSelector(s => s.item.locations);
    const dispatch = useDispatch();
    const [first_name, setFirst_name] = useState(user ? user.first_name : '');
    const [last_name, setLast_name] = useState(user ? user.last_name : '');
    const [description, setDescription] = useState(user ? user.description : '');
    const [location, setLocation] = useState(user ? user.location : '');
    const [another, setAnother] = useState(user ? user.another : '');
    const [profile_image, setProfile_image] = useState(null);

    const profileImageText = () => {
        if (profile_image) {
            return profile_image.name.length > 10 ? profile_image.name.slice(0, 10) + '...' : profile_image.name
        } else {
            return 'Выбрать фото'
        }
    };

    const updateUser = () => {
setLoading(true);
        const data = new FormData;

         if (profile_image){
             data.append('profile_image', profile_image, profile_image.name);
             data.append('username', user.username);
             data.append('first_name', first_name);
             data.append('last_name', last_name);
             data.append('description', description);
             data.append('location', location);
         } else {
             data.append('username', user.username);
             data.append('first_name', first_name);
             data.append('last_name', last_name);
             data.append('description', description);
             data.append('location', location);
         }


            axios.put(`https://kyzmat24.com/api/users/update/${id}`, data).then(response => {
                console.log(response);
                alert('Вы успешно поменяли');
                dispatch(setUser(id));
                setLoading('');
                setEditSelect('')
            }).catch(error => {
                setLoading(false);
                setEditSelect('');
                console.log(error.response)
            })

    };


    useEffect(() => {
        setFirst_name(user ? user.first_name : '');
        setLast_name(user ? user.last_name : '');
        setDescription(user ? user.description : '');
        setLocation(user ? user.location : '');
        setAnother(user ? user.another : '');
        setProfile_image(null);
    }, [user]);
    useEffect(() => {
        dispatch(setUser(id));
        dispatch(getLocations());
    }, []);
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
                               setProfile_image(e.target.files[0]);
                               setEditSelect('profile_image')
                           }} accept='image/*'
                           type="file"/>
                </label>
            </div>

            <div className={'editProfile-forms-label'}>
                <p>Как вас зовут или название организации(компании):</p>
                <input type="text" value={first_name} onChange={e => {
                    setFirst_name(e.target.value);
                    setEditSelect('first_name')
                }}/>


            </div>

            <div className={'editProfile-forms-label'}>
                <p>Фамилия или полное название организации(компании):</p>
                <input
                    type="text" value={last_name} onChange={e => {
                    setLast_name(e.target.value);
                    setEditSelect('last_name')
                }}/>

            </div>

            <div className={'editProfile-forms-label'}>
                <p>описание:</p>
                <textarea value={description} onChange={e => {
                    setDescription(e.target.value);
                    setEditSelect('description')
                }}>

                        </textarea>
            </div>

            <div className={'editProfile-forms-label'}>
                <p>локация:</p>
                <select name="" id="" defaultValue={location.id ? location.id : 0}
                onChange={(e)=>{
                    setLocation(e.target.value);
                    setEditSelect("location")
                }}
                >
                    <option value="0">{location}</option>
                    {
                            locations.map((item) => {
                                return <option value={item.id} key={item.id}>{item.title}</option>
                            })
                    }
                </select>
            </div>


            <div className={'editProfile-forms-label'}>
                <p>другое:</p>
                <input type="text" value={another} onChange={e => setAnother(e.target.value)}/>
            </div>
            {
                loading? <div className={'editPreloader'}>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div> : <button
                    className={editSelect
                        ? 'editProfile-forms-button editProfile-forms-button-descr editProfile-forms-button-selected'
                        : 'editProfile-forms-button editProfile-forms-button-descr'}
                    type={'button'} onClick={() => updateUser('description', description)}>сохранить
                </button>
            }
        </>
    );
};

export default EditProfileEdit;