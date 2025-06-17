import React from 'react';
import Logo from '../assets/logo.png';

const Footer = () => {
    return (
        <>
            <footer className=" bg-base-200 mt-12 lg:mt-16">
                <div className="footer sm:footer-horizontal bg-base-200 text-base-content w-[90%] mx-auto p-10">
                                  <aside className='flex items-center'>
                    <img src={Logo} className='w-16 h-16' alt="" />
                    <p className='text-lg font-semibold'>
                        <span className='text-primary'>Ride</span><span className='text-secondary'>Nest</span> Ltd.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Booking car</a>
                    <a className="link link-hover">Rent your car</a>
                    <a className="link link-hover">Better price</a>
                    <a className="link link-hover">24hr Support</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                </div>
  
            </footer>
        </>
    );
};

export default Footer;