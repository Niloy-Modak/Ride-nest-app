import React from 'react';

const ButtonII = ({ label, type, onClick, ClsName }) => {
    return (
        <button
        onClick={onClick}
        type={type}
        className={`relative inlineFlex cursor-pointer items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-primary rounded-full hover:bg-white shadow-2xs hover:border h-12 border-red-500 group ${ClsName}`}>
            <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-red-600">
                {label}
            </span>
        </button>
    );
};

export default ButtonII;