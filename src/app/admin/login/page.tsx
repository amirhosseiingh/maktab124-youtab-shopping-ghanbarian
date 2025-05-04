'use client';
import React, { useState } from 'react';
import userLogo from '../../../assets/images/youtab-logo.png';
import { useLoginRequest } from '@/hooks/auth';
import iconLogInPage from '../../../assets/images/icons8-group-100.png';
import { FaEyeSlash, FaEye, FaHome } from 'react-icons/fa'; 
import LoaderLoading from '@/components/common/loadding';
import Link from 'next/link'; 

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
      <div className="flex justify-center items-center mt-40">
        <LoaderLoading />
      </div>
    );
  }

  return (
    <div className="bg-green-100 flex h-screen">
      <div className="bg-white w-full">
        <div className="flex flex-col items-center justify-center p-24 m-8">
          <div className="absolute top-4 right-4">
            <Link href="/">
              <FaHome
                size={24}
                className="text-green-700 hover:text-green-500"
              />
            </Link>
          </div>
          <p className="text-green-700 text-2xl mb-2 font-bold">
            صفحه ورود ادمین
          </p>
          <img
            src={iconLogInPage.src}
            alt="user logo"
            className="w-16 h-16 mb-4"
          />
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="نام کاربری"
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
              className="w-72 p-2 bg-green-50 rounded-md text-green-700 placeholder-green-800"
            />
          </div>
          <div className="relative mb-6">
            <input
              type={show ? 'text' : 'password'}
              placeholder="رمز عبور"
              value={values.password}
              onChange={e => setValues({ ...values, password: e.target.value })}
              className="w-72 p-2 bg-green-50 rounded-md text-green-800 placeholder-green-800 "
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute left-2 top-1.5 text-white bg-green-800 p-1 rounded-sm hover:bg-green-600"
            >
              {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          <button
            onClick={() => mutate(values)}
            className="w-86 bg-green-800 text-white py-2 rounded-md mt-2 hover:bg-green-600"
          >
            ورود
          </button>
        </div>
      </div>
      <div className="w-full">
        <img className="h-full" src={userLogo.src} alt="userLogo" />
      </div>
    </div>
  );
};

export default LoginPage;
