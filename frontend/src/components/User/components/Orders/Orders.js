import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../../../redux/reducers/user";
import './orders.css';
import axios from "axios";

const Orders = () => {
    const orders = useSelector(s => s.user.orders);
    const dispatch = useDispatch();
    const id = useSelector(s=> s.user.id);
const authTokens = useSelector(s => s.user.authTokens);

    useEffect(() => {

        dispatch(getOrders());


    }, []);
    return (
        <section className={'orders'}>
          <div className="container">
              <div className="row">

                     {
                         orders.map((item)=>{
                             return    <div className="col-4" key={item.id}>
                             <div  className={'orders__item'}>
                                 <p><b>Описание:</b> {item.description}</p>
                                 <p><b>Телефон:</b> {item.tel}</p>
                                 <p><b>Категория:</b> {item.category ? item.category.content : '...'}</p>
                                 <button onClick={()=>{
                                     axios.put(`/api/order/update/${item.id}`,{
                                         status: true
                                     }).then(({data})=> console.log(data));

                                     axios.post('/api/order/create_accept_order/',{
                                         user: id,
                                         order: item.id
                                     })
                                         .then(({data})=>{
                                             console.log('accept',data);
                                         axios.put(`https://kyzmat24.com/api/order/accept-update/${item.id}`,{
                                             status: true
                                         }).then(response => console.log('update',response)).catch(error => console.log(error))
                                         })
                                 }} className={'orders__item-get'}>Взять заказ</button>
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