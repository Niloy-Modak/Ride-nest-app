import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import dayjs from 'dayjs';
import ButtonII from './ui/ButtonII';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const CarRentCart = ({ rent, carId, onClose  }) => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email || '';
    const navigate = useNavigate();

    const today = dayjs().format('YYYY-MM-DD');

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState('');
    const [totalRent, setTotalRent] = useState(0);
    const [error, setError] = useState('');

    //  Auto calculate rent whenever fromDate or toDate changes
    useEffect(() => {

        if (fromDate && toDate) {
            const start = dayjs(fromDate);
            const end = dayjs(toDate);
            if (end.isBefore(start)) {
                setTotalRent(0);
                return;
            }
            const days = end.diff(start, 'day') + 1;
            setTotalRent(days * rent);
        } else {
            setTotalRent(0);
        }
    }, [fromDate, toDate, rent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!fromDate || !toDate) return setError('Please select both dates');

        const start = dayjs(fromDate);
        const end = dayjs(toDate);

        if (end.isBefore(start)) {
            return setError('To Date cannot be before From Date.');
        }

        const rentInfo = {
            carId,
            customerEmail: userEmail,
            fromDate,
            toDate,
            totalRent,
            BookingStatus: 'Confirmed',
            createdAt: new Date()
        };

        // console.log(rentInfo);

        axios.post('https://ride-next-server.vercel.app/rent-cars', rentInfo)
            .then((res) => {
                // console.log(res);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Rent Successful!",
                        text: "Your book a car successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        onClose()
                        navigate(`/my-bookings`)
                        location.reload()
                    });
                }
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });


    };

    return (
        <div className="p-4">
            <div className="bg-white rounded-lg w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date Range</h3>
                <div>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="from-date" className="block text-sm font-medium text-gray-700 mb-1">
                            From Date
                        </label>
                        <input
                            type="date"
                            id="from-date"
                            value={fromDate}
                            min={today}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="to-date" className="block text-sm font-medium text-gray-700 mb-1">
                            To Date
                        </label>
                        <input
                            type="date"
                            id="to-date"
                            value={toDate}
                            min={fromDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Live Total Rent Display */}
                    <div>
                        <p className="text-xl font-semibold text-primary py-4">
                            Total Rent: ${totalRent}
                        </p>
                    </div>
                    <input type="text" name="BookingStatus" defaultValue="Confirmed" hidden />

                    {error && <p className="text-red-500">{error}</p>}

                    <ButtonII type="submit" label='Submit' ClsName='w-full' />

                    {/* <button
                        
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Rent Now
                    </button> */}
                </form>
            </div>
        </div>
    );
};

export default CarRentCart;
