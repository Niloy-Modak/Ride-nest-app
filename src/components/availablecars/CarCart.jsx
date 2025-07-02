import React from 'react';
import { FaLocationArrow, FaDollarSign } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { TbGpsFilled } from "react-icons/tb";
import AcImg from '../../assets/ac-logo.png';
import ButtonII from '../ui/ButtonII';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const CarCart = ({ car, viewMode = 'grid' }) => {
    const { _id, carName, features, image, location, rent, availability } = car;
    const isList = viewMode === 'list';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
            }}
            className={`bg-red-50 p-4 lg:p-8 rounded-2xl shadow-md transition-all duration-300 ${isList ? 'flex gap-4 items-start' : 'flex flex-col justify-between'}`}
        >
            {/* Car Image */}
            <div className={`${isList ? 'w-22 h-22 md:w-40 md:h-28  flex-shrink-0' : 'w-full h-[260px]'} overflow-hidden rounded-lg`}>
                <img
                    src={image}
                    alt={carName}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Details */}
            <div className={`flex flex-col justify-between ${isList ? 'flex-1' : 'mt-4 space-y-4'}`}>
                <div className="flex justify-between">
                    <div>
                        <h1 className={`font-semibold ${isList ? 'md:text-xl' : 'text-xl md:text-2xl'}`}>{carName}</h1>
                        <p className={`flex items-center text-gray-700 ${isList ? 'text-xs md:text-sm' : 'text-sm'}`}>
                            <FaLocationArrow className="mr-1" /> {location}
                        </p>
                    </div>
                    <div className="text-right">
                        <h2 className={`font-medium text-secondary flex items-center justify-end ${isList ? 'md:text-xl' : 'text-xl md:text-2xl'}`}>
                            <FaDollarSign className="mr-1" /> {rent}
                        </h2>
                        <p className={`text-gray-500 ${isList ? 'text-xs md:text-sm' : 'text-sm'}`}>Per day</p>
                    </div>
                </div>

                {/* Features */}
                <div className={`grid gap-2 mt-2 ${isList ? 'grid-cols-2 hidden' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                    {features.map((feature, index) => (
                        <React.Fragment key={index}>
                            {feature.includes("GPS") && (
                                <p className="flex items-center gap-2 text-sm">
                                    <TbGpsFilled size={18} />
                                    <span>GPS</span>
                                </p>
                            )}
                            {feature.includes("AC") && (
                                <p className="flex items-center gap-2 text-sm">
                                    <img className="w-5" src={AcImg} alt="AC" />
                                    <span>AC</span>
                                </p>
                            )}
                            {feature.includes("WiFi") && (
                                <p className="flex items-center gap-2 text-sm">
                                    <IoIosWifi size={18} />
                                    <span>WiFi</span>
                                </p>
                            )}
                            {feature.includes("TV") && (
                                <p className="flex items-center gap-2 text-sm">
                                    <MdLiveTv size={18} />
                                    <span>TV</span>
                                </p>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* View Details Button */}
                <div className={`${isList ? 'mt-4 flex justify-between items-center' : ''}`}>
                    <button className={`${isList ? 'p-1 px-2 md:px-4 cursor-pointer text-xs md:text-base rounded-full text-white bg-green-500' : 'hidden'}`}>
                        {availability}
                    </button>
                    <div className={`${isList ? 'hidden md:block' : ''}`}>
                        <Link to={`/car-details/${_id}`}>
                            <ButtonII ClsName={`${isList ? 'text-xs' : 'w-full'}`} label="Book Now" />
                        </Link>
                    </div>
                    <Link
                        to={`/car-details/${_id}`}
                        className={`${isList ? 'md:hidden' : 'hidden'} bg-primary hover:bg-red-600 py-2 px-3 text-white text-sm rounded-full cursor-pointer`}
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCart;
