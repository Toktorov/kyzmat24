import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../../redux/reducers/user";
import axios from "axios";
import {getCategories, getLocations, setShowPopup} from "../../../../../redux/reducers/item";
import PopupComponent from "../../../../PopupComponent/PopupComponent";

const EditProfileAccount = ({editSelect, setEditSelect, loading, setLoading}) => {
    const dispatch = useDispatch();
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);
    const showPopup = useSelector(s => s.item.showPopup);
    const locations = useSelector(s => s.item.locations);
    const categories = useSelector(s => s.item.categories);
    const [email, setEmail] = useState(user ? user.email : '');
    const [username, setUsername] = useState(user ? user.username : '');
    const [location, setLocation] = useState(user ? user.user_location : '');
    const [category, setCategory] = useState(null);
    const [message, setMessage] = useState('');


    const updateAccount = () =>{
        const data = new FormData;
        data.append('username', username);
        if (email){
            data.append('email', email);
        }
        if (category){
            data.append('user_category', category);
        }
        if (location){
            data.append('user_location', location)
        }
        setLoading(true);
      axios.put(`https://kyzmat24.com/api/users/update/${id}`, data)
          .then((response)=>{
          console.log(response);
          setMessage('Изменения сохранены');
          dispatch(setUser(id));
      }).catch((error)=>{
          if (error.response.data.email){
              setMessage(error.response.data.email[0])
          } else if (error.response.data.username){
              setMessage(error.response.data.username[0])
          }
      }).finally(()=>{
          setLoading('');
          setEditSelect(null);
          dispatch(setShowPopup(true));
      })
    };
    useEffect(()=>{
        dispatch(setUser(id));
        dispatch(getCategories());
        dispatch(getLocations());
    }, []);
    useEffect(()=>{
        setEmail(user ? user.email : '');
        setLocation(user ? user.user_location : '');
        setUsername(user ? user.username: '');
    }, [user]);
    return (
        <div>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }
            <p>Настройки аккаунта</p>
            <div className={'editProfile-forms-label'}>
                <p>email:</p>
                <input type="text" value={email != null ? email: ''} onChange={e => {
                    setEmail(e.target.value);
                    setEditSelect('email')
                }}/>
            </div>

            <label className="editProfile-forms-label">
                <p>Имя пользователя/логин:</p>
                <input type="text" value={username} onChange={(e)=>{
                    setUsername(e.target.value);
                    setEditSelect('username')
                }}/>
            </label>

            <label className="editProfile-forms-label">
                <select
                    defaultValue={user && user.user_category ? user.user_category: ''}
                    onChange={(e)=>{
                    setCategory(e.target.value);
                        setEditSelect('category')
                    }}>
                    <option value="0">Выбрать категорию</option>
                    {
                        categories.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.content}</option>
                        })
                    }
                </select>

            </label>

            <div className={'editProfile-forms-label'}>
                <p>локация:</p>
                <select name="" id="" defaultValue={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            setEditSelect(true)
                        }}
                >
                    <option value="0">Выбрать локацию</option>
                    {
                        locations.map((item) => {
                            return <option value={item.id} key={item.id}>{item.title}</option>
                        })
                    }
                </select>
            </div>
            {
                loading ? <div className={'editPreloader'}>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div> : <button
                    className={ editSelect ? 'editProfile-forms-button editProfile-forms-button-selected': 'editProfile-forms-button'}
                    type={'button'} onClick={() => {
                        if (editSelect){
                            updateAccount()
                        }
                    }}>сохранить
                </button>
            }
        </div>
    );
};

export default EditProfileAccount;