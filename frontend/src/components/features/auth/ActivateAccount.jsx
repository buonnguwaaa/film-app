import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ActivateAccount = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    console.log("token: ", token);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const activateAccount = async () => {
            try {
                // Gọi API để kích hoạt tài khoản
                const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/activate?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });
                const data = await response.json();
                
                if (response.ok) {
                    setIsSuccess(true);
                    setMessage('Tài khoản của bạn đã được kích hoạt thành công! Vui lòng đăng nhập.');
                } else {
                    setIsSuccess(false);
                    setMessage(data.message || 'Có lỗi xảy ra khi kích hoạt tài khoản.');
                }
            } catch (error) {
                setIsSuccess(false);
                setMessage('Có lỗi xảy ra khi kết nối với server.');
            } finally {
                setIsLoading(false);
            }
        };

        activateAccount();
    }, [token]);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Kích hoạt tài khoản</h2>
            {isLoading ? (
                <div className="text-white">Đang xử lý...</div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    {isSuccess ? (
                        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                    ) : (
                        <FaTimesCircle className="text-red-500 text-5xl mb-4" />
                    )}
                    <div className="text-white">{message}</div>
                </div>
            )}
        </div>
    );
}

export default ActivateAccount;