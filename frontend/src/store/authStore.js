import { create } from 'zustand';

const useAuthStore = create((set) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!token; 
    
    return {
        isLoggedIn,
        user: user || {},
        login: (userData) => set({ isLoggedIn: true, user: userData }),
        register: (userData) => {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(userData));
            set({ isLoggedIn: false, user: userData });
        },
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ isLoggedIn: false, user: {} });
        }
    };
});

export default useAuthStore;