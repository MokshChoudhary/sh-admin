import './App.css'
import './css/light_theme.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
