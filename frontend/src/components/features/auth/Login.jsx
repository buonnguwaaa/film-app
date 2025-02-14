const Login = () => {
    return (
        <>
            <h2 className="text-2xl text-white font-semibold mb-4">Đăng Nhập</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="email" className="text-white block mb-2">Email</label>
                    <input type="email" id="email" className="w-full bg-gray-700 text-white rounded px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-white block mb-2">Mật khẩu</label>
                    <input type="password" id="password" className="w-full bg-gray-700 text-white rounded px-3 py-2" />
                </div>
                
                <button className="w-full cursor-pointer bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-2 mb-3">Đăng nhập</button>
                <div className="flex items-center justify-between">
                    <div className="text-white">Bạn chưa có tài khoản?</div>
                    <a href="/register" className="text-red-500">Đăng ký</a>
                </div>
            </form>
        </>
    );
}

export default Login;