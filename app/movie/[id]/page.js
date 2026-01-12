'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FaStar } from 'react-icons/fa'

const MovieDetails = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      // Query params se movie data le rahe hain
      const movieDataStr = searchParams.get('data')
      
      if (movieDataStr) {
        const decodedMovie = JSON.parse(decodeURIComponent(movieDataStr))
        setMovie(decodedMovie)
      } else {
        // Fallback - agar data nahi hai toh default message
        console.log('No movie data found')
      }
    } catch (error) {
      console.log('Error parsing movie data:', error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 text-white'>
        <Navbar />
        <div className='flex items-center justify-center h-96'>
          <p className='text-2xl'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-gray-900 text-white'>
        <Navbar />
        <div className='flex items-center justify-center h-96'>
          <p className='text-2xl'>Movie not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const title = movie?.title || movie?.name || 'Unknown'
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const releaseDate = movie?.release_date || movie?.first_air_date || 'N/A'
  const description = movie?.overview || 'Koi description available nahi hai'
  const posterPath = movie?.poster_path || movie?.backdrop_path
  const backdropPath = movie?.backdrop_path

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Navbar />

      {/* Hero Section with Backdrop */}
      {backdropPath && (
        <div className='relative h-96 w-full overflow-hidden'>
          <img
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt={title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900'></div>
        </div>
      )}

      {/* Movie Details Container */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          
          {/* Movie Poster */}
          {posterPath && (
            <div className='flex-shrink-0 w-full md:w-64'>
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                className='w-full rounded-lg shadow-2xl'
              />
            </div>
          )}

          {/* Movie Info */}
          <div className='flex-1'>
            
            {/* Title */}
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>{title}</h1>

            {/* Rating and Date */}
            <div className='flex items-center gap-6 mb-6 flex-wrap'>
              <div className='flex items-center gap-2'>
                <FaStar className='text-yellow-400' size={24} />
                <span className='text-2xl font-semibold'>{rating}/10</span>
              </div>
              <div className='text-lg text-gray-400'>
                Release Date: <span className='text-white font-semibold'>{releaseDate}</span>
              </div>
            </div>

            {/* Description */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-4'>Description</h2>
              <p className='text-gray-300 leading-relaxed text-lg'>
                {description}
              </p>
            </div>

            {/* Additional Info */}
            <div className='grid grid-cols-2 gap-6 pt-6 border-t border-gray-700'>
              {movie?.popularity && (
                <div>
                  <h3 className='text-gray-400 text-sm'>Popularity</h3>
                  <p className='text-xl font-semibold'>{movie.popularity.toFixed(1)}</p>
                </div>
              )}
              {movie?.original_language && (
                <div>
                  <h3 className='text-gray-400 text-sm'>Language</h3>
                  <p className='text-xl font-semibold uppercase'>{movie.original_language}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MovieDetails
