import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import ButtonII from '../ui/ButtonII';


const UpdateMyCars = ({car, onClose}) => {
   
    const { _id, carName, image, location, rent, bookingCount, description, reg, email } = car

    const { user } = use(AuthContext);
    const userEmail = user?.email || '';

    const [availabilityOfCar, setAvailability] = useState({ available: false, unavailable: false });
    const [availabilityError, setAvailabilityError] = useState(false);
    const [featuresError, setFeaturesError] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleCheckboxChange = (option) => {
        setAvailability({
            available: option === 'available',
            unavailable: option === 'unavailable',
        });
        setAvailabilityError(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Check availabilityOfCar
        if (!availabilityOfCar.available && !availabilityOfCar.unavailable) {
            setAvailabilityError(true);
            return;
        }

        // Check features
        const selectedFeatures = formData.getAll('features');
        if (selectedFeatures.length === 0) {
            setFeaturesError(true);
            return;
        }

        if (userEmail !== email) {
            return Swal.fire({
                title: "Unauthorized!",
                text: "You are not allowed to update this vehicle.",
                icon: "error"
            });
        }

        const newCarsData = Object.fromEntries(formData.entries());
        newCarsData.features = selectedFeatures;

        axios.put(`https://ride-next-server.vercel.app/vehicle/${_id}?email=${userEmail}`, newCarsData)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Car Updated!", 
                        text: "Car details successfully updated.",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        onClose(); 
                        window.location.reload()
                    });
                } else {
                    Swal.fire({
                        title: "No Changes!",
                        text: "Nothing was updated.",
                        icon: "info"
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating car:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while updating.",
                    icon: "error"
                });
            });
    };

    return (
        <div className='pt-4'>
            <form onSubmit={handleUpdate}>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <fieldset className="fieldset">
                        <label className="label">Car Name & Model :</label>
                        <input type="text" name='carName' defaultValue={carName} className="input focus-visible:outline-none w-full" placeholder="Enter Car Name & Model" required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Car Type :</label>
                        <select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            name="carType"
                            className='input focus-visible:outline-none w-full text-gray-500 cursor-pointer border-gray-300'
                            required
                        >
                            <option value='' disabled hidden>Please Choose</option>
                            <option value='Sedans'>Sedans</option>
                            <option value='Sport'>Sport</option>
                            <option value='Luxury'>Luxury</option>
                            <option value='SUV'>SUV</option>
                            <option value='Electric'>Electric</option>
                            <option value='Vans / Cargo Vans'>Vans / Cargo Vans</option>
                            <option value='Truck'>Truck</option>
                            <option value='Others'>Others</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Vehicle Registration Number :</label>
                        <input type="text" name='reg' defaultValue={reg} className="input focus-visible:outline-none w-full" placeholder="Enter Vehicle Registration Number" required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Car Image :</label>
                        <input type="text" name='image' defaultValue={image} className="input focus-visible:outline-none w-full" placeholder="Image URL" required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Availability :</label>
                        <div className='flex flex-col md:flex-row pl-4 md:pl-0 md:items-center h-20 md:h-10 justify-around text-lg text-gray-500 rounded-[4px] gap-4 border bg-base-100 border-gray-300'>
                            <label>
                                <input
                                    type="checkbox"
                                    name='availability'
                                    value="Available"
                                    checked={availabilityOfCar.available}
                                    onChange={() => handleCheckboxChange('available')}
                                />
                                <span className='p-2'>Available</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name='availability'
                                    value="Unavailable"
                                    checked={availabilityOfCar.unavailable}
                                    onChange={() => handleCheckboxChange('unavailable')}
                                />
                                <span className='p-2'>Unavailable</span>
                            </label>
                        </div>
                        {availabilityError && (
                            <p className="text-red-500 text-sm pt-1">Please choose one option!</p>
                        )}
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Features :</label>
                        <div className="grid grid-cols-2 text-gray-500 md:flex md:h-10 p-4 lg:p-2 justify-around rounded-[4px] gap-4 border bg-base-100 border-gray-300">
                            {[
                                { label: 'GPS', value: 'GPS' },
                                { label: 'AC', value: 'AC' },
                                { label: 'WiFi', value: 'WiFi' },
                                { label: 'TV', value: 'TV' },
                            ].map((item) => (
                                <div key={item.value} className="flex items-center text-lg gap-2">
                                    <input
                                        type="checkbox"
                                        name="features"
                                        className="cursor-pointer"
                                        value={item.value}
                                        onChange={() => setFeaturesError(false)}
                                    />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        {featuresError && (
                            <p className="text-red-500 text-sm pt-1">Please select at least one feature!</p>
                        )}
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Location :</label>
                        <input type="text" name='location' defaultValue={location} className="input focus-visible:outline-none w-full" placeholder="Enter car location" required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Daily Rental Price :</label>
                        <input type="number" min="0" name='rent' defaultValue={rent} className="input focus-visible:outline-none w-full" placeholder="Enter Daily Rental Price" required />
                    </fieldset>

                    <input type="number" name="bookingCount" defaultValue={bookingCount} hidden />
                    <input type="email" name="email" value={userEmail} hidden readOnly />

                </div>

                <fieldset className="fieldset">
                    <label className="label">Description :</label>
                    <input type="text" name='description' defaultValue={description} className="input focus-visible:outline-none w-full" placeholder="Description" required />
                </fieldset>

                <div className='pt-4'>
                    <ButtonII type="submit" label="Update Car" />
                </div>
            </form>
        </div>
    );
};

export default UpdateMyCars;