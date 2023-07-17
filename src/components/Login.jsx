import React from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className='container'>
            <center className='container mt-5'><h1>LOGO</h1></center><br></br><br></br><br></br>
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
