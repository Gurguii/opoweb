import "./assets/css/style.css"
import { Routes, Route, BrowserRouter } from 'react-router';
import { MainLayout } from "./pages/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
