import React from 'react';
import {useHistory} from 'react-router-dom'
import {logoutUser} from "../../redux/reducers/user";
import {useDispatch} from "react-redux";

const LogoutPopup = ({setShowLogoutPopup}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className={'logout-popup-bg'}>
            <div className="logout-popup">
                <p className={'logout-message'}>Вы уверены что хотите выйти?</p>
                <button
                    onClick={()=>{
                        setShowLogoutPopup(false)
                    }}
                    className={'logout-btn-cancel'}>отмена</button>
                <button className={'logout-btn-logout'} onClick={() => {
                    dispatch(logoutUser());
                    history.push(`/user`)
                }}>выйти
                </button>
            </div>

        </div>
    );
};

export default LogoutPopup;