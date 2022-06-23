import React from 'react'
import './bottom.css'
import {RiSendPlaneFill as Send} from "react-icons/ri"

const Bottom = () => {
  return (
    <div className='bottom'>
        <div className="bottom-body">
          <div className="input-wrap">
            <input type="text" name="input" placeholder='Write your message'/>
          </div>
          <div className="btn">
            <Send />
            <button>Send</button>
          </div>
        </div>
    </div>
  )
}

export default Bottom