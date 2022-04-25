import './home.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getItems, setApp, setStatus} from "../../redux/reducers/item";
import {useEffect, useState} from "react";

const Home = () => {

    const dispatch = useDispatch();
    const item = useSelector((s)=>s.item.items);

    useEffect(()=>{
        dispatch(getItems());
        dispatch(setStatus('home'));
        dispatch(setApp('kyzmat'));
    },[]);


    return (
        <div className='container'>
            <div className='home__row'>
            {item.map((item)=>{
                return(

                        <div className='item' key={item.id}>
                            <img src={`${item.imgsrc}`} alt=""/>
                            <div className='item__description'>
                                <h3 className="item__title"> <Link onClick={()=>{
                                    dispatch(setStatus('profile'));
                                }
                                } to={`/profile/${item.id}`}>{item.username.length > 20 ? `${item.username.slice(0, 19)}...` : item.username}</Link></h3>
                                {/*<p className="item__descr">{item.description.length > 30 ? `${item.description.slice(0, 29)}...` : item.description}</p>*/}
                                {/*<p className="item__text"><b>Локация :</b>{item.location}</p>*/}
                                {/*<p className="item__text"><b>Количество мест : </b>{item.places.length > 10 ? `${item.places.slice(0, 9)}...` : item.places}</p>*/}
                            </div>
                        </div>

                )
            })}
            </div>
        </div>
    );
};

export default Home;