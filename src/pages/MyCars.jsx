import React, { useEffect, useState, use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { MdOutlineDeleteForever, MdOutlineViewHeadline } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import dayjs from 'dayjs';
import UpdateModal from '../components/ui/UpdateModal';
import UpdateMyCars from '../components/mycars/UpdateMyCars';

import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../components/ui/Loading';
import { Link } from 'react-router';

const MyCars = () => {
    const { user } = use(AuthContext);
    const userEmail = user?.email;
    const [myCars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isUpdateModal, setUpdateModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        document.title = 'My Cars';
    }, []);

    useEffect(() => {
        if (user && user.email) {
            user.getIdToken()
                .then((token) => {
                    return fetch(`https://ride-next-server.vercel.app/my-vehicles/${user.email}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                })
                .then((res) => res.json())
                .then((data) => {
                    setCars(data);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = (car) => {
        const { _id, email } = car;

        if (userEmail !== email) {
            return Swal.fire({
                title: "Unauthorized!",
                text: "You are not allowed to delete this vehicle.",
                icon: "error"
            });
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e65619",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://ride-next-server.vercel.app/vehicle/${_id}?email=${userEmail}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Car data has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(() => {
                                setCars(prev => prev.filter(c => c._id !== _id));
                            });
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: "Something went wrong, delete failed.",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong with the server.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className='mx-auto mb-10 md:mb-12 lg:mb-18'>
            <h1 className='text-3xl lg:text-4xl font-bold text-center my-6 md:my-8'>My Cars</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="">
                    <table className="table space-y-4 md:w-[90%] mx-auto">
                        <thead>
                            <tr className='bg-gray-100'>
                                <th>Name</th>
                                <th className='md:hidden'>View Details</th>
                                <th className='hidden md:table-cell'>Daily Rental Price</th>
                                <th className='hidden md:table-cell'>bookingCount</th>
                                <th className='hidden md:table-cell'>Availability</th>
                                <th className='hidden md:table-cell'>Date Added</th>
                                <th className='text-center'>Update/Delete</th>
                            </tr>
                        </thead>

                        <tbody className='h-[72px] p-0'>
                            {myCars.map(car =>
                                <tr key={car._id} className='bg-red-50 p-4'>
                                    <td>
                                        <Link to={`/car-details/${car._id}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="rounded-[4px] h-14 w-14">
                                                        <img src={car.image} alt={car.carName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{car.carName}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td className='md:hidden'>
                                        <div className='flex items-center justify-center'>
                                            <Link to={`/car-details/${car._id}`}>
                                                <button className='p-2 rounded-lg flex justify-center items-center gap-1
                                                    bg-green-300 hover:bg-green-500 hover:text-white text-green-800'>
                                                    <MdOutlineViewHeadline size={24} />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>

                                    <td className="hidden md:table-cell">
                                        $ {car.rent}
                                    </td>

                                    <td className='hidden md:table-cell'>
                                        {car.bookingCount}
                                    </td>

                                    <td className='hidden md:table-cell'>
                                        {car.availability}
                                    </td>

                                    <td className='hidden md:table-cell'>
                                        <p>{dayjs(car.createdAt).format('DD-MM-YYYY, h:mm A')}</p>
                                    </td>

                                    <td>
                                        <div className='flex justify-center items-center gap-2'>
                                            <button
                                                onClick={() => {
                                                    setSelectedCar(car);
                                                    setUpdateModal(true);
                                                }}
                                                className='p-2 rounded-lg flex justify-center items-center gap-1
                                                    bg-sky-300 hover:bg-sky-500 hover:text-white text-blue-800'>
                                                <TiEdit size={24} /> <span className='font-medium hidden lg:block'>Update</span>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(car)}
                                                className="p-2 rounded-lg flex justify-center items-center gap-1 text-white hover:bg-red-600 bg-red-500">
                                                <MdOutlineDeleteForever size={24} /> <span className='hidden lg:block'>Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <UpdateModal
                cls='lg:w-[1168px] md:w-[668px] w-[88%] mx-auto bg-red-50 p-6 md:p-8 lg:p-12 rounded-2xl'
                isOpen={isUpdateModal}
                onClose={() => setUpdateModal(false)}
            >
                <UpdateMyCars car={selectedCar} onClose={() => setUpdateModal(false)} />
            </UpdateModal>
        </div>
    );
};

export default MyCars;
