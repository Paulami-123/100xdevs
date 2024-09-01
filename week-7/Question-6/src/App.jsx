import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage"
import VerificationPage from "./components/VerificationPage"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/verification" element={<VerificationPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}



export default App
