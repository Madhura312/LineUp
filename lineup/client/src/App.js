
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from 'react-router-dom';
import Hometab from './components/Hometabs/Hometab';
import QrReader from 'react-qr-scanner';
function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
        <QrReader 
        
        style={{width:'200px'}}></QrReader>
    </BrowserRouter>
    </>
  );
}

export default App;
