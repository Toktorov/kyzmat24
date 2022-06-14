import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./mediaCreate.css";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../redux/reducers/user";

const MediaCreate = ({setShowMediaCreate}) => {
    const [labelContentState, setLabelContentState] = useState(false);
    const labelPhotoContent = () => {
        return labelContentState ? `${photo.name}` : '+'
    };
    const id = useSelector(s => s.user.id);
    const [select, setSelect] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [videoSrc, serVideoSrc] = useState('');
    const dispatch = useDispatch();
    const sendPhoto = React.useCallback(
        async () => {
            if (photo) {
                try {
                    const data = new FormData();
                    data.append('file', photo, photo.name);
                    data.append('name', 'img');
                    data.append('user', id);
                    console.log(data.get('file'));
                    await axios.post('/api/users/media_create/', data).then(response => {
                        alert('Вы успешно добавили');
                        console.log(response);
                        setLabelContentState(false);
                        setPhoto(null);
                        axios(`/api/users/users/${id}`).then(({data}) => {
                            dispatch(setUser(data));
                            localStorage.setItem('user', JSON.stringify(data))
                        });
                    })

                } catch (error) {
                    console.log(error.response);
                }
            }

        }
    );
    const sendVideo = () => {
        if (videoSrc.includes('https://youtu.be/')){
            axios.post('/api/users/media_create/', {
                name: 'video',
                user: id,
                src: videoSrc,
                file: null
            }).then((response) => {
                alert('Вы успешно добавили');
                console.log(response);
                serVideoSrc(null);
                axios(`/api/users/users/${id}`).then(({data}) => {
                    dispatch(setUser(data));
                    localStorage.setItem('user', JSON.stringify(data))
                });
            })
        } else {
            alert('Ссылка неверная')
        }

    };

    return (
        <div className={'mediaCreate'}>
            <div className={'mediaCreate-forms'}>
                {
                    select === 'photo' ?
                        <form>
                            Добавить фото
                            <label className={'mediaCreate-forms-label-photo'}>
                                {labelPhotoContent()}
                                <input
                                    className={'mediaCreate-forms-input-photo'}
                                    type="file" onChange={e => {
                                    console.log(e);
                                    setPhoto(e.target.files[0]);
                                    setLabelContentState(true)
                                }}/>
                            </label>

                            <div className={'mediaCreate-forms-btns'}>
                                <button type={'button'} onClick={() => {
                                    console.log(photo);
                                    sendPhoto()
                                }}>Добавить
                                </button>
                                <button type={'button'} onClick={() => setSelect('video')}>Перейти на видео</button>
                            </div>

                        </form> :
                        select === 'video' ?
                            <form>
                                <p>Добавьте ссылку на видео в ютуб чтобы добавить видое</p>
                                <label >
                                    <input
                                        className={'mediaCreate-forms-input-video'}
                                        required={true} type="url" onChange={e => serVideoSrc(e.target.value)}/>
                                </label>
                                <div className="mediaCreate-forms-btns">
                                    <button type={'button'} onClick={()=>{
                                        sendVideo();
                                    }}>Добавить</button>
                                    <button type={'button'} onClick={() => setSelect('photo')}>Перейти на фото</button>
                                </div>

                            </form>
                            : <div className={'mediaCreate-btns'}>
                                Загрузить: <button onClick={() => setSelect('photo')}>фото</button> | <button
                                onClick={() => setSelect('video')}>видео</button>
                            </div>
                }
                <button className={'mediaCreateClose'}
                        onClick={() => setShowMediaCreate(false)}>{photo || videoSrc ? 'Отменить/Закрыть' : 'Закрыть'}</button>
            </div>
        </div>
    );
};

export default MediaCreate;