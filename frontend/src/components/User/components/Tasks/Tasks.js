import React from 'react';
import './tasks.css';

const Tasks = () => {

    return (
        <section className={'cart'}>
            <div className="cart-btns">
                <div className="container">
                    <button type={'button'} className={'cart-btn category__btn-all'}>Все</button>
                    <button type={'button'} className={'cart-btn category__btn-active'}>Активные</button>
                    <button type={'button'} className={'cart-btn category__btn-done'}>Выполнено</button>
                </div>
            </div>
            <div className="container">

                   <h1>Здесь будут вами полученные заказы</h1>

                                    <div className={'cart-item'}>
                                        <div className="cart-description">
                                            <h4>Описание</h4>
                                        </div>
                                        <div className="cart-bottom">
                                            <p>Категория: категория</p>
                                        </div>
                                        <button type={'button'} className={'cart-btn done'}>Выполнено</button>
                                        <button type={'button'} className={'cart-btn refuse'}>Отказаться</button>
                                        <hr/>
                                    </div>

            </div>
        </section>
    );
};

export default Tasks;