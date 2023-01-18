import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Login from './pages/Login';
import Message from './pages/Message';
import Signup from './pages/Signup';
function App() {
  return (
    <div className="main">
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/> } />
      </Routes>
      <Routes>
        <Route path='/inbox' element={<Inbox/> } />
      </Routes>
      <Routes>
        <Route path='/message' element={<Message/> } />
      </Routes>
      <Routes>
        <Route path='/signup' element={<Signup/> } />
      </Routes>
      <Routes>
        <Route path='/login' element={<Login/> } />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
