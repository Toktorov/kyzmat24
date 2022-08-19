import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../../redux/reducers/user";
import axios from "axios";

const EditProfileAccount = ({editSelect, setEditSelect, loading, setLoading}) => {
    const dispatch = useDispatch();
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const categories = useSelector(s => s.item.categories);
    const [email, setEmail] = useState(user ? user.email : '');
    const [emailUsers, setEmailUsers] = useState([]);
    const [category, setCategory] = useState(null);

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
    const createCategory = (categoryId) =>{
        setLoading('category');
      axios.put(`https://kyzmat24.com/api/users/update/${id}`, {
          username: user.username,
          user_category: categoryId
      }).then((response)=>{
          console.log(response);
          alert('Вы успешно поменяли');
          dispatch(setUser(id));
          setLoading('')
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
            <label className="editProfile-forms-label">
                <select onChange={(e)=>{
                    setCategory(e.target.value)
                }}>
                    <option value="0">Выбрать категорию</option>
                    {
                        categories.map((item)=>{
                            return <option value={item.id}>{item.content}</option>
                        })
                    }
                </select>
                {
                    loading === 'category' ? <div className={'editPreloader'}>
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : <button
                        className={'editProfile-forms-button'}
                        type={'button'} onClick={() => createCategory(category)}>сохранить
                    </button>
                }
            </label>
        </div>
    );
};

export default EditProfileAccount;