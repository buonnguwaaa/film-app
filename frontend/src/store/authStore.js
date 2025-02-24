import { create } from 'zustand';

const useAuthStore = create((set) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token; // Kiểm tra sự tồn tại của token

    return {
        isLoggedIn,
        user: null,
        login: (userId) => set({ isLoggedIn: true, user: userId }),
        logout: () => {
            localStorage.removeItem('token');
            set({ isLoggedIn: false, user: null });
        }
    };
});

export default useAuthStore;