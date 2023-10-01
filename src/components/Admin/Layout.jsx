import React, { useEffect, useState } from 'react';
import './css/styles.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faArrowRightFromBracket, faBell, faBullhorn,faUsers,faBriefcase,faMoneyBillTransfer,faUser,faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import load from '../load.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../API/Api'

const Layout = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("cname");
  const [announcement, setAnnouncement] = useState("");
  const tost = (message) => toast.success(message);
  const cid = localStorage.getItem("cid");
  const [notifications,setNotifications]=useState();
  const [change,setChange]=useState(0);
  const [contactmsg,setContactmsg]=useState();

  useEffect(() => {
    if (localStorage.getItem("status") === "0") {
      navigate("/")
    }
    async function getAllNotification() {
      fetch(BaseUrl + '/notification/company/' + cid + '')
        .then((response) => response.json())
        .then((json) => {
          setNotifications(json.reverse());
        })
    }

    async function getcontactmsg() {
      fetch(BaseUrl + '/api/company/' + cid + '/contact')
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data)
          setContactmsg(json.data.reverse());
        })
    }
    getcontactmsg();
    getAllNotification();
  }, [change])


  let announce = async (e) => {
    e.preventDefault();
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = +day + "/" + month + "/" + date.getFullYear() % 100 + "  " + hours + ':' + minutes + ' ' + ampm;

    try {
      let res = await fetch(BaseUrl + '/notification/company/' + cid + '/send', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notification: announcement,
          time: strTime
        })
      });
      let resJson = await res.json();
      if (resJson) {
        setAnnouncement("")

        if (resJson.status === "OK") {
          tost(resJson.meassage)
          setChange(change+1)
        }
      } else {
        tost("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  function logout() {
    localStorage.removeItem("cname");
    localStorage.removeItem("email");
    localStorage.removeItem("cid");
    localStorage.setItem("status", "0");
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div id="sidebar-wrapper" class="gg" style={{ background: "#000000", fontFamily: "Nunito,-apple-system,BlinkMacSystemFont", fontSize: "15px" }} >
        {/* <div class="sidebar-heading " style={{background:"#4e73df",color:"white"}}>LOGO</div> */}
        <div className='google-font' style={{ background: "transparent", width: "240px", }} >
          <Link to="/admin" class="list-group-item  p-3 hover-eff"  ><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
          {/* <Link class="list-group-item list-group-item-action list-group-item-light p-3" style={{ background: "#4e73df", color: "white" }}>Vesting Table</Link> */}
          <Link to="/admin/allcomp" class="list-group-item  p-3 hover-eff" ><FontAwesomeIcon icon={faUsers} /> All companies</Link>
        
          <Link to="/Company/contact_rapid" class="list-group-item  p-3 hover-eff">Contact to<span className="logo-font"> <img src={load} height={"40px"} /><b> RAPID ESOP</b></span>
</Link>
          <center><button className='btn btn-outline-danger col-6' style={{marginTop:"50%"}} onClick={logout}>Logout</button></center>
         
        </div>
      </div>


      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom ">
          <div class="container-fluid">
            <img onClick={close} id="sidebarToggle" src="https://i.stack.imgur.com/UydTk.png" style={{ cursor: "pointer" }} height={14} />

            <span className="logo-font fs-2"> <img src={load} height={"40px"} /><b> RAPID ESOP</b><span> ADMIN</span></span>
            <div class="nav" id="navbarSupportedContent">



              <span style={{ cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingannounce" aria-controls="offcanvasScrolling" class="nav-link p-2 mt-1"><FontAwesomeIcon icon={faBullhorn} style={{ color: "#000", }} size="xl" /></span>

              <span style={{ cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" class="nav-link p-2 mt-1"><FontAwesomeIcon icon={faBell} style={{ color: "#000", }} size="xl" /></span>

              <a class="nav-link dropdown-toggle" style={{ color: "black" }} id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><button type="button" className="btn btn-dark shdw">{localStorage.getItem("cname") != null ? localStorage.getItem("cname")[0].toUpperCase() : localStorage.getItem("cname")}</button>
              </a>



              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <center>
                  <Link to="/Company/Profile" class="dropdown-item"><b>Profile</b></Link>
                  <div class="dropdown-divider"></div>
                  <button class="btn btn-outline-danger " onClick={logout}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                </center></div>



            </div>
          </div>
        </nav>




        <div class="container-fluid">
          <div class="offcanvas offcanvas-end google-font" data-bs-scroll="true" style={{ fontSize: "15px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(15px)", borderStartStartRadius: "35px", borderEndStartRadius: "35px", border: "0.2px solid silver" }} data-bs-backdrop="false" tabindex="-1" id="offcanvasScrollingannounce" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header" style={{ background: "rgba(255,255,255,0.7)" }}>
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel"><b><FontAwesomeIcon icon={faBullhorn} style={{ color: "#4e73df", }} size="lg" /> Announcement</b></h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div class="form-floating">
                <form onSubmit={(e) => announce(e)}>
                  <textarea class="form-control"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    placeholder="Leave a Announcement here " id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                  <br></br>
                  <button className="btn btn-primary float-end" style={{ width: "100%" }}>Notify</button>
                  
                </form>
              </div>
              <br></br><br></br><hr></hr>
              <h5>Recent Announcements</h5>
              { notifications?.map((n)=>{
                return (
                  <div class="alert alert-primary alert-dismissible fade show text-dark" role="alert">
                <p><strong><button
                          style={{ width: "35px", height: "35px" }}
                          className="btn bg-dark bg-opacity-25 text-dark d-inline rounded-circle text-uppercase shdw"
                        >{n.company.cname[0]}</button>&nbsp;{n.company.cname}</strong><span class="float-end">{n.time}</span></p> {n.notification}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                )
              })}
            </div>
            
          </div>







          <div class="offcanvas offcanvas-end google-font" data-bs-scroll="true" style={{ fontSize: "15px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(15px)", borderStartStartRadius: "35px", borderEndStartRadius: "35px", border: "0.2px solid silver" }} data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header" style={{ background: "rgba(255,255,255,0.7)" }}>
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel"><b><FontAwesomeIcon icon={faBell} style={{ color: "#4e73df", }} size="lg" /> Notifications</b></h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            { contactmsg?.map((contact)=>{
                return (
                  <div class="alert alert-primary alert-dismissible fade show text-dark" role="alert">
                <p><strong> <button
                          style={{ width: "35px", height: "35px" }}
                          className="btn bg-dark bg-opacity-25 text-dark d-inline rounded-circle text-uppercase shdw"
                        >{contact.emp.fname[0]}</button>&nbsp;{contact.emp.fname} {contact.emp.lname}</strong>
                <br></br><span style={{fontSize:"12px"}}>{contact.email}</span>
                <span class="float-end"></span></p>{contact.message}
                <br></br>
                <span className="float-end p-0" style={{marginTop:"-5px",marginRight:"-20px",fontSize:"12px"}} >{contact.time}</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                )
              })}
            </div>
          </div>



          <Outlet />

        </div>
      </div>
    </div>
  )
}

export default Layout
