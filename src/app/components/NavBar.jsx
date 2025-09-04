import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center bg-slate-950 text-white '>
        <div>
                <Link href="/">Home</Link>
        </div>
        <div className='flex justify-between items-center gap-6 mr-3'>
             <Link href="/dashboard">Dashboard</Link>
             <Link href="/register">Register</Link> 
             <Link href="/login">Login</Link>
        </div>
    </div>
  )
}

export default NavBar