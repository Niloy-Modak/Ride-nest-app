import React, { use } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthContext } from '../../Provider/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const GoogleLoginBtn = () => {
    const { signInWithGoogle, setUser } = use(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                navigate(`${location.state? location.state : "/"}`)
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    };

    return (
        <button onClick={handleGoogleLogin} className='btn text-white bg-black 
        flex items-center justify-between 
        md:text-xs lg:text-sm md:px-8 rounded-full hover:scale-105 transition-all'>
            <FaGoogle /> Sign in with Google <span></span>
        </button>
    );
};

export default GoogleLoginBtn;