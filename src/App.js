import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";
import PastPastes from "./pages/PastPastes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/pastes" element={<PastPastes />} />
        <Route path="/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
