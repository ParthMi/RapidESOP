import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterCom from './components/RegisterCom';
import LoginCom from './components/LoginCom';
import Login from './components/Login';
import Layout from './components/Company/Layout';
import Dashboard from './components/Company/Dashboard';
import Employees from './components/Company/Employees';
import LoginEmployee from './components/LoginEmployee';
import Profile from './components/Company/Profile';
import VestingPlans from './components/Company/VestingPlans';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/RegisterCompany" element={<RegisterCom />} />
          <Route path="/LoginCompany" element={<LoginCom />} />
          <Route path="/LoginEmployee" element={<LoginEmployee />} />
          <Route path="/" element={<Login />} />
          <Route path="/Company" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="/Company/Employees" element={<Employees />} />
            <Route path="/Company/Profile" element={<Profile />} />
            <Route path="/Company/VestingPlans" element={<VestingPlans />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
