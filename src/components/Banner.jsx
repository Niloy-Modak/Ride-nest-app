import React from 'react';
import BannerImg from '../assets/banner.png'
import ButtonI from './ui/ButtonI';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='w-[90%] mx-auto '>

            <div className='h-[618px] lg:h-[685px] bg-cover bg-center 
            flex flex-col gap-8
            justify-center items-center 
            rounded-3xl md:rounded-4xl shadow-xs'
                style={{
                    backgroundImage: `linear-gradient(0deg, rgb(16,16,16) -19.5%, rgba(16,16,16,0) 100%), url(${BannerImg})`
                }}
            >
                <h1 className=' text-4xl md:text-5xl lg:text-6xl text-center font-bold text-[#fff6f6dc]'>
                    Find Your Perfect Ride Today!
                </h1>

                <Link to='/available-cars'>
                    <ButtonI label='Find Your car' />
                </Link>

            </div>
        </div>
    );
};

export default Banner;