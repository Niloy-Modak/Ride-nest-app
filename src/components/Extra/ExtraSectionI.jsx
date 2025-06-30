import React from 'react';
import CarLogo from '../../assets/car-logo.png'
import WalletLogo from '../../assets/wallet-logo.png'
import BookingLogo from '../../assets/booking-icon.png'
import { RiCustomerService2Line } from "react-icons/ri";
import { motion } from 'framer-motion';



const ExtraSectionI = () => {
    return (
        <section className='pt-4 pb-12 '>
            <h1 className='text-4xl py-8 text-center font-bold'>
                Why Chose Us?
            </h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>

                <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                }}
                className='bg-red-100 p-6 rounded-xl shadow-2xs cursor-pointer'>
                    <div className='flex flex-col justify-center items-center The Road to Savings Starts Here!'>
                        <img src={CarLogo} alt="" />
                        <h2 className='text-xl py-2 font-semibold'>
                            Wide Variety of Cars
                        </h2>
                    </div>
                    <p className='text-center text-xs md:text-sm'>
                        Choose from an extensive fleet of vehicles to match your style and needs. Whether it's a compact car or a luxury SUV, we have the perfect ride for every journey.
                    </p>
                </motion.div>

                <motion.div initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                }} className='bg-red-100 p-6 rounded-xl shadow-2xs cursor-pointer'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={WalletLogo} alt="" />
                        <h2 className='text-xl py-2 font-semibold The Road to Savings Starts Here!'>
                            Affordable Prices
                        </h2>
                    </div>
                    <p className='text-center text-xs md:text-sm'>
                        The Road to Savings Starts Here! Top Deals. Low Prices. No Compromise.
                    </p>
                </motion.div>

                <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                }}
                className='bg-red-100 p-6 rounded-xl shadow-2xs'>
                    <div className='flex flex-col justify-center items-center cursor-pointer'>
                        <img src={BookingLogo} className='w-16' alt="" />
                        <h2 className='text-xl py-2 font-semibold The Road to Savings Starts Here!'>
                            Easy Booking Process
                        </h2>
                    </div>
                    <p className='text-center text-xs md:text-sm'>
                        Fast and Simple. Book Your Ride in Minutes and Reserve Your Ride the Easy Way. Hassle-Free Booking and  Instant Driving .
                    </p>
                </motion.div>

                <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                }}
                 className='bg-red-100 p-6 rounded-xl shadow-2xs cursor-pointer'>
                    <div className='flex flex-col justify-center items-center'>
                        <RiCustomerService2Line size={64} />
                        <h2 className='text-xl py-2 font-semibold The Road to Savings Starts Here!'>
                            Customer Support
                        </h2>
                    </div>
                    <p className='text-center text-xs md:text-sm'>
                        Support That Never Takes a Day Off. Dedicated Support, Just a Call or Mail us we are for you 24 hours.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ExtraSectionI;