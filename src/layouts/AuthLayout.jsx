import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <section>
            <main>
                <Outlet/>
            </main>
        </section>
    );
};

export default AuthLayout;