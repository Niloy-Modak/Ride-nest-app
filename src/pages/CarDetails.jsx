import React, { use, useEffect, useState } from 'react';

import { FaCar } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { TbGpsFilled } from "react-icons/tb";
import AcImg from '../assets/ac-logo.png'
import ButtonII from '../components/ui/ButtonII';
import DorpMenu from '../components/ui/DorpMenu';
import Modal from '../components/ui/Modal';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import CarRentCart from '../components/CarRentCart';


const CarDetails = () => {
    const [isBookingModal, setBookingModal] = useState(false);
    const carDetailData = useLoaderData()

    const { _id, carName, features, image, location, rent, availability, bookingCount, description, carType, email, reg } = carDetailData

    const { user } = use(AuthContext)
    const userEmail = user?.email || '';

    useEffect(() => {
        document.title = `Details of ${carName}`;
    }, [carName]);

    return (
        <section className='flex items-center'>

            <div className='flex flex-col lg:flex-row justify-around gap-8 lg:gap-14 w-[90%] md:w-[85%] mx-auto mb-10 md:my-10 lg:mt-14'>
                {/* image */}
                <div className='flex-1'>
                    <img className='w-[100%] h-[230px] md:h-[380px] rounded-xl object-cover shadow-2xs' src={image} alt="" />
                </div>

                {/* description */}
                <div className='flex-1 bg-red-50 p-6 lg:p-8 space-y-8 rounded-xl shadow-xs'>

                    {/* head name and Three dot options */}
                    <div className='flex justify-between mb-2'>
                        <span>
                            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold lg:font-medium'>
                                {carName}
                            </h1>
                        </span>

                        {/* drop menu for update & delete */}
                        {email === userEmail && (
                            <div className=' top-1 right-1'>
                                <DorpMenu carDetailData={carDetailData} className='' />
                            </div>
                        )}

                    </div>
                    <p className='flex items-center text-sm mt-1.5 space-x-1.5' >
                        <span className='font-semibold'>Location :</span> {location} <FaLocationArrow />
                    </p>

                    <p className='text-gray-500'>
                        {description}
                    </p>

                    <div className='grid grid-cols-2 lg:grid-cols-3 justify-around '>
                        {/* Car type */}
                        <div>
                            <p className='space-x-3  font-medium'>
                                <span className='text-gray-400 '>
                                    Car Type :
                                </span>
                                <span className='text-gray-600'>
                                    {carType}
                                </span>
                            </p>
                        </div>
                            {/* Reg no */}
                        <div>
                            <p className='space-x-3 text-left font-medium flex justify-center items-center'>
                                <span className='text-gray-400 flex justify-center items-center gap-2'>
                                    Reg No :
                                </span>
                                <span className='text-gray-600'>
                                    {reg}
                                </span>
                            </p>
                        </div>

                        {/* total seats */}
                        <div>
                            <p className='space-x-3 font-medium flex justify-center items-center'>
                                <span className='text-gray-400 md:flex justify-center items-center gap-2'>
                                    <FaCar className='hidden md:block'/>  Booking Count :
                                </span>
                                <span className='text-gray-600'>
                                    {bookingCount}
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* ac, gps, wifi */}
                    <div className='grid grid-cols-2 md:grid-cols-4 justify-between gap-4'>

                        {features.map((feature, index) => (
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
                    <div className='mb-2'>
                        {availability === "Available" ? (
                            <button className='p-1 cursor-pointer px-4 rounded-full text-white text-shadow-2xs bg-green-500'>
                                {availability}
                            </button>
                        ) : (
                            <button className='p-1 cursor-pointer px-4 rounded-full text-white text-shadow-2xs bg-red-400'>
                                Unavailable
                            </button>
                        )}
                    </div>



                    <div className='flex justify-between mb-0'>
                        <p className='flex items-center text-2xl font-bold'>
                            $ {rent} / <span className='text-sm ml-1.5 font-medium text-gray-500'>Days</span>
                        </p>

                        {/* rent button */}
                        {availability === "Available" && email !== userEmail && (
                            <ButtonII label='Book Now' onClick={() => setBookingModal(true)} />
                        )}
                        {availability !== "Available" && (
                            <button className='btn cursor-pointer rounded-full text-white text-shadow-2xs bg-red-300'>
                               Sorry Car is Unavailable Now !
                            </button>
                        )}
                    </div>

                </div>

            </div>

            {/* modal booking*/}
            <Modal isOpen={isBookingModal} onClose={() => setBookingModal(false)} cls='w-[85%] lg:w-[780px]' >
                <CarRentCart onClose={() => setBookingModal(false)} rent={rent} carId={_id} />
            </Modal>



        </section >
    );
};

export default CarDetails;