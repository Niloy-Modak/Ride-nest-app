import React, { useState, useEffect, useRef, use } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import MainLogo from "../assets/logo.png"
import { Link, NavLink, useNavigate } from 'react-router';
import LoginBtn from './ui/LoginBtn';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const { user, logOut } = use(AuthContext)
    const navigate = useNavigate()

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
                            navigate('/')
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50" ref={navbarRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        {/* website logo */}
                        <img className='w-12' src={MainLogo} alt="" />

                        {/* title */}
                        <h1 className="tex-xl lg:text-2xl font-bold ">
                            <span className='text-primary'>Ride</span><span className='text-secondary'>Nest</span>
                        </h1>

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-8 items-center ">
                        {
                            user ?
                                (

                                    <ul className='menu menu-horizontal'>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/available-cars' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                Available Cars
                                            </NavLink>
                                        </li>


                                        <li className='lg:mx-1'>
                                            <NavLink to='/add-car' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                Add Car
                                            </NavLink>
                                        </li>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/my-cars' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                My Cars
                                            </NavLink>
                                        </li>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/my-bookings' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                My Bookings
                                            </NavLink>
                                        </li>
                                    </ul>
                                )
                                :
                                (
                                    <ul className='menu menu-horizontal'>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className='lg:mx-1'>
                                            <NavLink to='/available-cars' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4" : ""}`}>
                                                Available Cars
                                            </NavLink>
                                        </li>
                                    </ul>
                                )
                        }

                    </div>

                    {/* Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">

                        {
                            user ?
                                (
                                    <div className='flex justify-center items-center gap-4'>
                                        <img className='w-12 h-12 rounded-full object-cover hover:scale-105 transition-all cursor-pointer' src={user.photoURL} alt="" />

                                        {/* logout */}
                                        <LoginBtn label="Logout" onClick={handleLogout} ClsName="h-10" />
                                    </div>

                                )
                                :
                                (
                                    <Link to='/auth/login'>
                                        <LoginBtn label="Login" ClsName="h-10" />
                                    </Link>
                                )
                        }

                    </div>


                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex gap-2">
                        {user && user.photoURL ? (
                            <img
                                className="w-11 h-11 rounded-full object-cover hover:scale-105 transition-all cursor-pointer"
                                src={user?.photoURL}
                                alt="User Profile"
                            />
                        ) : (
                            <span></span>
                        )}


                        <button onClick={toggleMenu}>
                            {isOpen ? <FiX className='cursor-pointer' size={24} /> : <FiMenu className='cursor-pointer' size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white px-4 py-6 space-y-4">
                    <ul className='menu  dropdown-content w-full '>
                        <li className='lg:mx-1 text-lg'>
                            <NavLink to='/' className={({ isActive }) => ` ${isActive ? "text-primary font-semibold rounded-none border-b-4 md:border-none" : ""}`}>
                                Home
                            </NavLink>
                        </li>
                        <li className='lg:mx-1 text-lg'>
                            <NavLink to='/available-cars' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4 md:border-none" : ""}`}>
                                Available Cars
                            </NavLink>
                        </li>
                        <li className='lg:mx-1 text-lg'>
                            <NavLink to='/add-car' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4 md:border-none" : ""}`}>
                                Add Car
                            </NavLink>
                        </li>
                        <li className='lg:mx-1 text-lg'>
                            <NavLink to='/my-cars' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4 md:border-none" : ""}`}>
                                My Cars
                            </NavLink>
                        </li>
                        <li className='lg:mx-1 text-lg '>
                            <NavLink to='/my-bookings' className={({ isActive }) => `${isActive ? "text-primary font-semibold rounded-none border-b-4 md:border-none" : ""}`}>
                                My Bookings
                            </NavLink>
                        </li>
                    </ul>

                    {
                        user ?
                            (
                                <div className='flex justify-center items-center gap-4'>

                                    {/* logout */}
                                    <LoginBtn ClsName='w-full md:w-[88px] ' onClick={handleLogout} label="Logout" />
                                </div>

                            )
                            :
                            (
                                <Link to='/auth/login'>
                                    <LoginBtn ClsName='w-full md:w-[88px] ' label="Login" />
                                </Link>
                            )
                    }
                </div>
            )}
        </nav>
    );
};

export default Navbar;