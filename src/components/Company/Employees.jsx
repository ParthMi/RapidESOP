import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,faUserPlus } from '@fortawesome/free-solid-svg-icons'
import "./css/styles.css"
const Employees = () => {
  return (
    <div className='container p-3'>
       <span className='fw-bold fs-3'><FontAwesomeIcon icon={faBriefcase} style={{color: "#090c11",}} /> Employees</span>
       <span className="float-end"><button className='btn btn-dark'  data-bs-toggle="modal" data-bs-target="#exampleModal" style={{fontSize:"15px"}}><FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} /><span className='google-font'> Add Employee</span></button></span><br></br>
     
  

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered google-font">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="row g-3">

      <div class="col-md-6">
    <label for="inputEmail4" class="form-label">First Name</label>
    <input type="text" class="form-control" id="inputEmail4" placeholder='Enter first name' required/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="inputEmail4" placeholder='Enter last name' required/>
  </div>

  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email-id' required/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password' required/>
  </div>


  <div class="col-12">
    <label for="inputAddress" class="form-label">Mobile no.</label>
    <input type="text" class="form-control" id="inputAddress" placeholder='Enter mobile no.' required/>
  </div>
  

  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder='Enter Address' required/>
  </div>
 


  <div class="col-md-4">
    <label for="inputEmail4" class="form-label">Joining date</label>
    <input type="date" class="form-control" id="inputEmail4" required/>
  </div>
  <div class="col-md-3">
    <label for="inputEmail4" class="form-label">No. of ESOPs</label>
    <input type="text" class="form-control" id="inputEmail4" required/>
  </div>
  <div class="col-md-5">
    <label for="inputEmail4" class="form-label">Vesting Schedule ID</label>
    <input type="text" class="form-control" id="inputEmail4" required/>
  </div>




</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark">Save changes</button>
      </div>
    </div>
  </div>
</div>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
      <table class="table">
  <thead>
    <tr>
      <th scope="col">EmpID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Joining Date</th>
      <th scope="col">No. of ESOP</th>
      <th scope="col">Vesting plan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>   
  </tbody>
</table>
    </div>
  )
}

export default Employees
