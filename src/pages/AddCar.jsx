import React, { use, useEffect, useState } from 'react';
import ButtonII from '../components/ui/ButtonII';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';


const AddCar = () => {
    useEffect(() => {
        document.title = 'Add Car';
    }, []);

    const { user } = use(AuthContext)
    const userEmail = user?.email || '';

    const [availabilityError, setAvailabilityError] = useState(false);
    const [availability, setAvailability] = useState({ available: false, unavailable: false, });
    const handleCheckboxChange = (option) => {
        setAvailability({
            available: option === 'available',
            unavailable: option === 'unavailable',
        });
        setAvailabilityError(false);
    }

    const [selectedOption, setSelectedOption] = useState("");


    const handleAddRCars = e => {
        e.preventDefault()
        if (!availability.available && !availability.unavailable) {
            setAvailabilityError(true); // Show error in form
            return;
        }
        const form = e.target
        const formData = new FormData(form)
        const newCarsData = Object.fromEntries(formData.entries())

        newCarsData.features = formData.getAll('features');

        axios.post('https://ride-next-server.vercel.app/vehicles', newCarsData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Car added!",
                        text: "Your car successfully added",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        location.reload();
                    });
                    form.reset()
                }
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });

    }

    return (
        <section className=''>
            <div>
                <h1 className='text-center text-4xl font-semibold pb-5 '>Add Car</h1>
            </div>
            <div className='lg:w-[1168px] md:w-[668px] w-[328px] mx-auto bg-red-50 p-6 md:p-8 lg:p-12 rounded-2xl '>

                <form onSubmit={handleAddRCars}>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>

                        <fieldset className="fieldset ">
                            <label className="label">Car Name & Model :</label>
                            <input type="text" name='carName' className="input focus-visible:outline-none w-full" placeholder="Enter Car Name & Model" required />
                        </fieldset>

                        <fieldset className="fieldset ">
                            <label className="label">Car Type :</label>

                            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} name="carType" className='input focus-visible:outline-none w-full text-gray-500 cursor-pointer border-gray-300' required>
                                <option value='' disabled hidden>Please Chose</option>
                                <option value='Sedans' className='text-gray-800 font-medium'>Sedans</option>
                                <option value='Sport' className='text-gray-800 font-medium'> Sport </option>
                                <option value='Luxury' className='text-gray-800 font-medium'>Luxury </option>
                                <option value='SUV' className='text-gray-800 font-medium'>SUV </option>
                                <option value='Electric' className='text-gray-800 font-medium'>Electric </option>
                                <option value='Vans / Cargo Vans' className='text-gray-800 font-medium'>Vans / Cargo Vans</option>
                                <option value='Truck' className='text-gray-800 font-medium'>Truck</option>
                                <option value='Others' className='text-gray-800 font-medium'>Others</option>
                            </select>

                        </fieldset>

                        <fieldset className="fieldset ">
                            <label className="label">Vehicle Registration Number :</label>
                            <input required type="text" name='reg' className="input focus-visible:outline-none w-full" placeholder="Enter Vehicle Registration Number " />
                        </fieldset>

                        <fieldset className="fieldset ">
                            <label className="label">Car Image :</label>
                            <input required type="text" name='image' className="input focus-visible:outline-none w-full" placeholder="Image URL" />
                        </fieldset>

                        <fieldset className="fieldset ">
                            <label className="label">Availability :</label>
                            <div className='flex items-center h-10 justify-around text-lg text-gray-500 rounded-[4px] gap-4 border bg-base-100 border-gray-300'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name='availability'
                                        checked={availability.available}
                                        value="Available"

                                        onChange={() => handleCheckboxChange('available')}
                                    /> <span className='p-2'>Available</span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name='availability'
                                        value="Unavailable"
                                        checked={availability.unavailable}
                                        onChange={() => handleCheckboxChange('unavailable')}
                                    /> <span className='p-2'>Unavailable</span>
                                </label>
                            </div>

                            {availabilityError && (
                                <p className="text-red-500 text-sm pt-1">Please choose one !</p>
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
                                        />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </fieldset>

                        

                        <fieldset className="fieldset ">
                            <label className="label">Location :</label>
                            <input type="text" name='location' className="input focus-visible:outline-none w-full" placeholder="Enter car location" required />
                        </fieldset>

                        <fieldset className="fieldset ">
                            <label className="label">Daily Rental Price :</label>
                            <input type="number" min="0" name='rent' className="input focus-visible:outline-none w-full" placeholder="Enter Daily Rental Price" required />
                        </fieldset>

                        <input type="number" name="bookingCount" defaultValue={0} hidden />
                        <input type="email" name="email" value={userEmail} hidden readOnly /> 
                        

                    </div>

                    <fieldset className="fieldset ">
                        <label className="label">Description :</label>
                        <input type="text" name='description' className="input focus-visible:outline-none w-full" placeholder="Description" required />
                    </fieldset>

                    <div>
                        <div className='pt-4'>
                            <ButtonII type="submit" label="Add Car" />
                        </div>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default AddCar;