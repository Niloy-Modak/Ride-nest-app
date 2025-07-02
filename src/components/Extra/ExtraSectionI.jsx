import React, { useRef } from 'react';
import CarLogo from '../../assets/car-logo.png';
import WalletLogo from '../../assets/wallet-logo.png';
import BookingLogo from '../../assets/booking-icon.png';
import { RiCustomerService2Line } from "react-icons/ri";
import { motion, useInView } from 'framer-motion';

const cards = [
    {
        title: "Wide Variety of Cars",
        desc: "Choose from an extensive fleet of vehicles to match your style and needs. Whether it's a compact car or a luxury SUV, we have the perfect ride for every journey.",
        icon: <img src={CarLogo} alt="Car logo" />,
    },
    {
        title: "Affordable Prices",
        desc: "The Road to Savings Starts Here! Top Deals. Low Prices. No Compromise.",
        icon: <img src={WalletLogo} alt="Wallet logo" />,
    },
    {
        title: "Easy Booking Process",
        desc: "Fast and Simple. Book Your Ride in Minutes and Reserve Your Ride the Easy Way. Hassle-Free Booking and Instant Driving.",
        icon: <img src={BookingLogo} className='w-16' alt="Booking logo" />,
    },
    {
        title: "Customer Support",
        desc: "Support That Never Takes a Day Off. Dedicated Support, Just a Call or Mail us we are for you 24 hours.",
        icon: <RiCustomerService2Line size={64} />,
    },
];

const ExtraSectionI = () => {
    return (
        <section className='pt-4 pb-12'>
            <h1 className='text-4xl py-8 text-center font-bold'>Why Choose Us?</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                {cards.map((card, index) => {
                    const ref = useRef(null);
                    const isInView = useInView(ref, { once: true, amount: 0.3 });

                    return (
                        <motion.div
                            key={index}
                            ref={ref}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300 },
                            }}
                            className='bg-red-100 p-6 rounded-xl shadow-md cursor-pointer'
                        >
                            <div className='flex flex-col justify-center items-center'>
                                {card.icon}
                                <h2 className='text-xl py-2 font-semibold text-center'>
                                    {card.title}
                                </h2>
                            </div>
                            <p className='text-center text-xs md:text-sm'>{card.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ExtraSectionI;
