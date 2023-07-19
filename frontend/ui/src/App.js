import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Inventory from './pages/Inventory';
import Logout from './pages/Logout';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Inventory />} />
        <Route path='/login' element={<Registration />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
