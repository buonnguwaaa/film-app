import { useNavigate } from 'react'
import useAuthStore from "../../store/authStore"

const DropDown = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        navigate('/');
    }
    return (
        <div className="flex-col bg-white absolute top-10 -left-20 min-w-[70px] text-start rounded-md shadow-lg py-2">
            <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap">My Profile</div>
            <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap">Settings</div>
            <div className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer whitespace-nowrap" onClick={handleLogout}>Logout</div>
        </div>
    )
}

export default DropDown