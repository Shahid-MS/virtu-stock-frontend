
import Home from "./Home";
import "./main.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const main = () => {
  return (
    <div className="col-8 col-lg-10 ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default main;
