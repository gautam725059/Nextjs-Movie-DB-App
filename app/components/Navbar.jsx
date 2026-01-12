import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      {/* --- Logo Section --- */}
      <Link href='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer hover:text-red-500 transition'>
          movieHub
        </h1>
      </Link>

      {/* --- Buttons Section --- */}
      <div className='flex items-center gap-4'>
        <Link href='/auth/signin'>
          <button className='text-white pr-4 hover:text-red-600 transition duration-300'>Sign In</button>
        </Link>
        <Link href='/auth/signup'>
          <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-red-700 transition duration-300'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;