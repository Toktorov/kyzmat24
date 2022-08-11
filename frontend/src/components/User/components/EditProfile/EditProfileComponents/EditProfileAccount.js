import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../../redux/reducers/user";
import axios from "axios";

const EditProfileAccount = ({editSelect, setEditSelect, loading, setLoading}) => {
    const dispatch = useDispatch();
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const [email, setEmail] = useState(user ? user.email : '');
    const [emailUsers, setEmailUsers] = useState([]);

    const updateEmail = () => {
        axios('/api/users/')
            .then(({data}) => {
                setEmailUsers(data.filter((item) => {
                    return item.email === email
                }));
                setTimeout(()=>{
                    if (emailUsers.length === 0){
                        axios.put(`https://kyzmat24.com/api/users/update/${id}`)
                            .then((response)=>{
                                console.log(response);
                                alert('Вы успешно поменяли');
                                dispatch(setUser(id));
                                setLoading('')
                            }).catch(error => {
                            setLoading('');
                            console.log(error.response)
                        })
                    } else {
                        alert('Аккаунт с таким email уже есть. Введите другой email')
                    }
                }, 400);

            })
    };
    useEffect(()=>{
        dispatch(setUser(id));
    }, []);
    useEffect(()=>{
        setEmail(user ? user.email : '');
    }, [user]);
    return (
        <div>
            <p>Настройки аккаунта</p>
            <div className={'editProfile-forms-label'}>
                <p>email:</p>
                <input type="text" value={email} onChange={e => {
                    setEmail(e.target.value);
                    setEditSelect('email')
                }}/>
                {
                    loading === 'email' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : <button
                        className={editSelect === "email" ? 'editProfile-forms-button editProfile-forms-button-selected' : 'editProfile-forms-button'}
                        type={'button'} onClick={() => updateEmail()}>сохранить
                    </button>
                }
            </div>
        </div>
    );
};

export default EditProfileAccount;