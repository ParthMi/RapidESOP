import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import load from './load.png'
import './Employee/css/styles.css'

const Login = () => {

    const navigate=useNavigate();
  
    useEffect(()=>{
      if(localStorage.getItem("status")==="0"){
        navigate("/")
      }
      if(localStorage.getItem("cname")!=null){
        navigate("/Company")
      }
      if(localStorage.getItem("fname")!=null){
        navigate("/Employee")
      }
    },[])

    
    return (
        <div className='container bg-light p-5 mt-5' style={{  boxShadow:" 0 .15rem 1.75rem 0 rgba(58,59,69,.55)",borderRadius:"60px"}}>
            <center className='container mt-5'>
           <span className="logo-font fs-2"> 
           <h1><b><img src={load}  height={"80px"} style={{ }} /> RAPID ESOP</b></h1></span>    </center><br></br><br></br>
            <div class="container d-grid gap-3 mt-5">
                <center><Link to="/LoginCompany"><button class="btn btn-outline-dark p-2" type="button"><b>Login as Company</b></button></Link></center>
                <center><Link to="/LoginEmployee"><button class="btn btn-outline-dark p-2" type="button"><b>Login as Employee</b></button></Link></center>
            </div>
            <br></br>
            <center><hr class="col-3"></hr></center>
            <br></br>

            <center><Link to="/RegisterCompany"><button class="btn btn-dark p-2" type="button"><b>Register a Company</b></button></Link></center>
        </div>
    )
}

export default Login
