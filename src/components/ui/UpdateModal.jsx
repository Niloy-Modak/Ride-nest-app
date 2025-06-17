import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const UpdateModal = ({ isOpen, onClose, children, cls }) => {
    
     useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
            
        >
            <div
                className={`bg-white border border-gray-300 rounded-lg p-6 shadow-lg ${cls} mx-auto relative transition-all duration-300 opacity-100 scale-100 max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 hover:scale-105 transition-all text-xl cursor-pointer"
                >
                    <RxCross2 size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default UpdateModal;