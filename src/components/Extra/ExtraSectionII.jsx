import React from 'react';
import CarImage from '../../assets/mercedes_benz_s_klasse.png'
import CarImage2 from '../../assets/mercedes-benz-img2.jpg'


const ExtraSectionII = () => {
    return (
        <section className=' mt-4 my-12 md:my-8 lg:my-14'>
            <div className='md:grid md:grid-cols-2 flex flex-col justify-around gap-8 md:gap-10 lg:gap-14'>
                <div className=''>

                    <img className=' w-full h-full object-cover rounded-xl block md:hidden lg:block shadow-2xs' src={CarImage} alt="" />
                    <img className=' w-full h-full object-cover rounded-xl hidden md:block lg:hidden shadow-2xs' src={CarImage2} alt="" />
                </div>
                <div className='space-y-5 flex flex-col justify-center'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='bg-primary text-lg font-semibold text-white btn rounded-full w-10 h-10'>1</span>
                            <h1 className='text-lg font-semibold'> Affordable Cars</h1>
                        </div>
                        <p className='text-sm'>
                            Smart Choices, Great Value . Reliable, fuel-efficient, and budget-friendly—perfect for everyday life.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='bg-primary text-lg font-semibold text-white btn rounded-full w-10 h-10'>2</span>
                            <h1 className='text-lg font-semibold'> Luxury Cars</h1>
                        </div>
                        <p className='text-sm' >
                            Drive the Extraordinary.
                            Indulge in premium comfort, cutting-edge tech, and unmatched style on every drive.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='bg-primary text-lg font-semibold text-white btn rounded-full w-10 h-10'>3</span>
                            <h1 className='text-lg font-semibold'> SUVs Cars</h1>
                        </div>
                        <p className='text-sm'>
                            Built for families, adventures, and everything in between.
                            SUVs offer space, strength, and safety without sacrificing comfort.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='bg-primary text-lg font-semibold text-white btn w-10 h-10 rounded-full '>4</span>
                            <h1 className='text-lg font-semibold'> Sports Cars</h1>
                        </div>
                        <p className='text-sm'>
                            Designed for speed lovers and style seekers.
                            Experience high performance, bold design, and adrenaline on every curve.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExtraSectionII;