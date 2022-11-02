import React, {useState} from 'react';
import axios from "axios";
import {getAcceptOrders} from "../../../../redux/reducers/user";
import {useDispatch} from "react-redux";

const AcceptOrdersPopup = ({message, setShowPopup, orderId, acceptId, setAcceptId}) => {
    const dispatch = useDispatch();
    const [localMessage, setLocalMessage] = useState('');
    const [loading,  setLoading] = useState(false);
    const completedOrderFunc = (orderId) =>{
        axios.put(`https://kyzmat24.com/api/order/update_completed/${orderId}`, {
            "completed": true
        })
            .then(response => {
                console.log(response);
                setLocalMessage('Операция успешно выполнена!')
            }).catch(()=>{
                setLocalMessage("Произошла ошибка(")
        }).finally(()=>{
            setLoading(false);
            dispatch(getAcceptOrders());
        })
    };

    const cancelTheOrder = (orderId, acceptId) => {
        axios.delete(`/api/order/accept_order/${acceptId}`)
            .then(response => {
                console.log('delete', response);
                axios.put(`https://kyzmat24.com/api/order/accept-update/${orderId}`, {
                    status: false
                }).then(response => {
                    console.log('update', response);
                    dispatch(getAcceptOrders());
                    setAcceptId(null);
                    setLocalMessage('Операция успешно выполнена!')
                }).catch(error => {
                    console.log(error);
                    setLocalMessage("Произошла ошибка(")
                }).finally(()=>{
                    setLoading(false)
                })
            }).catch(error => {
            console.log(error.response);
            setAcceptId(null);
            setLocalMessage("Произошла ошибка(");
            setLoading(false)
        });
    };

    const selectorFunc = () =>{
        setLoading(true);
      if (acceptId){
          cancelTheOrder(orderId, acceptId);
      }  else {
          completedOrderFunc(orderId)
      }
    };

    return (
        <div className={'accept-orders-popup'}>
                <p>{localMessage.length !== 0
                ? localMessage
                : message}</p>
                <div className="orders-popup-btns">
                    {
                        loading ?
                            <div className="lds-ring">
                                <div> </div>
                                <div> </div>
                                <div> </div>
                                <div> </div>
                            </div>
                        : localMessage.length !== 0
                            ? <button
                                onClick={()=>{
                                    setShowPopup(false);
                                    setLocalMessage('')
                                }}
                                className={'orders-popup-button'}>OK</button>
                            : <>
                                <button className="orders-popup-button"
                                        onClick={()=>{
                                            selectorFunc()
                                        }}
                                >Подтвердить</button>
                                <button
                                    onClick={()=>{
                                        setShowPopup(false)
                                    }}
                                    className="orders-popup-button">Отменить</button>
                            </>
                    }

                </div>
        </div>
    );
};

export default AcceptOrdersPopup;