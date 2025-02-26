import useAuthStore from "../../../store/authStore";

const Verification = () => {
    const { user } = useAuthStore();
    
    const resendVerificationEmail = async () => {
        try {
            // Call API to resend verification email
            const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({ Email: user.email }),
            });

            if (response.ok) {
                alert('Verification email has been resent. Please check your mailbox.');
            }
            else {
                const data = await response.json();
                alert(data.message || 'Error resending verification email.');
            };
        }
        catch (error) {
            console.error('Error resending verification email:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full rounded-md text-white">
            <h2 className="text-2xl text-white font-semibold mb-4">Verify your account</h2>
            <div className="">We have sent a verification link to:</div>
            <div className="bg-blue-300 rounded-md p-3 my-2 text-black">{user.email}</div>
            <div className="text-center">Please check your mail box and click the verification link to activate your account.</div>
            <div className="w-[90%] flex-1 border-t border-gray-600 my-3"></div>
            <div>Haven't received the email?</div>
            <div className="bg-blue-300 rounded-md p-3 my-2 hover:bg-blue-400 transition-transform duration-300 text-black cursor-pointer" onClick={resendVerificationEmail}>Resend verification email</div>
        </div>
    );
};

export default Verification;