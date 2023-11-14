import React from 'react'
import  './Homescreen.css'
import Navbar from '../Navbar'
import Banner from '../Banner'
import Row from '../Row'
import requests from '../Request'

function Homescreen() {


  return (
    <div className='homescreen'>
      {/* Navbar */}
        <Navbar />
        
      {/* Banner */}
        <Banner />

      {/* Row */}
        <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOrginals} isLargeRow/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}

export default Homescreen
