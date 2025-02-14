import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-400">
            <div className="w-96 bg-gray-800 p-8 rounded-lg">
                <Outlet/>
            </div>
        </div>
    );
}

export default AuthLayout;