import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getLocations, setApp, setShowPopup, setStatus} from "../../redux/reducers/item";
import './order.css'
import axios from "axios";
import PopupComponent from "../PopupComponent/PopupComponent";

const Order = () => {
     const [state, setState] = useState(null);
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

    const addItem = (e) => {
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
               setState(data.status);
               setMessage('Ваш заказ добавлен. Через некоторое время с вами должны связаться')
           })
           .catch(error => {
            console.log(error);
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
    }, []);

    return (
        <>
            {
                showPopup  ?
                    <PopupComponent messageForUsers={message}/> : ''
            }
            <div className={'form_section'}>
            <form className={'kyzmat_form'} onSubmit={addItem}>
                <h4>Добавьте объявление</h4>
                <label>
                    <input required={true} value={description} onChange={(e) => setDescription(e.target.value)}
                           placeholder={'Введите описание (обязательно)'} type="text"/>
                </label>

                <label>
                    <input required={true} value={tel} onChange={e => setTel(e.target.value)}
                           placeholder={'Введите номер вашего телефона (обязательно)'} type="tel"/>
                </label>

                <label>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                           placeholder={'Введите email (необязательно)'} type="email"/>
                </label>

                <select value={location} defaultValue={"0"} onChange={e => setLocation(e.target.value)}>
                    <option className={'kyzmat_option'} value="0">Выберите локацию (необязательно)</option>
                    {
                        locations.map((item)=>{
                            return <option className={'kyzmat_option'} value={item.id}>{item.title}</option>
                        })
                    }
                </select>

                <select  onChange={(e) => setCategory(e.target.id)}>
                    <option className={'kyzmat_option'} value="0">Выберите категорию (необязательно)</option>
                    {
                        categories.map((item) => {
                            return <option className={'kyzmat_option'} key={`${item.id}`} value={item.id}>{item.content}</option>
                        })
                    }
                </select>
                {
                    loading === true ? <div className="lds-ring">
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                    </div>:  <button type='submit'>Добавить</button>
                }

            </form>
            </div>
        </>
    );
};

export default Order;