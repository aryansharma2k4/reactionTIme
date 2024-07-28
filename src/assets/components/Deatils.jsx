import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../../slice/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import logo from '../../image/logo.png';

function Details({ setCurrentUser, onEnter }) {
  const [username, setUsername] = useState("");
  const usersList = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name: username,
      id: nanoid(),
      time: "" 
    };
    dispatch(addUsers(userDetails));
    setCurrentUser(userDetails.id);
    setUsername("");
    onEnter();
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <img src={logo} alt="Logo" className="absolute top-4 left-4 w-80 h-24" />
      <div className="flex space-x-8 p-6">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center bg-white rounded-xl shadow-lg p-16 w-full max-w-3xl">
          <div className="text-center font-bold text-[32px] mb-4">Enter Your Name</div>
          <input 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            className="text-[24px] font-bold font-serif border-2 w-full border-black p-4 rounded-xl" 
            type="text" 
          />
          <button type="submit" className="mt-8 font-bold font-playfair text-[24px] rounded-xl w-64 py-4 border-[1px] shadow-xl">Start The Game</button>
        </form>
        <div className="rules flex flex-col items-center bg-white rounded-xl shadow-lg p-8 fixed right-0 top-1/2 transform -translate-y-1/2 w-80">
          <div className="text-center font-bold text-[24px] mb-4">Rules of the Game</div>
          <p className="text-[20px]">1. You should have at least 3 correct answers.</p>
          <p className="text-[20px]">2. Your time should be less than 9 seconds.</p>
          <p className="text-[20px]">Only then you will be eligible for the chocolate.</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
