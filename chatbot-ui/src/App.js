
import './App.css';
import image from './images/background_img.jpeg'

function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <div className='content'>
          <div className='header'>
            <div className='img'>
              <img src={image} alt='background'/>
            </div>
            <div className='right'>
              <div className='name'>Chatbot</div>
              <div className='status'>Active</div>
            </div>
          </div>
          <div className='main'>
            <div className='main_content'>
              <div className='messages'>
                <div className='bot-messages' id='message1'></div>
                <div className='human-messages' id='message2'></div>
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='bottom-side'>
              <input type='text' id='input' placeholder='Enter your message' />
              <div className='button'>
                <button className='btn'><i class="fa-solid fa-paper-plane"></i> Send</button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
