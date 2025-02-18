'use client';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
  const path = usePathname()
  useEffect(()=>{

  })
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image
      src={'./logo.svg'}
      alt='logo'
      width={100}
      height={80}
      />
      <ul className='hidden md:flex gap-6 '>
        <li className={`hover:text-green-500 hover:font-bold transition cursor-pointer ${path==='/dashboard' && 'text-green-500 font-bold'}`} >Dashboard</li>
        <li className={`hover:text-green-500 hover:font-bold transition cursor-pointer ${path==='/questions' && 'text-yellow-500 font-bold'}`} >Questions</li>
        <li className={`hover:text-green-500 hover:font-bold transition cursor-pointer ${path==='/upgrade' && 'text-blue-500 font-bold'}`} >Upgrade</li>
        <li className={`hover:text-green-500 hover:font-bold transition cursor-pointer ${path==='/works' && 'text-teal-500 font-bold'}`} >How it works?</li>
      </ul>
      <span className="pr-2">

      <UserButton/>
      </span>
    </div>
  )
}

export default Header
