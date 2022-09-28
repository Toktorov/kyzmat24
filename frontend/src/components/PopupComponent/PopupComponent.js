import React from 'react';
import "./popupComponent.css";
import {useDispatch} from "react-redux";
import {setShowPopup} from "../../redux/reducers/item";

const PopupComponent = ({messageForUsers}) => {
    const dispatch = useDispatch();
    return (
        <div className={"popup-component"}>
            <div className="message-area">
                <p className={'message-text'}>{messageForUsers}</p>
                <div className="message-area-bottom">
                    <button onClick={()=>{
                        dispatch(setShowPopup(false))
                    }}>ок</button>
                </div>
            </div>

        </div>
    );
};

export default PopupComponent;