import React, {useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../redux/reducers/user";
import "./editProfile.css";

const EditProfile = ({setShowEditProfile}) => {
    const user = useSelector(s => s.user.user);
    const [username, setUserName] = useState(user.username);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [profileImage, setProfileImage] = useState(user.profle_image);
    const [description, setDescription] = useState(user.description);
    const [location, setLocation] = useState(user.location);
    const [contact, setContact] = useState(user.contact);
    const [another, setAnother] = useState(user.another);


    const [update, setUpdate] = useState(null);
    const [change, setChange] = useState('');
    const id = useSelector(s => s.user.id);
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();
    const updateUser = (key, value) => {
        axios.put(`https://kyzmat24.com/api/users/update/${id}`, {
            ...user,
            [key]: value,
        }).then(response => {
            console.log(response);
            axios(`/api/users/${id}`).then(({data}) => {
                dispatch(setUser(data));
                localStorage.setItem('user', JSON.stringify(data))
            })
        })
    };
    return (
        <div className={'editProfile'}>
            <div className="editProfile-forms">
<div className="editProfile-forms-left">
    <label>
        Изменить/добавить фото
        <input onChange={(e) => setAvatar(e.target.value)} accept='image/*'
               type="file"/>
    </label>
    <button onClick={()=>{
        setShowEditProfile(false)
    }}>Закрыть</button>
    <p><b>Эта часть на стадии разработки</b></p>
    <p><b>Тут работает только кнопка "Закрыть"</b></p>
</div>


                <div className="ditProfile-forms-right">
                    <label>
                        username:
                        <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        firstName:
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </label>
                    <label>
                        lastName:
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </label>
                    <label>
                        email:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        description:
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    </label>
                    <label>
                        location:
                        <select name="" id="">
                            {
                                typeof location !== 'string' ?
                                location.map((item)=>{
                                    return <option value="">{item}</option>
                                }) : <option value="">{location}</option>
                            }
                        </select>
                    </label>
                    <label>
                        contact:
                        <select name="" id="">
                            {
                                typeof contact !== 'string' && contact.length !== 0 ?
                                    contact.map((item)=>{
                                        return <option value="">{item.name}</option>
                                    }) : ''
                            }
                        </select>
                    </label>
                    <label>
                        another:
                        <input type="text" value={another} onChange={e => setAnother(e.target.value)}/>
                    </label>
                </div>

            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        axios.put(`/api/users/change_password/${id}/`, {*/}
            {/*            old_password: 'kuba2020',*/}
            {/*            password: 'admin',*/}
            {/*            password2: 'admin',*/}
            {/*        }).then(response => console.log(response))*/}
            {/*    }}*/}
            {/*>change password*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    axios.post('/api/users/request-reset-email/',*/}
            {/*        {*/}
            {/*            "email": user.email,*/}
            {/*            "redirect_url": "https://kyzmat24.com/user/reset-password/reset"*/}
            {/*        }*/}
            {/*    )*/}
            {/*        .then(response => console.log(response))*/}
            {/*}}>reset*/}
            {/*</button>*/}


            {/*<button onClick={() => {*/}
            {/*    axios.post('/api/users/contact_create/', {*/}
            {/*        "name": "tel",*/}
            {/*        "src": "0559996474",*/}
            {/*        "user": id*/}
            {/*    }).then((response) => console.log(response))*/}
            {/*}}>Добавить контакт*/}
            {/*</button>*/}
            </div>
        </div>
    );
};

export default EditProfile;