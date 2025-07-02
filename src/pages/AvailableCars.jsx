import React, { useEffect, useState } from 'react';
import CarCart from '../components/availablecars/CarCart';
import Loading from '../components/ui/Loading';
import { IoGridOutline } from "react-icons/io5";
import { TfiViewListAlt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('low');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    document.title = 'Available Cars';
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://ride-next-server.vercel.app/all-vehicles?sort=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        // console.log('Fetched cars:', data);
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sortOrder]);

  //sort car handle
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // filer available car and search
  const filteredCars = cars.filter(car => {
    const term = searchTerm.toLowerCase();
    const isAvailable = car.availability === "Available";

    return (
      isAvailable &&
      (
        car.carName?.toLowerCase().includes(term) ||
        car.carType?.toLowerCase().includes(term) ||
        car.description?.toLowerCase().includes(term)
      )
    );
  });

  return (
    <section className='mb-10 md:mb-12 lg:mb-18'>

      <div className='flex justify-between items-center gap-4 border-t border-b py-3 border-gray-300'>
        {/* Search input */}
        <div className='md:flex-1 '>
          
          <div className="relative w-[90%] max-w-md lg:w-[45%] flex ">
            <div className="relative flex-1 ">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <button
              onClick={() => { }} // Optional, if you want to add manual search logic
              className="bg-red-500 text-white px-2 md:px-4 md:py-2 rounded-r-lg hover:bg-red-600 transition flex items-center justify-center gap-1"
            >
              <IoSearch className='hidden md:block'/>
              <span > Search  </span>
            </button>
          </div>

        </div>

        {/* Sort Toggle */}
        <div className="md:flex text-sm md:text-base items-center justify-center gap-4 hidden">
          <div className='flex gap-2 items-center justify-center'>
            <label className=' font-semibold text-gray-500'>Sort: </label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className='input w-24 md:w-36 px-2 h-8 md:h-auto md:px-3 md:py-2 text-xs md:text-base border border-gray-300 rounded-lg focus-visible:outline-none'
            >       
              <option  value="low">  Price: Low to High</option>
              <option  value="high">  Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex text-sm md:text-base items-center justify-center gap-4 md:hidden">
          <div className='flex gap-2 items-center justify-center'>
            <label className='hidden md:block font-semibold text-gray-500'>Sort: </label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className='input w-24 md:w-36 px-2 h-8 md:h-auto md:px-3 md:py-2 text-xs md:text-base border border-gray-300 rounded-lg focus-visible:outline-none'
            >       
              <option className='md:hidden' value="low"> Short Price: Low to High</option>
              <option className='md:hidden' value="high"> Short Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Available cars & Grid list */}
      <div className=''>
        <div className='grid grid-cols-2 md:grid-cols-3 items-center'>
          <div className='hidden md:block'></div>
          <div>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center my-6 md:my-8'>Available Cars</h1>
          </div>
          <div>
            <div className="flex gap-2 flex-row-reverse">

              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 cursor-pointer rounded border ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <TfiViewListAlt size={20} />
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 cursor-pointer rounded border ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <IoGridOutline size={20} />
              </button>

            </div>
          </div>
        </div>


        {loading ? (
          <Loading />
        ) : (
          filteredCars.length > 0 ? (
            <div
              className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8' : 'flex flex-col gap-4'}`}
            >
              {filteredCars.map(car => (
                <CarCart key={car._id} car={car} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No cars match your search.</p>
          )
        )}
      </div>
    </section>
  );
};

export default AvailableCars;
