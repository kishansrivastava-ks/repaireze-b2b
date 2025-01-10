import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/MainLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import ElectricalAppliances from "./pages/Services/ElectricalAppliances";
import DeepCleaning from "./pages/Services/DeepCleaning";
import PestControl from "./pages/Services/PestControl";
import Plumbing from "./pages/Services/Plumbing";
import Carpentry from "./pages/Services/Carpentry";
import Electrical from "./pages/Services/Electrical";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route
              path="services/electrical-appliances"
              element={<ElectricalAppliances />}
            />
            <Route path="services/deep-cleaning" element={<DeepCleaning />} />
            <Route path="services/pest-control" element={<PestControl />} />
            <Route path="services/plumbing" element={<Plumbing />} />
            <Route path="services/carpentry" element={<Carpentry />} />
            <Route path="services/electrical" element={<Electrical />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
