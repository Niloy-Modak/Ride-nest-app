import React from 'react';
import ToyotaLogo from '../../assets/toyota-logo.png'
import FordLogo from '../../assets/ford-logo.png'
import MercedLogo from '../../assets/marcedes-log.png'
import JeepLogo from '../../assets/jeep-logo.png'
import BmwLogo from '../../assets/bmw-logo.png'
import AudiLogo from '../../assets/audi-logo.png'

const ExtraSectionIII = () => {
    return (
        <section>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8
             bg-red-50 p-10  rounded-2xl shadow-2xs 
             mb-8 md:mb-10 lg:mb-14 '>
                <img src={ToyotaLogo} alt="" />
                <img src={FordLogo} alt="" />
                <img src={MercedLogo} alt="" />
                <img src={JeepLogo} alt="" />
                <img src={BmwLogo} alt="" />
                <img src={AudiLogo} alt="" />
            </div>
        </section>
    );
};

export default ExtraSectionIII;