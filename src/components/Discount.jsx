import React from 'react';
import { motion } from 'framer-motion';

const Discount = () => {
    const offers = [
        {
            title: "Get 15% off on weekend rent cars and enjoy",
            subtitle: "Book now and get this big offer!",
        },
        {
            title: "Free GPS with all luxury car rentals",
            subtitle: "Explore freely with our premium vehicles!",
        },
        {
            title: "Save 20% on your first booking",
            subtitle: "Sign up and get instant discount!",
        },
        {
            title: "Long trip? Get 1 day free on 5-day rent",
            subtitle: "Perfect for family or road trips!",
        },
    ];

    return (
        <div className='w-[94%] md:w-[90%] lg:w-[85%] mx-auto bg-red-50 p-3 md:p-4 lg:p-8 rounded-2xl mb-16'>
            <h1 className='text-3xl text-center font-bold'>SPACIAL OFFER</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {offers.map((offer, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        whileHover={{
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 300 },
                        }}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all h-48 bg-gradient-to-r from-red-500 to-orange-400 text-white "
                    >
                        <h1 className="text-lg font-semibold mb-2">{offer.title}</h1>
                        <p className="text-gray-200">{offer.subtitle}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Discount;
