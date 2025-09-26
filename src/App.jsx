import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Header/Navbar";
import Main from "./Components/MainContent/Main";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/MainContent/Home";
import IPO from "./Components/MainContent/IPO";
import NotFound from "./Components/Error/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container-fluid flex-grow-1">
            <div className="row">
              <Sidebar />
              <div className="col-8 col-lg-10 ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ipo/:id" element={<IPO />} />
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
