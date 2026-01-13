"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const [hoveredArrow, setHoveredArrow] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(fetchURL, {
          headers: {
            Accept: "application/json",
          },
        });

        // FIX: Your API returns data.data
        setMovies(res.data.data || []);
      } catch (error) {
        console.log("🔥 API ERROR:", error);
      }
    };

    fetchMovies();
  }, [fetchURL]);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowID);
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  return (
    <div className="px-6 py-8">
      {/* Title Section */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1 bg-linear-to-b from-red-600 to-red-500 rounded-full"></div>
        <h2 className="text-white font-bold text-2xl md:text-3xl tracking-wide">
          {title}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center group">
        {/* Left Arrow */}
        <button
          onClick={() => slide(-500)}
          onMouseEnter={() => setHoveredArrow('left')}
          onMouseLeave={() => setHoveredArrow(null)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden group-hover:flex items-center justify-center transition-all duration-300"
        >
          <div className="bg-linear-to-r from-black via-black to-transparent pr-4 pl-6 py-6 rounded-r-lg hover:from-red-900 hover:via-red-900 transition-all duration-300 transform hover:scale-110">
            <MdChevronLeft
              className="text-white drop-shadow-lg"
              size={32}
            />
          </div>
        </button>

        {/* Movie cards Container */}
        <div
          id={"slider" + rowID}
          className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, id) => (
            <Movie key={id} item={item} index={id} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => slide(500)}
          onMouseEnter={() => setHoveredArrow('right')}
          onMouseLeave={() => setHoveredArrow(null)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden group-hover:flex items-center justify-center transition-all duration-300"
        >
          <div className="bg-linear-to-l from-black via-black to-transparent pl-4 pr-6 py-6 rounded-l-lg hover:from-red-900 hover:via-red-900 transition-all duration-300 transform hover:scale-110">
            <MdChevronRight
              className="text-white drop-shadow-lg"
              size={32}
            />
          </div>
        </button>

        {/* Gradient overlay left */}
        <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-gray-900 via-gray-900 to-transparent pointer-events-none z-10"></div>

        {/* Gradient overlay right */}
        <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-gray-900 via-gray-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default Row;
