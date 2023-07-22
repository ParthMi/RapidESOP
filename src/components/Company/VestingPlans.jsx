import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,faUserPlus,faTrashCan,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
const VestingPlans = () => {

  return (
    <div className="container mt-2">
             <span className='fw-bold fs-3'><FontAwesomeIcon icon={faBriefcase} style={{color: "#090c11",}} /> Manage Vesting Plans</span>
       <span className="float-end"><button className='btn btn-dark'  data-bs-toggle="modal" data-bs-target="#exampleModal" style={{fontSize:"15px"}}><FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} /><span className='google-font'> Add Plan</span></button></span><br></br>
     
  

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered google-font">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Plan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="row g-3">

      <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Vesting Period </label>
    <input type="number" class="form-control" id="inputEmail4" required/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Cliff Period</label>
    <input type="number" class="form-control" id="inputEmail4" required/>
  </div>
  <input type="hidden" name="cid" class="form-control" id="inputEmail4" required/>



 


</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark">Save</button>
      </div>
    </div>
  </div>
</div>
     








<div className='container'>

<div className='row google-font'>

<div class="col card text-black m-3" style={{minWidth:"200px",boxShadow:"0 .15rem 1.75rem 0 rgba(58,59,69,.15)",maxWidth:"400px"}}>
  <div class="card-header"><b>Plan ID : #1</b>
  <div className='float-end'>
  <FontAwesomeIcon icon={faTrashCan} size="lg" style={{color: "#ff0000",cursor:"pointer"}} />
  &nbsp;&nbsp;
  <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{color: "black",cursor:"pointer"}} />
  </div>
  </div>
  <div class="card-body">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>






</div>

</div>




    </div>
  );
};

export default VestingPlans;
