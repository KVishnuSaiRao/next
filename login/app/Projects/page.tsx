import React from 'react'
import Navbar from '../navbar/page';
import Image from 'next/image';
import logo from "../images/cnlogo.svg";
import './page.css'
import ShimmerCard from './ShimmerCard';
export default function page() {
    
  return (
    <div className='Pback'>   
    <Image src={logo} alt="" />          
    <Navbar />
    <div className='pag'>
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
    </div>
    </div>
  )
}

