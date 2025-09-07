"use client"
import { logout } from '@/actions/auth'
import { getAutenticatedhUser } from '@/lib/getAuthUser'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBar = ({authUser}) => {
  const pathName=usePathname();
  
  return (
    <div className='flex justify-between items-center bg-slate-950 text-white py-4 '>
        <div>
                <Link href="/" className={pathName==="/" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Home</Link>
        </div>
        {authUser?(
          <div className='flex gap-4 mr-2'>
            <Link href="/posts/create" className={pathName==="/posts/create" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Create Post</Link>
            <Link href="/dashboard" className={pathName==="/dashboard" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Dashboard</Link>
            <form action={logout}>
              <button className='text-red-400 font-bold bg-teal-400 px-2 rounded-md py-1 cursor-pointer'>
                Logout
              </button>
            </form>
          </div>
        ):(
          <div className='flex gap-4 mr-2'>
            <Link href="/register" className={pathName==="/register" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Register</Link> 
             <Link href="/login" className={pathName==="/login" ? "text-teal-600 font bold border-1 px-2 rounded-md":""}>Login</Link>
          </div>
        )}
    </div>
  )
}

export default NavBar