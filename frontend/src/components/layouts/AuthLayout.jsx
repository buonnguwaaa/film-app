import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[url(/bg-login.jpg)] bg-cover bg-center relative">
            <div className="absolute w-full h-full top-0 left-0 opacity-30 bg-gradient-to-r from-gray-900 to-gray-400"></div>
            <div className="w-96 bg-gray-800 p-6 rounded-lg z-10">
                <Outlet/>
            </div>
        </div>
    );
}

export default AuthLayout;