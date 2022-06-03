import React from 'react'
import './main.css'

const Main = () => {
  return (
    <div>
        <div className='main'>
            <div className='main_content'>
              <div className='messages'>
                <div className='bot-messages' id='message1'></div>
                <div className='human-messages' id='message2'></div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Main