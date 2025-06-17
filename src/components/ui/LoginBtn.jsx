import React from 'react';

const LoginBtn = ({ label, type, onClick, ClsName }) => {
    return (
        <button 
        onClick={onClick}
        type={type}
        className={`relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium cursor-pointer text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-red-500 ${ClsName}`}>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-800 via-orange-600 to-orange-800"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-red-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white">
                {label}
            </span>
        </button>
    );
};

export default LoginBtn;