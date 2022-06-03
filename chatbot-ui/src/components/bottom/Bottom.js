import React from 'react'
import './bottom.css'

const Bottom = () => {
  return (
    <div>
        <div className='bottom'>
            <div className='bottom-side'>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm"></span>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder='Enter your message'/>
            </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary me-md-2" type="button"><i class="fa-solid fa-paper-plane"></i>Send</button>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Bottom