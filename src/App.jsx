import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/MainLayout";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
