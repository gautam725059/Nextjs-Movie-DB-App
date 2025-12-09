import React from 'react'

import Navbar from './components/Navbar'
import Main from './components/Main'
import Movie from './components/Movie'
import Row from './components/Row'
import requests from './request'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Main/>
      {/* <Movie/> */}

      <div>
        <p className="font-bold text-2xl px-5">Upcoming</p>
        <Row rowID='1' title='Upcoming' fetchURL={requests.requestUpcoming} />
      </div>

      <div>
        <p className="font-bold text-2xl px-5">Popular</p>
        <Row rowID='2' title='Popular' fetchURL={requests.requestPopular} />
      </div>

      <div>
        <p className="font-bold text-2xl px-5">Trending</p>
        <Row rowID='3' title='Trending' fetchURL={requests.requestTrending} />
      </div>

      <div>
        <p className="font-bold text-2xl px-5">Top Rated</p>
        <Row rowID='4' title='Top Rated' fetchURL={requests.requestTopRated} />
      </div>

      <div>
        <p className="font-bold text-2xl px-5">Horror</p>
        <Row rowID='5' title='Horror' fetchURL={requests.requestHorror} />
      </div>

    </div>
  )
}

export default page
