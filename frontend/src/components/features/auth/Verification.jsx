import useAuthStore from "../../../store/authStore";

const Verification = () => {
    const { user } = useAuthStore();
    console.log('user: ', user);

    return (
        <div className="flex flex-col items-center justify-center h-full rounded-md text-white">
            <h2 className="text-2xl text-white font-semibold mb-4">Verify your account</h2>
            <div className="">We have sent a verification link to:</div>
            <div className="bg-gray-300 rounded-md p-3 my-2 text-black">{user.email}</div>
            <div className="text-center">Please check your mail box and click the verification link to activate your account.</div>
            <div className="w-[90%] flex-1 border-t border-gray-600 my-3"></div>
            <div>Haven't received the email?</div>
            <div className="bg-gray-300 rounded-md p-3 my-2 text-black cursor-pointer">Resend verification email</div>
        </div>
    );
};

export default Verification;