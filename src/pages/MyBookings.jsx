import React, { use, useEffect, useState } from 'react';
import MyBookingCart from '../components/bookingcars/MyBookingCart';
import { AuthContext } from '../Provider/AuthContext';

const MyBookings = () => {
    const { user } = use(AuthContext)
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        document.title = 'My Booking';
    }, []);

    useEffect(() => {
            if (user && user.email) {
                user.getIdToken()
                    .then((token) => {
                        return fetch(`https://ride-next-server.vercel.app/booking-cars/${user.email}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        setBookings(data);
                        setLoading(false);
                    })
            }
        }, [user]);

    return (
        <div>
            <MyBookingCart loading={loading} bookings={bookings} />
        </div>
    );
};

export default MyBookings;