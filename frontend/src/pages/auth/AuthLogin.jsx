import Login from '../../components/features/auth/Login';
import SocialAuth from '../../components/features/auth/SocialAuth';

const AuthLogin = () => {
    return (
            <>
                <Login />
                <SocialAuth />                
            </>
    );
};

export default AuthLogin;