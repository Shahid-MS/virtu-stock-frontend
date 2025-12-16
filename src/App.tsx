import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
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

import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import IPO from "./pages/IPO/IPO";
import CompareIPO from "./pages/Comparison/CompareIPO";
import GMPIPO from "./pages/GMP/GMPIPO";

import UpdateIPO from "./pages/Admin/IPO/UpdateIpo";

import { Provider } from "react-redux";
import { store } from "./Store";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./pages/AuthPages/PublicRoute";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import { PaginationProvider } from "./Pagination/IpoPaginationContext";
import { Home } from "./pages/Dashboard/Home";
import AdminHome from "./pages/Admin/Dashboard/AdminHome";

import UserProfile from "./pages/User/Profile/UserProfile";
import UserDashboard from "./pages/User/Dashboard/UserHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppliedIPO from "./pages/User/Dashboard/AppliedIPO/AppliedIPO";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import AboutUs from "./pages/OtherPage/AboutUs";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-center" />
        <ConfirmDialog />
        <Router>
          <ScrollToTop />
          <QueryClientProvider client={queryClient}>
            <Routes>
              {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
                {/* Home */}

                <Route
                  index
                  path="/"
                  element={
                    <PaginationProvider>
                      <Home />
                    </PaginationProvider>
                  }
                />

                <Route path="/ipo">
                  <Route
                    path="compare"
                    element={
                      <PaginationProvider>
                        <CompareIPO />
                      </PaginationProvider>
                    }
                  />
                  <Route path=":id" element={<IPO />} />
                  <Route path="gmp/:id" element={<GMPIPO />} />
                </Route>

                {/* Admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                      <Outlet />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="ipo"
                    element={
                      <PaginationProvider>
                        <AdminHome />
                      </PaginationProvider>
                    }
                  />
                  <Route path="ipo/:id" element={<UpdateIPO />} />
                </Route>

                {/* User */}
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute requiredRoles={["ROLE_USER"]}>
                      <Outlet />
                    </ProtectedRoute>
                  }
                >
                  <Route path="" element={<UserDashboard />} />
                  <Route path="applied-ipo/:id" element={<AppliedIPO />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>

                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />

                {/* Forms */}
                <Route path="/form-elements" element={<FormElements />} />

                {/* Tables */}
                {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

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

                <Route path="/about-us" element={<AboutUs />} />
              </Route>

              {/* Auth Layout */}
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryClientProvider>
        </Router>
      </Provider>
    </>
  );
}
