import useAuthStore from "../../store/authStore";
import DefaultAvatar from "@/assets/images/default-avatar.png";
import PropType from "prop-types";

const AvatarIcon = ({ w, h }) => {
    const { isLoggedIn } = useAuthStore();

    return (
        <>
            {isLoggedIn ? 
                <img src={DefaultAvatar} alt="Avatar" className={`h-${h} w-${w} rounded-full object-cover`} />
                :
                <img src={DefaultAvatar} alt="Avatar" className={`h-${h} w-${w} rounded-full object-cover`} />
            }
        </>
    );
}

AvatarIcon.propTypes = {
    w: PropType.number,
    h: PropType.number
}

export default AvatarIcon;