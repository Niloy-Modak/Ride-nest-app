import React from 'react';

import { FaLocationArrow } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import ButtonII from '../components/ui/ButtonII';

import { IoIosWifi } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { TbGpsFilled } from "react-icons/tb";
import AcImg from '../assets/ac-logo.png'
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const RecentAdded = ({ allVehiclesData }) => {

    const recentVehicles = [...allVehiclesData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 3)


    return (
        <section className='w-[94%] md:w-[90%] lg:w-[85%] mx-auto bg-red-50 p-3 md:p-4 lg:p-8 rounded-2xl mb-16'>
            <h1 className='text-3xl lg:text-4xl text-center font-bold p-4 pb-8'>Recent Added Cars</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
                {
                    recentVehicles.map(vehicle =>
                        <motion.div initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300 },
                            }}
                            key={vehicle._id} className='flex flex-col justify-between bg-base-100 p-6 lg:p-10 rounded-2xl shadow-xs'>
                            <div className='space-y-8 mb-8'>
                                {/* car image */}
                                <div className='flex items-center justify-center'>
                                    <img className='w-[364ox] h-[260px] object-cover rounded-lg' src={vehicle.image} alt="" />
                                </div>

                                {/* car name & price */}
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-xl lg:text-2xl font-bold lg:font-medium'>
                                            {vehicle.carName}
                                        </h1>
                                        <p className='flex items-center text-sm'>
                                            <FaLocationArrow /> {vehicle.location}
                                        </p>
                                    </div>

                                    <div >
                                        <h1 className='text-2xl font-medium text-secondary flex items-center'>
                                            <FaDollarSign /> {vehicle.rent}
                                        </h1>
                                        <p className='text-sm'>
                                            Per day
                                        </p>
                                    </div>
                                </div>

                                {/* small details */}
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-4'>
                                    {vehicle.features.map((feature, index) => (
                                        <React.Fragment key={index}>
                                            {
                                                feature.includes("GPS") &&
                                                <p className='flex items-center gap-2'>
                                                    <TbGpsFilled size={24} />
                                                    <span>GPS</span>
                                                </p>
                                            }
                                            {feature.includes("AC") && <h1 className='flex items-center gap-2'>
                                                <img className='w-6' src={AcImg} alt="" />
                                                <span>
                                                    AC
                                                </span>
                                            </h1>}
                                            {
                                                feature.includes("WiFi") &&
                                                <h1 className='flex items-center gap-2'>
                                                    <IoIosWifi size={24} /><span>WiFi</span>
                                                </h1>
                                            }
                                            {
                                                feature.includes("TV") &&
                                                <h1 className='flex items-center gap-2'>
                                                    <MdLiveTv size={24} />
                                                    <span>TV</span>
                                                </h1>
                                            }
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>


                            <Link to={`/car-details/${vehicle._id}`}>
                                <ButtonII ClsName="w-full " label="View Details" />
                            </Link>
                        </motion.div>
                    )
                }
            </div>
        </section>
    );
};

export default RecentAdded;