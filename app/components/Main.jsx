"use client";
import React, { useEffect, useState } from "react";
import requests from "../request";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.data);
    });
  }, []);

  // Auto Scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        movies.length > 0 ? (prev + 1) % movies.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  // Truncate
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full h-[550px] text-white overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-r from-black z-10"></div>

      {/* Background Carousel Image */}
      {movie && (
        <img
          key={currentIndex}
          className="w-full h-full object-cover transition-opacity duration-700"
          src={movie.poster_path}
          alt={movie.title}
        />
      )}

      {/* ---- Text Content ---- */}
      {movie && (
        <div className="absolute w-full top-[60%] p-4 md:p-8 z-20">
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>

          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 cursor-pointer hover:bg-white">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4 cursor-pointer hover:bg-gray-700 hover:text-white">
              Watch Later
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            Released: {movie.release_date}
          </p>

          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mt-2">
            {truncateString(movie.overview, 150)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
