import React, {useEffect} from 'react';
import './reviews.css'
import {useDispatch} from "react-redux";
import {setApp, setStatus} from "../../redux/reducers/item";


const Reviews = () => {
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('review'));
    },[]);
    return (

        <section className={'review'}>
            <div className={'kyzmat_form container'}>
                <h2>Оставьте свой отзыв/Свои предложения :)</h2>
                <p>Например предложите нам новую категорию...</p>
                <form className={' review__form'}>
                    <label>
                        <input type="text " placeholder={'Введите...'}/>
                    </label>
                    <button type={'submit'}>Отправить</button>
                </form>
            </div>

        </section>
    );
};

export default Reviews;