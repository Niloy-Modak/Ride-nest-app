import React, { useEffect } from 'react';
import { Link, useRouteError } from 'react-router';
import Footer from '../components/Footer';
import errorImg from '../assets/error-img.png';
import Navbar from '../components/Navbar';


const ErrorPage = () => {
    const error = useRouteError()
    useEffect(()=>{
            document.title= 'error ! Page is not found !'
        })

    return (
        <div>
            <Navbar/>

            <div className='py-24 min-h-[calc(100vh-190px)]'>
                <div className='flex flex-col md:flex-row justify-center items-center'>
                    <div className='px-4 text-center'>
                        
                        <h1 className='mb-8  text-7xl font-bold text-primary text-shadow-2xs'>
                           Oops! {error?.status || 404}
                        </h1>
                        <p className='text-2xl md:text-3xl text-secondary font-semibold py-4 text-shadow-xs'>Page is not found !</p>
                        <p className='md:mb-12 mb-8 text-xl font-semibold text-red-300 md:text-2xl'>
                            {error?.error?.message || 'Something Went Wrong!'}
                        </p>
                    </div>

                    <div >
                        <img src={errorImg} className='w-[768px]' alt="" />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Link to='/'>
                        <button className='btn bg-primary text-red-50 rounded-xl'>Go to Home page</button>
                    </Link>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;