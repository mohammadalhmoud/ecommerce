import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dignissimos unde ullam ut aspernatur odit harum a. Amet, officiis quasi natus ad a tempora, eum rerum enim velit consequatur in?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis officia dolore reprehenderit earum quibusdam dolores. Vel veritatis eum porro fugiat, qui minima placeat officia sed doloremque laudantium consequuntur id asperiores.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta molestiae dignissimos ut perspiciatis quibusdam recusandae, voluptatibus nostrum eligendi, asperiores nemo at doloribus, ducimus modi itaque reprehenderit sint ipsam aliquam qui.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis repellendus dolorum libero explicabo numquam beatae eius repudiandae ducimus debitis. Exercitationem, nisi? Odit, id beatae accusamus fugit ipsa accusantium corrupti consectetur.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>convenience : </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis repellendus dolorum libero explicabo numquam beatae eius repudiandae ducimus debitis. Exercitationem, nisi? Odit, id beatae accusamus fugit ipsa accusantium corrupti consectetur.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exeptional Customer Service : </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis repellendus dolorum libero explicabo numquam beatae eius repudiandae ducimus debitis. Exercitationem, nisi? Odit, id beatae accusamus fugit ipsa accusantium corrupti consectetur.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
