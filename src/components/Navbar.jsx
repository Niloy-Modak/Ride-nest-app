import React, { useState, useEffect, useRef, use } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import MainLogo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from 'react-router';
import LoginBtn from './ui/LoginBtn';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const { user, logOut } = use(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e65619",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged out successfully',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate('/');
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Logout Failed',
                            text: error.message || 'Something went wrong'
                        });
                    });
            }
        });
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="bg-white w-full fixed top-0 left-0 z-50 " ref={navbarRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img className='w-12' src={MainLogo} alt="Logo" />
                        <h1 className="text-xl lg:text-2xl font-bold">
                            <span className='text-primary'>Ride</span><span className='text-secondary'>Nest</span>
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        {user ? (
                            <ul className='menu menu-horizontal'>
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/available-cars', label: 'Available Cars' },
                                    { to: '/add-car', label: 'Add Car' },
                                    { to: '/my-cars', label: 'My Cars' },
                                    { to: '/my-bookings', label: 'My Bookings' }
                                ].map(({ to, label }) => (
                                    <li key={to} className='lg:mx-1'>
                                        <NavLink
                                            to={to}
                                            className={({ isActive }) =>
                                                isActive ? "text-primary font-semibold border-b-4" : ""
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className='menu menu-horizontal'>
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/available-cars', label: 'Available Cars' }
                                ].map(({ to, label }) => (
                                    <li key={to} className='lg:mx-1'>
                                        <NavLink
                                            to={to}
                                            className={({ isActive }) =>
                                                isActive ? "text-primary font-semibold border-b-4" : ""
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="hidden lg:flex items-center space-x-3 ">
                        {user ? (
                            <div className='flex justify-center items-center gap-4'>
                                <img
                                    className='w-12 h-12 rounded-full object-cover hover:scale-105 transition-all cursor-pointer'
                                    src={user.photoURL}
                                    alt="User"
                                />
                                <LoginBtn label="Logout" onClick={handleLogout} ClsName="h-10" />
                            </div>
                        ) : (
                            <Link to='/auth/login'>
                                <LoginBtn label="Login" ClsName="h-10" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex gap-2">
                        {user?.photoURL && (
                            <img
                                className="w-11 h-11 rounded-full object-cover hover:scale-105 transition-all cursor-pointer"
                                src={user.photoURL}
                                alt="User"
                            />
                        )}
                        <button onClick={toggleMenu}>
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <div
                className={`lg:hidden bg-white px-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] py-6 opacity-100 shadow-md" : "max-h-0 py-0 opacity-0"
                    }`}
            >
                {user ? (
                    <ul className='menu w-full dropdown-content space-y-2'>
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/available-cars', label: 'Available Cars' },
                            { to: '/add-car', label: 'Add Car' },
                            { to: '/my-cars', label: 'My Cars' },
                            { to: '/my-bookings', label: 'My Bookings' }
                        ].map(({ to, label }) => (
                            <li key={to} className="text-lg w-full">
                                <NavLink
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block w-full px-4 py-2 rounded-md transition-all text-right ${isActive ? "text-primary font-bold bg-red-50 " : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>

                        ))}
                    </ul>
                ) : (
                    <ul className='menu w-full dropdown-content space-y-2'>
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/available-cars', label: 'Available Cars' }       
                        ].map(({ to, label }) => (
                            <li key={to} className="text-lg w-full">
                                <NavLink
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block w-full px-4 py-2 rounded-md transition-all text-right ${isActive ? "text-primary font-bold bg-red-50 " : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>

                        ))}
                    </ul>
                )}

                {user ? (
                    <div className='flex justify-end items-center gap-4 mt-4'>
                        <LoginBtn ClsName='w-full md:w-[88px]' onClick={handleLogout} label="Logout" />
                    </div>
                ) : (
                    <div>
                        <Link to='/auth/login' className='md:hidden' onClick={() => setIsOpen(false)}>
                            <LoginBtn ClsName='w-full md:w-[88px] mt-4' label="Login" />
                        </Link>
                        <div className='md:flex justify-end w-full items-center gap-4 mt-4 hidden'>
                            <Link to='/auth/login' onClick={() => setIsOpen(false)}>
                                <LoginBtn ClsName='w-full md:w-[88px] mt-4' label="Login" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
