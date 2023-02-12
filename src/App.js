import "./App.css";
import React from "react";
import Nav from "./components/Navbar";
import Foo from "./components/Footer";
import Home from "./components/Home";
import Jobvacancy from "./components/Jobvacancy";
import Detailjob from "./components/Detailjob";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Layout from "./Layout/Layout";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Dashboardlayout from "./Layout/Dashboardlayout";
import Table from "./components/Tabledashboard";
import Changepassword from "./components/Changepassword";
import Formdata from "./pages/FormPages";
import JobList from "./pages/JobList";
import { GlobalProvider } from "./Context/GlobalContext";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/Job-vacancy"
              element={
                <Layout>
                  <Jobvacancy />
                </Layout>
              }
            />
            <Route
              path="/Job-vacancy/:idData"
              element={
                <Layout>
                  <Detailjob />
                </Layout>
              }
            />
            <Route path="/Login" element={<Loginpage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Dashboard" element={<Dashboardlayout />} />
            <Route path="/Dashboard/list-job-vacancy" element={<JobList />} />
            <Route
              path="/Dashboard/list-job-vacancy/form"
              element={<Formdata />}
            />
            <Route
              path="/Dashboard/list-job-vacancy/form/:idData"
              element={<Formdata />}
            />
            <Route
              path="/Dashboard/list-job-vacancy/profile"
              element={
                <Dashboardlayout>
                  <Profile />
                </Dashboardlayout>
              }
            />
            <Route
              path="/Dashboard/list-job-vacancy/change-password"
              element={
                <Dashboardlayout>
                  <Changepassword />
                </Dashboardlayout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <PageNotFound />
                </Layout>
              }
            />
          </Routes>
          <Foo />
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
