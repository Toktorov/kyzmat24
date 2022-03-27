import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getBtns, setApp, setStatus} from "../../redux/reducers/item";
import './order.css'
import axios from "axios";

const Order = () => {
    // const status = useSelector((s) => s.item.status);
    // const [state, setState] = useState([]);
    const btns = useSelector((s) => s.item.btns);
    const [description, setDescription] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const addItem = (e) => {
        e.preventDefault();
        const data = {
            description,
            tel,
            email,
            location,
            category
        }
       axios
           .post('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/order/create_order/', data)
           .then((data) => console.log(data))
           .catch(error => {
            console.log(error.response)
            console.log("Произошла ошибка Кубаныч")
        });
    }


    const dispatch = useDispatch();
    // const addState = (mean) => {
    //     setState([
    //         ...status,
    //         {
    //             category: mean,
    //         }
    //     ])
    // };
    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('addItem'));
        dispatch(getBtns());
    }, []);

    return (
        <>
            <form className={'reception__form'} onSubmit={addItem}>
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

                <select value={location} onChange={e => setLocation(e.target.value)}>
                    <option value="0">Выберите локацию (необязательно)</option>
                    <option value="recent">Локация 1</option>
                    <option value="2">Локация 2</option>
                    <option value="3">Локация 3</option>
                    <option value="4">Локация 4</option>
                </select>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="0">Выберите категорию (необязательно)</option>
                    {
                        btns.map((item) => {
                            return <option key={`${item.id}`} value={item.id}>{item.content}</option>
                        })
                    }
                </select>
                <button type='submit'>Добавить</button>
            </form>
        </>
    );
};

export default Order;