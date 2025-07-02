import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTop from '../components/ui/ScrollTop';

const MainLayout = () => {
    return (
        <>
            <ScrollTop/>
            <header>
                <Navbar/>
            </header>
            <main className="min-h-[calc(100vh-306px)] mt-[68px] max-w-screen-2xl mx-auto px-4 md:px-6">
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default MainLayout;