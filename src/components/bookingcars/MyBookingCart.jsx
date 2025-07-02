import React, { use, useEffect, useState } from 'react';
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteForever, MdOutlineViewHeadline } from "react-icons/md";
import Modal from '../ui/Modal';
import dayjs from 'dayjs';
import ModifyDate from './ModifyDate';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../ui/Loading';
import EmptyPageImg from '../../assets/emty-page-logo.png';
import { Link } from 'react-router';
import ButtonII from '../ui/ButtonII';

const MyBookingCart = ({ bookings, loading }) => {
    const { user } = use(AuthContext);
    const userEmail = user?.email || '';

    const [viewDetailsModal, setViewDetailsModal] = useState(false);
    const [modifyDate, setModifyDate] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedModify, setSelectedModify] = useState(null);
    const [bookingList, setBookingList] = useState(bookings);

    useEffect(() => {
        setBookingList(bookings);
    }, [bookings]);

    const handleCancel = (bookingId, userEmail) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (!result.isConfirmed) return;

            axios
                .put(`https://ride-next-server.vercel.app/cancel-booking/${bookingId}`, { customerEmail: userEmail })
                .then((res) => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Canceled!",
                            text: "Your booking has been canceled.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            setBookingList(prev => prev.map(b => b._id === bookingId ? { ...b, BookingStatus: "Canceled" } : b));
                        });
                    } else {
                        Swal.fire({
                            title: "No Changes",
                            text: "Booking was not canceled.",
                            icon: "info",
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error canceling booking:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while canceling.",
                        icon: "error",
                    });
                });
        });
    };

    const filteredBookings = bookingList.filter(book => book?.carName);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : filteredBookings.length === 0 ? (
                <div className="w-full text-center mt-10 min-h-[calc(100vh-222px)] bg-red-50 rounded-2xl shadow-md p-4">
                    <img src={EmptyPageImg} className='w-[368px] mx-auto pt-12 mb-5' alt="" />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">You haven’t Book any cars yet.</h2>
                    <p className='text-lg md:text-xl lg:text-2xl text-secondary text-shadow-2xs py-2 font-medium'>Please, book a car</p>
                    <div className='py-6'>
                        <Link to='/available-cars'>
                            <ButtonII label="Book Your Cars" />
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <table className="table md: space-y-4">
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='pr-0'>Name</th>
                                <th className='md:hidden px-0 mx-0'>View Details</th>
                                <th className='hidden md:table-cell px-1'>Booking Date</th>
                                <th className='hidden md:table-cell px-1'>Start Date</th>
                                <th className='hidden md:table-cell px-1'>End Date</th>
                                <th className='hidden md:table-cell px-1'>Total Price</th>
                                <th className='hidden md:table-cell'>Booking Status</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='h-[72px] p-0'>
                            {filteredBookings.map(book => (
                                <tr key={book._id} className='bg-red-50 p-4'>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="rounded-[4px] h-14 w-14">
                                                    <img src={book.image} alt={book.carName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{book.carName}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='md:hidden mx-0 px-0'>
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={() => {
                                                    setSelectedBooking(book);
                                                    setViewDetailsModal(true);
                                                }}
                                                className='p-2 rounded-lg cursor-pointer flex justify-center items-center gap-1 bg-green-300 hover:bg-green-500 hover:text-white text-green-800 md:hidden'
                                            >
                                                <MdOutlineViewHeadline size={24} />
                                            </button>
                                        </div>
                                    </td>

                                    <td className='hidden md:table-cell pl-0    '>
                                        {dayjs(book.createdAt).format('DD-MM-YYYY, h:mm A')}
                                    </td>

                                    <td className='hidden md:table-cell pl-0'>
                                        {dayjs(book.fromDate).format('DD-MM-YYYY')}
                                    </td>

                                    <td className='hidden md:table-cell pl-0'>
                                        {dayjs(book.toDate).format('DD-MM-YYYY')}
                                    </td>

                                    <td className='hidden md:table-cell md:px-1'>
                                        <p>$ {book.totalRent}</p>
                                    </td>

                                    <td className='hidden md:table-cell'>
                                        {book.BookingStatus === "Confirmed" ? (
                                            <p className='h-9 w-24 flex items-center justify-center rounded-[6px] font-medium text-[16px] text-green-800 bg-green-200'>
                                                {book.BookingStatus}
                                            </p>
                                        ) : (
                                            <p className='h-9 w-24 flex items-center justify-center rounded-[6px] font-medium text-[16px] text-white bg-red-200'>
                                                {book.BookingStatus}
                                            </p>
                                        )}
                                    </td>

                                    <td className='px-0 mx-0 pr-4 '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <button
                                                onClick={() => {
                                                    setModifyDate(true);
                                                    setSelectedModify(book);
                                                }}
                                                className='p-2 rounded-lg cursor-pointer flex justify-center items-center gap-1 bg-sky-300 hover:bg-sky-500 hover:text-white text-blue-800'
                                            >
                                                <TiEdit size={24} /> <span className='font-medium hidden lg:block'>Modify</span>
                                            </button>

                                            <button
                                                onClick={() => handleCancel(book._id, userEmail)}
                                                disabled={book.BookingStatus === "Canceled"}
                                                className={`${book.BookingStatus === "Canceled" ? "bg-red-200 text-gray-600 p-2 rounded-lg cursor-not-allowed flex justify-center items-center gap-1" : "p-2 rounded-lg cursor-pointer flex justify-center items-center gap-1 text-white hover:bg-red-600 bg-red-400"}`}
                                            >
                                                <MdOutlineDeleteForever size={24} /> <span className='hidden lg:block'>Cancel</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={viewDetailsModal} onClose={() => setViewDetailsModal(false)} cls='w-[85%] lg:w-[780px]'>
                {selectedBooking && (
                    <div className='space-y-3'>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className='text-primary'>Booking Date:</span>
                            {dayjs(selectedBooking.createdAt).format('DD-MM-YYYY, h:mm A')}
                        </h2>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className='text-primary'>Start Date:</span>
                            {dayjs(selectedBooking.fromDate).format('DD-MM-YYYY')}
                        </h2>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className='text-primary'>End Date:</span>
                            {dayjs(selectedBooking.toDate).format('DD-MM-YYYY')}
                        </h2>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className='text-primary'>Total Price:</span>
                            <span>${selectedBooking.totalRent}</span>
                        </h2>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <span className='text-primary'>Booking Status:</span>
                            {selectedBooking.BookingStatus === "Confirmed" ? (
                                <p className='h-9 w-24 flex items-center justify-center rounded-[6px] font-medium text-[16px] text-green-800 bg-green-200'>
                                    {selectedBooking.BookingStatus}
                                </p>
                            ) : (
                                <p className='h-9 w-24 flex items-center justify-center rounded-[6px] font-medium text-[16px] text-white bg-red-200'>
                                    {selectedBooking.BookingStatus}
                                </p>
                            )}
                        </h2>
                        <button
                            onClick={() => setViewDetailsModal(false)}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            Done
                        </button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={modifyDate} onClose={() => setModifyDate(false)} cls='w-[85%] lg:w-[780px]'>
                <ModifyDate selectedModify={selectedModify} onClose={() => setModifyDate(false)} />
            </Modal>
        </div>
    );
};

export default MyBookingCart;