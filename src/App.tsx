import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import IPO from "./pages/IPO/IPO";
import CompareIPO from "./pages/Comparison/CompareIPO";
import GMPIPO from "./pages/GMP/GMPIPO";
import AdminHome from "./pages/Admin/Dashboard/AdminHome";
import UpdateIPO from "./pages/Admin/IPO/UpdateIpo";
import { useEffect } from "react";
import UserHome from "./pages/User/Dashboard/UserHome";
import UpdateAppliedIPO from "./pages/User/Dashboard/AppliedIPO/UpdateAppliedIPO";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
  }, []);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Home */}
            <Route index path="/" element={<Home />} />

            {/* IPO */}
            <Route path="/ipo">
              <Route path="compare" element={<CompareIPO />} />
              <Route path=":id" element={<IPO />} />
              <Route path="gmp/:id" element={<GMPIPO />} />
            </Route>

            {/* Admin */}
            <Route path="/admin">
              <Route path="ipo" element={<AdminHome />} />
              <Route path="ipo/:id" element={<UpdateIPO />} />
            </Route>

            {/* User */}
            <Route path="/user">
              <Route path="" element={<UserHome />} />
              <Route path="applied-ipo/:id" element={<UpdateAppliedIPO/>} />
            </Route>

            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );

  function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() > payload.exp * 1000;
  }
}
