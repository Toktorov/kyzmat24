import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getLocations, setApp, setShowPopup, setStatus} from "../../redux/reducers/item";
//import './order.css'
import axios from "axios";
import PopupComponent from "../PopupComponent/PopupComponent";
import requests from "../../assets/img/bg/requests.png";

const Order = () => {
    const categories = useSelector((s) => s.item.categories);
    const locations = useSelector(s => s.item.locations);
    const showPopup = useSelector(s => s.item.showPopup);
    const [description, setDescription] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] =useState(false);

    const addOrder = (e) => {
        e.preventDefault();
        setLoading(true);
       axios
           .post('/api/order/create_order/', {
               description,
               tel,
               email,
               location,
               category
           })
           .then((data) =>{
               console.log(data);
               setMessage('Ваш заказ добавлен. Через некоторое время с вами должны связаться')
           })
           .catch(error => {
            console.log(error.response);
             setMessage('Произошла ошибка. Поверьте подключение к интернету и пробуйте снова');
            console.log("Произошла ошибка Кубаныч");
           }).finally(()=>{
           dispatch(setShowPopup(true));
           setLoading(false);
           setDescription('');
           setTel('');
           setEmail('');
           setCategory('');
           setLocation('')
       });
    };


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('addItem'));
        dispatch(getCategories());
        dispatch(getLocations());
    }, [dispatch]);

    return (
        <>
            {
                showPopup  ?
                    <PopupComponent messageForUsers={message}/> : ''
            }

            <div className="requests">
                <div className="container">
                    <div className="row gx-5 justify-content-center">

                        <div className="col-lg-8 col-md-10 requests__content">
                            <div className="requests__wrap space-y-20">
                                <div>
                                    <h1 className="text-left">Добавить объявление</h1>
                                </div>
                                <div className="box is__big">
                                    <form
                                        onSubmit={(e)=>{
                                            addOrder(e)
                                        }}
                                        className="space-y-20 mb-0">
                                        <div className="space-y-10">
                                            <span className="nameInput">Ваш email</span>
                                            <input type="email" className="form-control"
                                                   value={email}
                                                   onChange={e => setEmail(e.target.value)}
                                                   placeholder="example@gmail.com"/>
                                        </div>
                                        <div className="space-y-10">
                                            <span className="nameInput">Ваш номер телефона</span>
                                            <input
                                                required={true}
                                                value={tel}
                                                onChange={e => setTel(e.target.value)}
                                                placeholder={'Обязетельно пишите'}
                                                type="tel" className="form-control"/>
                                        </div>
                                        <div className="space-y-10">
                                            <span className="nameInput">Описание</span>
                                            <textarea
                                                required={true}
                                                value={description}
                                                placeholder={'Вам необходимо добавить описание заказа'}
                                                onChange={(e) => setDescription(e.target.value)}
                                                      className="mb-0">
			                                </textarea>
                                        </div>
                                        <div className="space-y-10">
                                            <span className="nameInput">Категория</span>
                                            <select
                                                onChange={(e) => setCategory(e.target.value)}
                                                value={category ? category : 0}
                                                className="form-select
			                                    custom-select" aria-label="Default
			                                    select example">
                                                <option className={'kyzmat_option'} value="0">Выберите категорию (необязательно)</option>
                                                {
                                                    categories.map((item) => {
                                                        return <option className={'kyzmat_option'} key={`${item.id}`} value={item.id}>{item.content}</option>
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="space-y-10">
                                            <span className="nameInput">Локация</span>
                                            <select
                                                value={location ? location: 0}
                                                onChange={e => setLocation(e.target.value)}
                                                className="form-select
			                                    custom-select" aria-label="Default
			                                    select example">
                                                <option className={'kyzmat_option'} value="0">Выберите локацию (необязательно)</option>
                                                {
                                                    locations.map((item) => {
                                                        return <option key={item.id} className={'kyzmat_option'}
                                                                       value={item.id}>{item.title}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="requests_footer">
                                            <div>
                                                {
                                                    loading === true ? <div className="lds-ring">
                                                        <div> </div>
                                                        <div> </div>
                                                        <div> </div>
                                                        <div> </div>
                                                    </div>: <button type={"submit"} className="btn
			                                        btn-grad">Добавить</button>
                                                }

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 contact__img">
                            <div className="img__wrap">
                                <img src={requests} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/*<div className={'form_section'}>*/}
            {/*<form className={'kyzmat_form'} onSubmit={addItem}>*/}
            {/*    <h4>Добавьте объявление</h4>*/}
            {/*    <label>*/}
            {/*        <input required={true} value={description} onChange={(e) => setDescription(e.target.value)}*/}
            {/*               placeholder={'Введите описание (обязательно)'} type="text"/>*/}
            {/*    </label>*/}

            {/*    <label>*/}
            {/*        <input required={true} value={tel} onChange={e => setTel(e.target.value)}*/}
            {/*               placeholder={'Введите номер вашего телефона (обязательно)'} type="tel"/>*/}
            {/*    </label>*/}

            {/*    <label>*/}
            {/*        <input value={email} onChange={e => setEmail(e.target.value)}*/}
            {/*               placeholder={'Введите email (необязательно)'} type="email"/>*/}
            {/*    </label>*/}

            {/*    <select value={location} defaultValue={"0"} onChange={e => setLocation(e.target.value)}>*/}
            {/*        <option className={'kyzmat_option'} value="0">Выберите локацию (необязательно)</option>*/}
            {/*        {*/}
            {/*            locations.map((item)=>{*/}
            {/*                return <option className={'kyzmat_option'} value={item.id}>{item.title}</option>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </select>*/}

            {/*    <select  onChange={(e) => setCategory(e.target.id)}>*/}
            {/*        <option className={'kyzmat_option'} value="0">Выберите категорию (необязательно)</option>*/}
            {/*        {*/}
            {/*            categories.map((item) => {*/}
            {/*                return <option className={'kyzmat_option'} key={`${item.id}`} value={item.id}>{item.content}</option>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </select>*/}
            {/*    {*/}
            {/*        loading === true ? <div className="lds-ring">*/}
            {/*            <div> </div>*/}
            {/*            <div> </div>*/}
            {/*            <div> </div>*/}
            {/*            <div> </div>*/}
            {/*        </div>:  <button type='submit'>Добавить</button>*/}
            {/*    }*/}

            {/*</form>*/}
            {/*</div>*/}
        </>
    );
};

export default Order;