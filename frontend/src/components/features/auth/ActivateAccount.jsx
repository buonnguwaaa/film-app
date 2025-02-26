import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Loading from '../../common/Loading';

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
                // Call API to activate account
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
                    setMessage('Your account has been successfully activated! Please log in.');
                } else {
                    setIsSuccess(false);
                    setMessage(data.message || 'An error occurred while activating the account.');
                }
            } catch (error) {
                setIsSuccess(false);
                setMessage('An error occurred while connecting to the server.');
            } finally {
                setIsLoading(false);
            }
        };

        activateAccount();
    }, [token]);

    return (
        <div className="text-center h-[155px]">
            <h2 className="text-2xl font-bold text-white mb-4">Activate Account</h2>
            {isLoading ? (
                <Loading />
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