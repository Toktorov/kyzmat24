import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../../redux/reducers/user";
import axios from "axios";
import {getCategories, getLocations, setShowPopup} from "../../../../../redux/reducers/item";
import PopupComponent from "../../../../PopupComponent/PopupComponent";
import UpdateProfile from "../../UpdateProfile/UpdateProfile";

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
    const [category, setCategory] = useState(user && user.user_category ? user.user_category: '0');
    const [message, setMessage] = useState('');



    const updateAccount = () =>{
        const data = new FormData();
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
        setLoading('update');
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
    }, [dispatch, id]);
    useEffect(()=>{
        setEmail(user ? user.email : '');
        setLocation(user ? user.user_location : '0');
        setUsername(user ? user.username: '');
        setCategory(user && user.user_category ? user.user_category: '0')
    }, [user]);
    return (
        <>
            {
                showPopup ? <PopupComponent messageForUsers={message}/>: ''
            }

            <div className="col-lg-6 social-media">
                <h3 className="mb-20">Настройки аккаунта</h3>
                <div className="form-group space-y-10">
                    <div className="space-y-40">
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">email</span>
                            <input type="text" className="form-control"
                                   placeholder="Ваш  email"
                                   value={email != null ? email: ''}
                                   onChange={(e)=>{
                                setEmail(e.target.value);
                                setEditSelect('email')
                            }}
                            />


                        </div>
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Имя пользователя/логин</span>
                            <input type="text" className="form-control"
                                   placeholder="username"
                                   value={username}
                            onChange={(e)=>{
                                setUsername(e.target.value);
                                setEditSelect('username')
                            }}
                            />

                        </div>
                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Ваша категория</span>
                            <select name="" id=""
                                    value={ category ? category: 0}
                            onChange={(e)=>{
                                setCategory(e.target.value);
                                setEditSelect('category')
                            }}
                            >
                                <option value="0">Выбрать категорию</option>
                                {
                                    categories.map((item)=>{
                                        return <option key={item.id} value={item.id}>{item.content}</option>
                                    })
                                }
                            </select>

                        </div>

                        <div className="d-flex flex-column">
                            <span className="nameInput mb-10">Ваша локация</span>
                            <select name="" id=""
                                    value={location ? location: 0}
                                    onChange={(e)=>{
                                        setLocation(e.target.value);
                                        setEditSelect('location')
                                    }}
                            >
                                <option value="0">Выбрать локацию</option>
                                {
                                    locations.map((item)=>{
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })
                                }
                            </select>

                        </div>
                        <div>
                            {
                                loading === 'update' ? <div className={'editPreloader'}>
                                    <div className="lds-ellipsis">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div> : <button className="btn btn-grad"
                                                 onClick={()=>{
                                                     if (editSelect){
                                                         updateAccount()
                                                     }
                                                 }}
                                >Сохранить</button>
                            }

                        </div>

                        {
                           user && user.status_user === "Free"
                            ? <UpdateProfile loading={loading} setLoading={setLoading} /> : ''
                        }

                    </div>

                </div>

            </div>

            {/*<p>Настройки аккаунта</p>*/}
            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>email:</p>*/}
            {/*    <input type="text" value={email != null ? email: ''} onChange={e => {*/}
            {/*        setEmail(e.target.value);*/}
            {/*        setEditSelect('email')*/}
            {/*    }}/>*/}
            {/*</div>*/}

            {/*<label className="editProfile-forms-label">*/}
            {/*    <p>Имя пользователя/логин:</p>*/}
            {/*    <input type="text" value={username} onChange={(e)=>{*/}
            {/*        setUsername(e.target.value);*/}
            {/*        setEditSelect('username')*/}
            {/*    }}/>*/}
            {/*</label>*/}

            {/*<label className="editProfile-forms-label">*/}
            {/*    <select*/}
            {/*        defaultValue={user && user.user_category ? user.user_category: ''}*/}
            {/*        onChange={(e)=>{*/}
            {/*        setCategory(e.target.value);*/}
            {/*            setEditSelect('category')*/}
            {/*        }}>*/}
            {/*        <option value="0">Выбрать категорию</option>*/}
            {/*        {*/}
            {/*            categories.map((item)=>{*/}
            {/*                return <option key={item.id} value={item.id}>{item.content}</option>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </select>*/}

            {/*</label>*/}

            {/*<div className={'editProfile-forms-label'}>*/}
            {/*    <p>локация:</p>*/}
            {/*    <select name="" id="" defaultValue={location}*/}
            {/*            onChange={(e) => {*/}
            {/*                setLocation(e.target.value);*/}
            {/*                setEditSelect(true)*/}
            {/*            }}*/}
            {/*    >*/}
            {/*        <option value="0">Выбрать локацию</option>*/}
            {/*        {*/}
            {/*            locations.map((item) => {*/}
            {/*                return <option value={item.id} key={item.id}>{item.title}</option>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </select>*/}
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
            {/*        className={ editSelect ? 'editProfile-forms-button editProfile-forms-button-selected': 'editProfile-forms-button'}*/}
            {/*        type={'button'} onClick={() => {*/}
            {/*            if (editSelect){*/}
            {/*                updateAccount()*/}
            {/*            }*/}
            {/*        }}>сохранить*/}
            {/*    </button>*/}
            {/*}*/}
        </>
    );
};

export default EditProfileAccount;