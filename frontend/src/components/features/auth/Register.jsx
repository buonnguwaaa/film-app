import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../../../services/authService";
import useAuthStore from "../../../store/authStore";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuthStore();

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
        try {
            const data = await RegisterAPI(email, username, password);
            console.log(data);
            const dataUser = {
                id: data.id,
                email: data.email,
            }
            register(dataUser);
            navigate('/auth/verification');
        } catch (error) {
            console.error('Error registering:', error);
        }
    }
    return (
        <>
                <h2 className="text-2xl text-white font-semibold mb-4">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">Email</label>
                        <input type="email" id="email" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white block mb-2">Tên người dùng</label>
                        <input type="text" id="username" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-2">Mật khẩu</label>
                        <input type="password" id="password" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="text-white block mb-2">Xác nhận mật khẩu</label>
                        <input type="password" id="confirmPassword" className="w-full bg-gray-700 text-white rounded px-3 py-1" />
                    </div>
                    
                    <button type="submit" className="w-full cursor-pointer bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-2 mb-3">
                        Đăng ký
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="text-white">Bạn đã có tài khoản?</div>
                        <a href="/auth/login" className="text-red-500">Đăng nhập</a>
                    </div>
                </form>
            </>
    );
};

export default Register;