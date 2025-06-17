import React, { useState, useRef, useEffect, use } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Modal from './Modal';
import UpdateCars from '../UpdateCars';
import UpdateModal from './UpdateModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';

const DorpMenu = ({ carDetailData }) => {
  const { email, _id } = carDetailData
  // console.log(carDetailData);

  const { user } = use(AuthContext)
  const userEmail = user?.email || '';

  const [open, setOpen] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);

  const menuRef = useRef();

  const toggleMenu = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
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
          .then((response) => {
            const data = response.data;
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Car data has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                navigate('/my-cars');
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
    <div className="relative inline-block text-left" ref={menuRef}>

      <button
        onClick={toggleMenu}
        className=" text-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-100 cursor-pointer 
        hover:scale-110 transition-all"
      >
        <BsThreeDotsVertical size={25} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-red-100 text-gray-600 rounded-lg shadow-lg z-50">
          {/* update button */}
          <button
            onClick={() => setUpdateModal(true)}
            className="w-full text-left px-4 py-2  hover:bg-green-300 hover:font-bold cursor-pointer rounded-t flex justify-center items-center gap-2"
          >
            <FaRegEdit size={22} /> Update
          </button>

          {/* delete button */}
          <button
            onClick={handleDelete}

            className="w-full text-left px-4 py-2 hover:font-bold cursor-pointer hover:bg-red-400 hover:text-white rounded-b flex justify-center items-center gap-2"
          >
            <MdDeleteForever size={24} /> Delete
          </button>
        </div>
      )}

      {/* modal Update */}
      <UpdateModal cls='lg:w-[1168px] md:w-[668px] w-[88%] mx-auto bg-red-50 p-6 md:p-8 lg:p-12 rounded-2xl' isOpen={isUpdateModal} onClose={() => setUpdateModal(false)} >
        <UpdateCars onClose={() => setUpdateModal(false)} carDetailData={carDetailData} />
      </UpdateModal>
    </div>
  );
};

export default DorpMenu;