import React from 'react'
import Hero from '../components/Hero'
import LatestArrivals from '../components/LatestArrivals'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'


function Home() {

  return (
    <div>
      <Hero />
      <LatestArrivals />
      <BestSellers />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home
