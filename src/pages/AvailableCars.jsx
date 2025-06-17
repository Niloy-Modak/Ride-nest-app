import React, { useEffect, useState } from 'react';
import CarCart from '../components/availablecars/CarCart';
import Loading from '../components/ui/Loading';
import { IoGridOutline } from "react-icons/io5";
import { TfiViewListAlt } from "react-icons/tfi";

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

      <div className='flex w-[96%] md:w-[90%] mx-auto justify-between items-center gap-4 border-t border-b py-3 border-gray-300'>
        {/* Search input */}
        <div className='md:flex-1'>
          <div className="relative w-[90%] max-w-md lg:w-[45%]">
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
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus-visible:outline-none transition"
            />
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex  items-center gap-4">
          <div>
            <label>Sort: </label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className='input w-36 py-2 border border-gray-300 rounded-lg focus-visible:outline-none'
            >
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Available cars & Grid list */}
      <div className='w-[90%] mx-auto'>
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
                <TfiViewListAlt size={20}/>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 cursor-pointer rounded border ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <IoGridOutline size={20}/>
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
