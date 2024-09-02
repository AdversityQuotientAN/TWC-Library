import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footerContainer'>&copy; {new Date().getFullYear()}. All rights reserved</div>
  )
}

export default Footer