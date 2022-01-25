import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First from './pages/first/First';
import Second from './pages/second/Second';
// import your route components too

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/second" element={<Second />} />
      </Routes>
    </BrowserRouter>
  );
}
