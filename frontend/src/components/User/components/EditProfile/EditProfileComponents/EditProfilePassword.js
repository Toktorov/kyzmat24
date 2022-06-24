import React from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

const EditProfilePassword = ({editSelect, setEditSelect, loading, setLoading}) => {
    const user = useSelector(s => s.user.user);
    const id = useSelector(s => s.user.id);

    const changePassword = (old_password, password, password2) =>{
        axios.put(`/api/users/change_password/${id}/`, {
            old_password,
            password,
            password2
        }).then(response => console.log(response))
    };

    const resetPassword = () => {
        axios.post('/api/users/request-reset-email/',
            {
                "email": user.email,
                "redirect_url": "https://kyzmat24.com/user/reset-password/reset"
            }
        )
            .then(response => console.log(response))
    };
    return (
        <div>
<p>Настройки пароли</p>
        </div>
    );
};

export default EditProfilePassword;