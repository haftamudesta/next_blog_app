"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const pathName=usePathname()
  return (
    <div className='flex justify-between items-center bg-slate-950 text-white py-4'>
        <div>
                <Link href="/" className={pathName==="/" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Home</Link>
        </div>
        <div className='flex justify-between items-center gap-6 mr-3'>
             <Link href="/dashboard" className={pathName==="/dashboard" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Dashboard</Link>
             <Link href="/register" className={pathName==="/register" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Register</Link> 
             <Link href="/login" className={pathName==="/login" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Login</Link>
        </div>
    </div>
  )
}

export default NavBar