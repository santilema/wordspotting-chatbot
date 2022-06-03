import React from 'react'
import './header.css'
import image from '../../images/background_img.jpeg'

const Header = () => {
  return (
    <div>
       <div className='header'>
            <div className='img'>
              <img src={image} alt='background'/>
            </div>
            <div className='right'>
              <div className='name'>Chatbot</div>
              <div className='status'>Active</div>
            </div>
          </div> 
    </div>
  )
}

export default Header