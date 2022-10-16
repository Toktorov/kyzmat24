import React, {useEffect} from 'react';
import "./about.css";
import {useDispatch,} from "react-redux";
import {setStatus, setApp} from "../../redux/reducers/item";
import {setHiddenFooter} from "../../redux/reducers/app";

const About = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setApp('kyzmat'));
        dispatch(setStatus('category'));
        dispatch(setHiddenFooter(false))
    }, [dispatch]);

    return (
        <section className='about'>
            <div className='container'>
                <h2>На этом сайте вы можете найти нужную каждому услугу</h2>
                <h2>Можете пройти регистрацию и предоставлять свою услугу</h2>
                <h2>Теперь нет нужды куда-то ехать и искать</h2>
                <h2>Всё собрано здесь</h2>
                <h2>Искали работу? -Пройдите регистрацию</h2>
            </div>
        </section>
    );
};

export default About;