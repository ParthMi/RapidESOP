import React,{useEffect, useState} from 'react';
import './css/styles.css';
import { Outlet, Link ,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faArrowRightFromBracket, faBell, faCalculator,faList,faFile,faCreditCard,faMoneyBillTransfer,faInfo,faUser,faQuestion } from '@fortawesome/free-solid-svg-icons'
import load from "../load.png"
import BaseUrl from '../API/Api'


const EmpLayout = () => {
  const navigate=useNavigate();
  const username=localStorage.getItem("fname");
  const cid=localStorage.getItem("cid");
  const [notifications,setNotifications]=useState();

  
  useEffect(()=>{
    if(localStorage.getItem("status")==="0"){
      navigate("/")
    }
    async function getAllNotification() {
      fetch(BaseUrl + '/notification/company/' + cid + '')
        .then((response) => response.json())
        .then((json) => {
          setNotifications(json.reverse());
        })
    }
    getAllNotification();
  },[])



  function logout(){
      localStorage.removeItem("fname");
      localStorage.removeItem("email");
      localStorage.removeItem("cid");
      localStorage.removeItem("eid");
      localStorage.setItem("status","0");
      navigate("/")
  }



  function close() {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
  }

  return (
    <div class="d-flex" id="wrapper">



      <div id="sidebar-wrapper" class="gg" style={{background:"#000000" , fontFamily: "Nunito,-apple-system,BlinkMacSystemFont", fontSize: "15px" }} >
        {/* <div class="sidebar-heading " style={{background:"#4e73df",color:"white"}}>LOGO</div> */}
        <div className='google-font' style={{ background: "transparent", width: "240px", }} >
          <Link to="/Employee" class="list-group-item  p-3 hover-eff" ><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
          {/* <Link class="list-group-item list-group-item-action list-group-item-light p-3" style={{ background: "#4e73df", color: "white" }}>Vesting Table</Link> */}
          {/* <Link to="/Employee/Employees" class="list-group-item t p-3 hover-eff" >Employees</Link> */}
          <Link to="/Employee/MyPlan" class="list-group-item t p-3 hover-eff" ><FontAwesomeIcon icon={faCalculator} /> My vesting plan</Link>
          <Link to="/Employee/Allcompany" class="list-group-item t p-3 hover-eff" ><FontAwesomeIcon icon={faList} /> All Companies</Link>
          <Link to="/Employee/Empbuysell" class="list-group-item t p-3 hover-eff" ><FontAwesomeIcon icon={faCreditCard} /> Buy / Sell</Link>
          <Link to="/Employee/EmpTransactions" class="list-group-item t p-3 hover-eff" ><FontAwesomeIcon icon={faMoneyBillTransfer} /> Transactions</Link>


          {/* <button class="list-group-item list-group-item-action list-group-item-light p-3 btn btn-secondary dropdown-toggle"  style={{background:"#4e73df",color:"white"}}   type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul> */}

<Link to="/Employee/EsopScheme" class="list-group-item  p-3 hover-eff"><FontAwesomeIcon icon={faInfo} /> ESOP Scheme</Link>
          <Link to="/Employee/EmpProfile" class="list-group-item  p-3 hover-eff" ><FontAwesomeIcon icon={faUser} /> Profile</Link>
          <Link to="/Employee/FAQs" class="list-group-item  p-3 hover-eff" ><FontAwesomeIcon icon={faQuestion} /> FAQs</Link>
          <Link to="/Employee/contact_company" class="list-group-item  p-3 hover-eff" > Contact to Company</Link>
          <Link to="/Employee/privacy-policy" class="list-group-item  p-3 hover-eff"><FontAwesomeIcon icon={faFile} /> Privacy Policy</Link>
          <center><button className='btn btn-outline-danger col-6'  onClick={logout} >Logout &nbsp;<FontAwesomeIcon icon={faArrowRightFromBracket} /></button></center>
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div class="container-fluid">
            <img onClick={close} id="sidebarToggle" src="https://i.stack.imgur.com/UydTk.png" style={{ cursor: "pointer" }} height={14} />
           <span className="logo-font fs-2"> <img src={load}  height={"40px"} style={{ }} /><b> RAPID ESOP</b></span>
            <div class="nav" id="navbarSupportedContent">


              <span style={{ cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" class="nav-link p-2 mt-1"><FontAwesomeIcon icon={faBell} style={{ color: "#000", }} size="xl" /></span>

              <a class="nav-link dropdown-toggle" style={{ color: "black" }} id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><button type="button" className="btn btn-dark shdw">{localStorage.getItem("fname")!=null ? localStorage.getItem("fname")[0].toUpperCase()  : localStorage.getItem("fname")}</button>
              </a>



              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <center>
                <Link to="/Employee/EmpProfile" class="dropdown-item"><b>Profile</b></Link>
                <div class="dropdown-divider"></div>
                <button onClick={logout} class="btn btn-outline-danger ">Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                </center></div>



            </div>
          </div>
        </nav>




        <div class="container-fluid">

          <div class="offcanvas offcanvas-end google-font" data-bs-scroll="true" style={{ fontSize: "15px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(15px)", borderStartStartRadius: "35px", borderEndStartRadius: "35px", border: "0.2px solid silver" }} data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header" style={{ background: "rgba(255,255,255,0.7)" }}>
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel"><b><FontAwesomeIcon icon={faBell} style={{ color: "#4e73df", }} size="lg" /> Notifications</b></h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              { notifications?.map((n)=>{
                return (
                  <div class="alert alert-primary alert-dismissible fade show text-dark" role="alert">
                <p><strong>{n.company.cname}</strong><span class="float-end">{n.time}</span></p> {n.notification}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                )
              })}


            </div>
          </div>



          <Outlet />
          {/* 
        <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button> */}



        </div>
      </div>
    </div>
  )
}

export default EmpLayout
