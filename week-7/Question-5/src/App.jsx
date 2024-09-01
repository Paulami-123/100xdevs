import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import BusinessCard1 from './components/Cards/BusinessCard1';
import BusinessCard2 from './components/Cards/BusinessCard2';
import BusinessCard3 from './components/Cards/BusinessCard3';
import BusinessCard4 from './components/Cards/BusinessCard4';
import BusinessCard5 from './components/Cards/BusinessCard5';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<CoverPage />} />
      <Route path={'/card1'} element={<BusinessCard1 />} />
      <Route path={'/card2'} element={<BusinessCard2 />} />
      <Route path={'/card3'} element={<BusinessCard3 />} />
      <Route path={'/card4'} element={<BusinessCard4 />} />
      <Route path={'/card5'} element={<BusinessCard5 />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
