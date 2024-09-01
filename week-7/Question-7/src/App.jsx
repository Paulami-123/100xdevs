import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverPage from "./components/CoverPage";
import BirthDayCard1 from "./components/cards/BirthDayCard1";
import BirthDayCard2 from "./components/cards/BirthDayCard2";
import BirthDayCard3 from "./components/cards/BirthDayCard3";
import BirthDayCard4 from "./components/cards/BirthDayCard4";
import BirthDayCard5 from "./components/cards/BirthDayCard5";
import BirthDayCard6 from "./components/cards/BirthDayCard6";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<CoverPage />} />
        <Route path={'/card1'} element={<BirthDayCard1 />} />
        <Route path={'/card2'} element={<BirthDayCard2 />} />
        <Route path={'/card3'} element={<BirthDayCard3 />} />
        <Route path={'/card4'} element={<BirthDayCard4 />} />
        <Route path={'/card5'} element={<BirthDayCard5 />} />
        <Route path={'/card6'} element={<BirthDayCard6 />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
