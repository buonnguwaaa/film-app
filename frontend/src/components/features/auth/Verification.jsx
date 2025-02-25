import useAuthStore from "../../../store/authStore";

const Verification = () => {
    const { user } = useAuthStore();
    console.log('user: ', user);

    return (
        <>
            <h2 className="text-2xl text-white font-semibold mb-4">Verify your account</h2>
            <div>We have sent a verification link to:</div>
            <div>{user.email}</div>
            <div>Please check your email and click the verification link to activate your account.</div>
            <div className="flex-1 border-t border-gray-600"></div>
            <div>Haven't received the email?</div>
            <div>Resend verification email</div>
        </>
    );
};

export default Verification;