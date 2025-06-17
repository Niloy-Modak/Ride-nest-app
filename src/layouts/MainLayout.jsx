import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main className="min-h-[calc(100vh-306px)] mt-[84px]">
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default MainLayout;