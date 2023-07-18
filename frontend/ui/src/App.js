import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Registration from './pages/Registration';
import Inventory from './pages/Inventory';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Inventory />} />
        <Route path='/login' element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
