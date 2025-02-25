import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const AuthLayout = () => {
    const { isLoggedIn, user } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Nếu user đã đăng nhập thì chuyển hướng về trang chủ
        if (isLoggedIn) {
            navigate('/');
        }
        // Tránh trường hợp user không tồn tại trong localStorage mà vẫn truy cập vào trang verification
        if (location.pathname === '/auth/verification' && (!user || Object.keys(user).length === 0) ) {
            console.log('User is null or empty');
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
    
    // Thêm điều kiện này để tránh auth layout mount
    if (isLoggedIn) { 
    } 
    else if (location.pathname === '/auth/verification' && (!user || Object.keys(user).length === 0)) {
        return null;
    }
    else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[url(/bg-login.jpg)] bg-cover bg-center relative">
                <div className="absolute w-full h-full top-0 left-0 opacity-30 bg-gradient-to-r from-gray-900 to-gray-400"></div>
                <div className="w-96 bg-gray-800 p-6 rounded-lg z-10">
                    <Outlet/>
                </div>
            </div>
        );
    }
}

export default AuthLayout;