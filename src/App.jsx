import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/MainContent/Home";
import IPO from "./Components/MainContent/IPO";
import NotFound from "./Components/Error/NotFound";
import CompareIPO from "./Components/MainContent/CompareIPO";
import GMP from "./Components/MainContent/GMP";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container-fluid flex-grow-1">
            <div className="row">
              Hello
              <Sidebar />
              <div className="col-8 col-lg-10 ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ipo/:id" element={<IPO />} />
                  <Route path="/ipo/gmp/:id" element={<GMP />} />
                  <Route path="/ipo/compare" element={<CompareIPO />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
