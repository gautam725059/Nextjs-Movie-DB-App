"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

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
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>

      <div className="relative flex items-center group">
        {/* Left Arrow */}
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />

        {/* Movie cards */}
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, id) => (
            <Movie key={id} item={item} index={id} />
          ))}
        </div>

        {/* Right Arrow */}
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
