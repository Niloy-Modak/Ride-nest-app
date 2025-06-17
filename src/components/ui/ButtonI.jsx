import React from 'react';

const ButtonI = ({ label, type, onClick }) => {
    return (
        <button
        onClick={onClick}
        type={type}
        className="relative inline-flex items-center justify-center p-4 px-5 py-3
             overflow-hidden font-medium text-[#f53900c7] cursor-pointer
             transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1
              hover:ring-[#fb2c36ce]">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#d86e03d8]
                 via-[#fd2f39d5]
                 to-[#9f0711e5]"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#fb2c36cc] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-[#fff6f6dc]">
                {label}
            </span>
        </button>
    );
};

export default ButtonI;