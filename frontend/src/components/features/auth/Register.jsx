import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../../../services/authService";
import useAuthStore from "../../../store/authStore";
import Loading from "../../common/Loading";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
        setIsLoading(true);
        try {
            const data = await RegisterAPI(email, username, password);
            console.log(data);
            const dataUser = {
                id: data.id,
                email: data.email,
            }
            register(dataUser);
            setIsLoading(true);
            navigate('/auth/verification');
        } catch (error) {
            console.error('Error registering:', error);
        }
    }

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    }, [isLoading]);
    
    return (
        <>
            <h2 className="text-2xl text-white font-semibold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">Email</label>
                        <input type="email" id="email" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white block mb-2">Username</label>
                        <input type="text" id="username" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-2">Password</label>
                        <input type="password" id="password" className="w-full bg-gray-700 text-white rounded px-3 py-1" pattern=".{6,}" title="Password must have at least 6 characters"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="text-white block mb-2">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="w-full bg-gray-700 text-white rounded px-3 py-1" pattern=".{6,}" title="Password must have at least 6 characters"/>
                    </div>
                    
                    <button type="submit" className="w-full cursor-pointer bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-2 mb-3">
                        Đăng ký
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="text-white">You already have an account?</div>
                        <a href="/auth/login" className="text-red-500">Login</a>
                    </div>
                </form>
                {isLoading && <Loading />}
        </>
    );
};

export default Register;