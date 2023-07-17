import React from 'react'

const RegisterCom = () => {
  return (
    <div className="container">
        <br></br>
        <h2>Company Registration</h2><br></br>
      <form class="row g-3">
      <div class="col-12">
    <label for="inputEmail4" class="form-label">Company name</label>
    <input type="email" class="form-control" required/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" required/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control"  required/>
  </div>
  <div class="col-md-6">
    <label for="inputAddress" class="form-label">Founder name</label>
    <input type="text" class="form-control"   required/>
  </div>
  <div class="col-md-6">
    <label for="inputAddress2" class="form-label">CEO</label>
    <input type="text" class="form-control" required/>
  </div>
  <div class="col-12">
    <label for="inputCity" class="form-label">Address</label>
    <input type="text" class="form-control"  required/>
  </div>
  <div class="col-md-6">
  <label for="inputCity" class="form-label">Mobile no.</label>
    <input type="text" class="form-control"  required/>
  </div>
  <div class="col-12">
    <center><button type="submit" class="btn btn-dark col-8 mx-auto">Register</button></center>
    <center><hr className='col-4'></hr>
  Already have an account ? <a href="./LoginCompany" class="text-decoration-none">Login</a></center>
<br></br>
  </div>
</form>
    </div>
  )
}

export default RegisterCom