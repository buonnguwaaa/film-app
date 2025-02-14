import { useState, useEffect } from 'react';

const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const threshold = 50;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }

            setVisible(
                scrollY < lastScrollY || // Scroll lên
                scrollY < threshold || // Gần đầu trang
                window.innerHeight + scrollY >= document.documentElement.scrollHeight // Cuối trang
            );
            
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDirection]);

    return visible;
};

export default useScrollDirection; 