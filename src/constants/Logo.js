import React from 'react'
import './Logo.css'
function Logo(){
  return (
    <div className='logoContainer'>
    <a href="/views/home/Home.js">
      <img
      className='logoImg'
      src={require('../images/logo.png')}
      alt=''
      />
      </a>
    </div>
  )
}

export default Logo;