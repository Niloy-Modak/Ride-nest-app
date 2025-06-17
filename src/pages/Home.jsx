import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import ExtraSectionI from '../components/Extra/ExtraSectionI';
import ExtraSectionII from '../components/Extra/ExtraSectionII';
import ExtraSectionIII from '../components/Extra/ExtraSectionIII';
import { useLoaderData } from 'react-router';
import RecentAdded from '../components/RecentAdded';
import Discount from '../components/Discount';

const Home = () => {
    useEffect(() => {
            document.title = 'Home';
        }, []);
    
    const allVehiclesData = useLoaderData()
    
    return (
        <section>
            <Banner/>
            <ExtraSectionI/>
            <RecentAdded allVehiclesData={allVehiclesData}/>
            <ExtraSectionII/>
            <Discount/>
            <ExtraSectionIII/>
        </section>
    );
};

export default Home;