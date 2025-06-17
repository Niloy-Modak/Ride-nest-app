import React, { useEffect, useState, use } from 'react';
import dayjs from 'dayjs';
import ButtonII from '../ui/ButtonII';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const ModifyDate = ({ selectedModify, onClose}) => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const userEmail = user?.email || '';
    const rent = selectedModify?.rent || 0;

    const today = dayjs().format('YYYY-MM-DD');

    const [fromDate, setFromDate] = useState(dayjs(selectedModify?.fromDate).format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(dayjs(selectedModify?.toDate).format('YYYY-MM-DD'));
    const [totalRent, setTotalRent] = useState(selectedModify?.totalRent || 0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (fromDate && toDate) {
            const start = dayjs(fromDate);
            const end = dayjs(toDate);

            if (end.isBefore(start)) {
                setError("End date must be after start date.");
                setTotalRent(0);
                return;
            }

            setError('');
            const days = end.diff(start, 'day') + 1;
            setTotalRent(days * rent);
        } else {
            setTotalRent(0);
        }
    }, [fromDate, toDate, rent]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fromDate || !toDate) {
            setError('Please select both dates.');
            return;
        }

        const updatedData = {
            fromDate,
            toDate,
            totalRent,
        };

        const customerEmail = selectedModify?.customerEmail;

        if (userEmail !== customerEmail) {
            return Swal.fire({
                title: "Unauthorized!",
                text: "You are not allowed to update this booking.",
                icon: "error"
            });
        }

        axios.put(
            `https://ride-next-server.vercel.app/modify-booking/${selectedModify._id}?email=${userEmail}`,
            updatedData
        )
            .then((res) => {
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: "Modify Successful!",
                        text: "Your booking date was modified successfully.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        onClose()
                        navigate(`/my-bookings`);  
                        location.reload()
                    });
                } else {
                    Swal.fire({
                        title: "No Changes",
                        text: "Nothing was modified.",
                        icon: "info"
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating booking:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while updating.",
                    icon: "error"
                });
            });
    };

    return (
        <div className="p-2 md:p-4 space-y-4">
            <h2 className="text-xl font-bold">Modify Booking Dates</h2>
            <div>
                <h1 className='text-lg font-semibold text-gray-600 '><span className='text-primary'>Car name : </span> <span className='border-b border-dashed'>{selectedModify.carName}</span></h1>
                <h1 className='text-lg font-semibold text-gray-600'><span className='text-primary'>Per day rent : </span> <span className='border-b border-dashed '>$ {selectedModify.rent}</span> </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">From Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={fromDate}
                        min={today}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">To Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={toDate}
                        min={fromDate || today}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium">
                        Total Rent: <span className="font-bold">$ {totalRent}</span>
                    </p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <ButtonII label="Save Changes" type="submit" />
            </form>
        </div>
    );
};

export default ModifyDate;
