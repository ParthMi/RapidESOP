const LoginCom = () => {

  return (
    <div class="container mt-5 p-5">
        <h1>Welcome</h1><br></br>
      <form >
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email"
    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" 
    class="form-control" id="exampleInputPassword1" placeholder='Enter Password'/>
  </div><br></br>
  <button type="submit" class="btn btn-dark w-100">
    {
      1===0?
      <div class="spinner-border text-light" role="status">
    </div>:
     <span>Login</span>
    } 

</button>
{/* <center style={{color :`red`}}>{error}</center> */}
  <hr></hr>
  Don't have an account yet ? <a href="./RegisterCompany" class="text-decoration-none">Register</a>

</form>
    </div>
  )
}

export default LoginCom