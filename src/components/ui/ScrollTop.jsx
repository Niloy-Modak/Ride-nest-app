import React from 'react';
import { useEffect } from "react";
import { useLocation } from 'react-router';

const ScrollTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when pathname changes
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
};

export default ScrollTop;