'use client';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Header = () => {
  const path = usePathname()
  const router = useRouter()
  useEffect(()=>{

  })
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image
      // src={'./logo.svg'}
      src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbCvRQdqbiSmycTt9qvTuQODFwZ7UlxJZdg&s'}
      alt='logo'
      width={60}
      height={40}
      onClick={()=>router.push('/')}
      />
      <ul className='hidden md:flex gap-6 '>
        <li className={`hover:text-green-500 hover:font-bold transition cursor-pointer ${path==='/dashboard' && 'text-green-500 font-bold'}`} >Dashboard</li>
        <li className={`hover:text-yellow-500 hover:font-bold transition cursor-pointer ${path==='/questions' && 'text-yellow-500 font-bold'}`} >Questions</li>
        <li className={`hover:text-blue-500 hover:font-bold transition cursor-pointer ${path==='/upgrade' && 'text-blue-500 font-bold'}`} >Upgrade</li>
        <li className={`hover:text-teal-500 hover:font-bold transition cursor-pointer ${path==='/works' && 'text-teal-500 font-bold'}`} >How it works?</li>
      </ul>
      <span className="pr-2">

      <UserButton/>
      </span>
    </div>
  )
}

export default Header
