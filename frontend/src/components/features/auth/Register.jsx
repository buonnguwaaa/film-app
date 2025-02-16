const Register = () => {
    return (
        <>
                <h2 className="text-2xl text-white font-semibold mb-4">Đăng ký</h2>
                <form>
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
                    
                    <button className="w-full cursor-pointer bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-2 mb-3">
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