import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./mediaCreate.css";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../../redux/reducers/user";

const MediaCreate = ({setShowMediaCreate}) => {
    const [labelContentState, setLabelContentState] = useState(false);
    const [loading, setLoading] = useState(false);
    const labelPhotoContent = () => {
        if (labelContentState){
            return photo.name.length > 10 ? photo.name.slice(0, 10) + '...' : photo.name
        }
        return  'Выбрать фото'
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
                    setLoading(true);
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
                        dispatch(setUser(id));
                        setLoading(false);
                    })

                } catch (error) {
                    console.log(error.response);
                }
            }

        }
    );
    const sendVideo = () => {
        if (videoSrc.includes('https://youtu.be/')){
            setLoading(true);
            axios.post('/api/users/media_create/', {
                name: 'video',
                user: id,
                src: videoSrc,
                file: null
            }).then((response) => {
                alert('Вы успешно добавили');
                console.log(response);
                serVideoSrc(null);
                dispatch(setUser(id));
                setLoading(false);
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
                                {
                                    loading ? <div className="lds-dual-ring"> </div>:
                                        <>
                                            {
                                                photo ? <button type={'button'} onClick={() => {
                                                    console.log(photo);
                                                    sendPhoto()
                                                }}>Добавить
                                                </button> : ''
                                            }
                                            <button type={'button'} onClick={() => setSelect('video')}>Перейти на видео</button>
                                            </>
                                }

                            </div>

                        </form> :
                        select === 'video' ?
                            <form>
                                <p>Добавьте ссылку на видео в ютуб чтобы добавить видое</p>
                                <label >
                                    <input
                                        className={'mediaCreate-forms-input-video'}
                                        placeholder={'Добавьте ссылку сюда..'}
                                        required={true} type="url" onChange={e => serVideoSrc(e.target.value)}/>
                                </label>
                                <div className="mediaCreate-forms-btns">
                                    {
                                        loading ? <div className="lds-dual-ring"> </div>:
                                            <>
                                                {
                                                    videoSrc ?  <button type={'button'} onClick={()=>{
                                                        sendVideo();
                                                    }}>Добавить</button> : ''
                                                }
                                                <button type={'button'} onClick={() => setSelect('photo')}>Перейти на фото</button>
                                            </>
                                    }

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