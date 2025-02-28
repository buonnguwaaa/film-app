import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    
    if (token && userId && username && email) {
      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      
      // Tạo user object
      const user = {
        id: userId,
        username: username,
        email: email
      };
      
      // Lưu user vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Gọi hàm login từ store
      login(user);
      
      // Chuyển hướng về trang chính
      navigate('/');
    } else {
      // Xử lý lỗi
      navigate('/auth/login?error=invalid_oauth_response');
    }
  }, [searchParams, login, navigate]);
  
  return (
    <></>
  );
};

export default OAuthCallback;