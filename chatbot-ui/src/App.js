
import './App.css';
import Bottom from './components/bottom/Bottom';
// import image from './images/background_img.jpeg'

import Header from './components/header/Header';
// import Introduction from './components/introduction/Introduction';
import Main from './components/main/Main';


function App() {
    return (
    <div className="App">
        
      <div className='wrapper'>
        
        <div className='content'>
          
          <Header />
          <Main />
          <Bottom />
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
