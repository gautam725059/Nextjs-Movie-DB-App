"use client" // <--- Ye line is component ko interactive bana rahi hai
import React, { useState } from 'react';
import Link from 'next/link';
// Agar aapne react-icons install kiya hai, toh buttons ke liye use kar sakte hain
import { FaPlay, FaStar } from 'react-icons/fa'; 

const Movie = ({ item, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // TMDB data se movie ka naam, rating aur release date nikalenge
  const title = item?.title || item?.name;
  const rating = item?.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const releaseDate = item?.release_date || item?.first_air_date;
  // Movie ka unique identifier - movie object ko encode karke pass kar rahe hain
  const movieData = encodeURIComponent(JSON.stringify(item));

  return (
    // Card container
    <div 
      className='w-[160px] sm:w-[200px] md:w-[240px] inline-block p-2'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. Movie Poster Section */}
      <Link href={`/movie/${index}?data=${movieData}`}>
        <div className='relative w-full h-auto cursor-pointer group'>
          <img
            className='w-full h-auto rounded-lg block shadow-xl group-hover:shadow-2xl group-hover:shadow-red-600/50 transition-all duration-300 group-hover:scale-110 origin-top'
            src={`https://image.tmdb.org/t/p/w500/${item?.poster_path || item?.backdrop_path}`}
            alt={title}
          />
          {/* Overlay on hover */}
          <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
      </Link>

      {/* 2. Details Section (Image ke Neeche) */}
      <div className='flex flex-col mt-3 text-white'>
        
        {/* Title */}
        <p className='text-sm font-bold truncate hover:text-red-400 transition-colors duration-200 line-clamp-2'>
          {title}
        </p>
        
        {/* Rating and Date */}
        <div className='flex items-center text-xs text-gray-400 my-2 justify-between'>
            {/* Rating */}
            <div className='flex items-center bg-gray-800 bg-opacity-50 px-2 py-1 rounded'>
                <FaStar className='text-yellow-400 mr-1' size={10} /> 
                <span className='font-semibold'>{rating}</span>
            </div>
            {/* Date */}
            <p className='text-gray-500 font-medium'>{releaseDate ? releaseDate.substring(0, 4) : ''}</p>
        </div>

        {/* Play Button */}
        <button 
          className='flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300 mt-2 shadow-lg hover:shadow-red-600/50 transform hover:scale-105 active:scale-95'
          onClick={() => alert(`Playing ${title}`)}
        >
          <FaPlay className='mr-2 text-xs' /> Play
        </button>
      </div>
    </div>
  );
};

export default Movie;