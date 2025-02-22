import Register from '../../components/features/auth/Register';
import SocialAuth from '../../components/features/auth/SocialAuth';
// import { useEffect } from 'react';
// import { RegisterAPI } from '../../services/authService';

const AuthRegister = () => {
    // useEffect(() => {

    return (
        <>
            <Register />
            <SocialAuth />
        </>
    );
};

export default AuthRegister;
