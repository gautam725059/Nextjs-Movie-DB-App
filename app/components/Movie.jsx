"use client" // <--- Ye line is component ko interactive bana rahi hai
import React from 'react';
import Link from 'next/link';
// Agar aapne react-icons install kiya hai, toh buttons ke liye use kar sakte hain
import { FaPlay, FaStar } from 'react-icons/fa'; 

const Movie = ({ item, index = 0 }) => {
  // TMDB data se movie ka naam, rating aur release date nikalenge
  const title = item?.title || item?.name;
  const rating = item?.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const releaseDate = item?.release_date || item?.first_air_date;
  // Movie ka unique identifier - movie object ko encode karke pass kar rahe hain
  const movieData = encodeURIComponent(JSON.stringify(item));

  return (
    // Card container: width kam kiya taaki image ke neeche space mile
    <div className='w-[160px] sm:w-[200px] md:w-[240px] inline-block p-2'>
      
      {/* 1. Movie Poster Section */}
      <Link href={`/movie/${index}?data=${movieData}`}>
        <div className='relative w-full h-auto cursor-pointer hover:scale-105 transition transform duration-200'>
          <img
            className='w-full h-auto rounded block'
            src={`https://image.tmdb.org/t/p/w500/${item?.poster_path || item?.backdrop_path}`}
            alt={title}
          />
        </div>
      </Link>

      {/* 2. Details Section (Image ke Neeche) */}
      <div className='flex flex-col mt-2 text-white'>
        
        {/* Title */}
        <p className='text-sm font-bold truncate hover:whitespace-normal'>{title}</p>
        
        {/* Rating and Date */}
        <div className='flex items-center text-xs text-gray-400 my-1 justify-between'>
            {/* Rating */}
            <p className='flex items-center'>
                <FaStar className='text-yellow-400 mr-1' /> {rating}
            </p>
            {/* Date */}
            <p>{releaseDate ? releaseDate.substring(0, 4) : ''}</p>
        </div>

        {/* Play Button */}
        <button 
          className='flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-1.5 rounded text-sm transition duration-200 mt-1'
          onClick={() => alert(`Playing ${title}`)} // Temporary action
        >
          <FaPlay className='mr-2 text-xs' /> Play
        </button>
      </div>
    </div>
  );
};

export default Movie;