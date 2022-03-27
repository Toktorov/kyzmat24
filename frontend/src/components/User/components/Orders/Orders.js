import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
import './orders.css';

const Orders = () => {
    const authTokens = useSelector(s => s.user.authTokens);
    //  const [orders, setOrders] = useState([]);
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        // axios('http://kyzmat24.com/api/order/orders', {
        //     headers:{
        //         'Authorization': `Bearer ${authTokens}`
        //     }
        // }).then(({data})=> {
        //     setOrders(data);
        //     console.log(data)
        // }).catch((error)=> console.log(error.data));
        // console.log('Это заказы')

        dispatch(getOrders())

    }, []);
    return (
        <section className={'orders'}>
          <div className="container">
              <div className="row">

                     {
                         orders.map((item)=>{
                             return    <div className="col-4">
                             <div key={item.id} className={'orders__item'}>
                                 <p><b>Описание:</b> {item.description}</p>
                                 <p><b>Телефон:</b> {item.tel}</p>
                                 <p><b>Категория:</b> {item.category.content}</p>
                                 <button className={'orders__item-get'}>Взять заказ</button>
                                 <button  className={'orders__item-more'}>Подробнее...</button>
                             </div>
                             </div>
                         })
                     }

              </div>
          </div>
        </section>
    );
};

export default Orders;