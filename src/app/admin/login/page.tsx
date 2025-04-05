'use client';
import React, { useState } from 'react';
import userLogo from '../../../assets/images/youtab logo.png';
import { useLoginRequest } from '@/lib/auth';

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { mutate, isLoading } = useLoginRequest();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 w-full h-screen flex justify-center items-center">
      <div className="bg-blue-800 rounded-lg w-11/12 sm:w-3/5 md:w-2/5 p-6">
        <div className="flex flex-col items-center">
          <p className="text-white text-2xl mb-2">Log in</p>
          <img src={userLogo.src} alt="user logo" className="w-16 h-16 mb-4" />
          {/* Email */}
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
              className="w-full p-2 bg-blue-50 rounded-md text-blue-700 placeholder-blue-400"
            />
          </div>
          {/* Password */}
          <div className="relative mb-6">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              value={values.password}
              onChange={e => setValues({ ...values, password: e.target.value })}
              className="w-full p-2 bg-blue-50 rounded-md text-blue-700 placeholder-blue-400 pr-16"
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute right-4 top-2 text-blue-500"
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {/* Submit Button */}
          <button
            onClick={() => mutate(values)}
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-600"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
