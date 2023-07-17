import React from 'react';
import './css/styles.css';
import {Outlet,Link} from 'react-router-dom';

const Layout = () => {

  function close(){

  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }
  }

  return (
    <div class="d-flex" id="wrapper">
  


    <div  id="sidebar-wrapper"  style={{background:"#4e73df",fontFamily: "Nunito,-apple-system,BlinkMacSystemFont",fontSize:"15px"}} >
        {/* <div class="sidebar-heading " style={{background:"#4e73df",color:"white"}}>LOGO</div> */}
        <div class="list-group border" style={{background:"#4e73df"}} >
            <Link to="/Company" class="list-group-item list-group-item-action list-group-item-light p-3" style={{background:"#4e73df",color:"white"}} >Dashboard</Link>
            <Link class="list-group-item list-group-item-action list-group-item-light p-3"  style={{background:"#4e73df",color:"white"}}>Vesting Table</Link>
            <Link to="/Company/Employees" class="list-group-item list-group-item-action list-group-item-light p-3"  style={{background:"#4e73df",color:"white"}}>Employees</Link>
            <Link class="list-group-item list-group-item-action list-group-item-light p-3"  style={{background:"#4e73df",color:"white"}} >ESOP Scheme</Link>
            <Link class="list-group-item list-group-item-action list-group-item-light p-3"  style={{background:"#4e73df",color:"white"}} >Vesting Schedule</Link>
            <Link class="list-group-item list-group-item-action list-group-item-light p-3"  style={{background:"#4e73df",color:"white"}} >Manage Valuation</Link>
         

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


            <Link class="list-group-item list-group-item-action list-group-item-ligth p-3"  style={{background:"#4e73df",color:"white"}} >Company Profile</Link>
        </div>
    </div>


    <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">
                <img onClick={close} id="sidebarToggle" src="https://i.stack.imgur.com/UydTk.png" style={{cursor:"pointer"}} height={14}/>
                <div class="nav" id="navbarSupportedContent">
                    
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#!">Action</a>
                                <a class="dropdown-item" href="#!">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#!">Something else here</a>
                            </div>
                        
                </div>
            </div>
        </nav>
        <div class="container-fluid">

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

export default Layout
