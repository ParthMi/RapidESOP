import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RegisterCom from './components/RegisterCom';
import LoginCom from './components/LoginCom';
import Login from './components/Login';
import Layout from './components/Company/Layout';
import Dashboard from './components/Company/Dashboard';
import Employees from './components/Company/Employees';
import LoginEmployee from './components/LoginEmployee';
import Profile from './components/Company/Profile';
import VestingPlans from './components/Company/VestingPlans';
import ComNotification from './components/Company/ComNotification';
import EmpNotification from './components/Employee/EmpNotification';
import EmpProfile from './components/Employee/EmpProfile';
import EmpDashboard from './components/Employee/EmpDashboard';
import EmpLayout from './components/Employee/EmpLayout';
import MyPlan from './components/Employee/MyPlan';
import Allcompany from './components/Employee/Allcompany';
import Empbuysell from './components/Employee/Empbuysell';
import EmpTransactions from './components/Employee/EmpTransactions';
// import { useEffect } from 'react';
// import { Email } from './components/Company/Email';
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
            <Route path="/Company/ComNotification" element={<ComNotification />} />
            {/* <Route path="/Company/Email" element={<Email />} /> */}
          </Route>

          <Route path="/Employee" element={<EmpLayout />} >
            <Route index element={<EmpDashboard />} />
            <Route path="/Employee/MyPlan" element={<MyPlan />} />
            <Route path="/Employee/Allcompany" element={<Allcompany />} />
            <Route path="/Employee/Empbuysell" element={<Empbuysell />} />
            <Route path="/Employee/EmpTransactions" element={<EmpTransactions />} />
            <Route path="/Employee/EmpProfile" element={<EmpProfile />} />
            {/* <Route path="/Company/Email" element={<Email />} /> */}
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
