import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <div>
    <SiteNav />
    <Routes>
      <Route path='*' element={<HomePage />} />
      <Route path='/' exact={true} element={<HomePage />} />
    </Routes>
    <SiteFooter />
  </div>
  );
}

export default App;
