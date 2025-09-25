import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Header/Navbar";
import Main from "./Components/MainContent/Main";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
        <div className="row">
          <Sidebar />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
