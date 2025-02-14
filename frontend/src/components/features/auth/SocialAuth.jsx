import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';


const SocialAuth = () => {
    return (
        <>
            <div className="flex items-center my-2">
                    <div className="flex-1 border-t border-gray-600"></div>
                    <span className="px-4 text-gray-400">Or</span>
                    <div className="flex-1 border-t border-gray-600"></div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <button className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <FcGoogle className="text-xl" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                        <FaFacebook className="text-xl" />
                    </button>
                </div>
        </>
    );
}

export default SocialAuth;