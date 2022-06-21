import React, {useState} from 'react';
import axios from "axios";
import {setUser} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const PopupMedia = ({setShowMediaPopup, mediaId}) => {
    const dispatch = useDispatch();
    const id = useSelector(s => s.user.id);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const deleteMedia = (idMedia) => {
        axios.delete(`/api/users/media/delete/${idMedia}`)
            .then(response => {
                console.log(response);
                axios(`/api/users/${id}`).then(({data}) => {
                    dispatch(setUser(data));
                    localStorage.setItem('user', JSON.stringify(data))
                });
            })
    };

    return (
        <div className={'popup-media'}>
            {
                showConfirmDelete ? <>
                    <p className={'popup-media-button popup-media-confirm'}>Вы уверены?</p>
                    <button
                        onClick={()=> deleteMedia(mediaId)}
                        className={'popup-media-button popup-media-deleteBtn'}>удалить!</button>
                    <button
                        className={'popup-media-button popup-media-cancelBtn'}
                        onClick={()=> setShowConfirmDelete(false)}>отмена</button>
                    </>
                    : <>
                        <button className={'popup-media-button'} onClick={()=> setShowConfirmDelete(true)}> удалить <FontAwesomeIcon icon={faTrash}/></button>
                        <button className={'popup-media-button'} onClick={() => {
                            setShowMediaPopup(null)
                        }}>закрыть
                        </button>
                    </>
            }
        </div>
    );
};

export default PopupMedia;