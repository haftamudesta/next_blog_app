import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer>
       <p>&copy; {new Date().getFullYear()} <Link href={"https://vividrender-haftamud.onrender.com/"}>Haftamu Desta</Link>. All rights reserved.</p>
    </footer>
  )
}

export default Footer