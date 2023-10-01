import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import load from './load.png'
import './Employee/css/styles.css'
import BaseUrl from './API/Api';

const RegisterCom = () => {

  const navigate = useNavigate();

  const [cname, setCname] = useState("");
  const [ceo, setCeo] = useState("");
  const [funding, setFunding] = useState();
  const [valuation, setValuation] = useState();
  const [esop, setEsop] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [price,setPrice]=useState();




  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl+'/company/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
        ,
        body: JSON.stringify({
          cname: cname,
          ceo: ceo,
          funding: funding,
          valuation: valuation,
          esop: esop,
          mobile: mobile,
          address: address,
          email: email,
          password: password,
          price:price
        })
      });
      let resJson = await res.json();
      if (resJson) {


        setCname("");
        setCeo("");
        setFunding();
        setValuation();
        setEsop();
        setMobile();
        setAddress("");
        setEmail("");
        setPassword("");


        setMessage(resJson.message);
        if (resJson.status === "OK") {

          localStorage.setItem('status', 1);
          localStorage.setItem('cid', resJson.data.cid);
          localStorage.setItem('cname', cname);
          localStorage.setItem('email', email);

          navigate("/Company");
        }
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };











  return (
    <div className="google-font">

      {/* <form class="row g-3">
      <div class="col-12">
    <label for="inputEmail4" class="form-label">Company name</label>
    <input type="text "
    value={cname}
    onChange={(e) => setCname(e.target.value)}
    class="form-control" required/>
  </div>
 
  <div class="col-12">
    <label for="inputAddress2" class="form-label">CEO</label>
    <input type="text"
      value={ceo}
      onChange={(e) => setCeo(e.target.value)}
    class="form-control" required/>
  </div>

  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Funding</label>
    <input type="number"
     value={funding}
     onChange={(e) => setFunding(e.target.value)}
    class="form-control" required/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Valuation</label>
    <input type="number" 
     value={valuation}
     onChange={(e) => setValuation(e.target.value)}
    class="form-control"  required/>
  </div>

  <div class="col-md-6">
  <label for="inputCity" class="form-label">Mobile no.</label>
    <input type="text"
     value={mobile}
     onChange={(e) => setMobile(e.target.value)}
    class="form-control"  required/>
  </div>
  <div class="col-md-6">
  <label for="inputCity" class="form-label">Total No. of ESOP</label>
    <input type="number"
     value={esop}
     onChange={(e) => setEsop(e.target.value)}
    class="form-control"  required/>
  </div>
  
 

  <div class="col-12">
    <label for="inputCity" class="form-label">Address</label>
    <input type="text" 
     value={address}
     onChange={(e) => setAddress(e.target.value)}
    class="form-control"  required/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    class="form-control" required/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    class="form-control"  required/>
  </div>
 
  <div class="col-12">
    <center><button type="submit" onClick={handleSubmit} class="btn btn-dark col-8 mx-auto">Register</button>
    <p className='google-font' style={{color:"red"}}>{message}</p>
    </center>
    
    <center><hr className='col-4'></hr>
  Already have an account ? <a href="./LoginCompany" class="text-decoration-none">Login</a></center>
<br></br>
  </div>
</form> */}





      <div class="container-fluid">
        <div class="row no-gutter">
          <div class="col-md-6 d-none d-md-flex bg-image">  <div class="centered" style={{ color: "white", marginLeft: "35%", marginTop: "30%", }}><h1> <span className="logo-font fs-2">
       <h1><b><img src={load}  height={"80px"} style={{ }} /> RAPID ESOP</b></h1></span></h1></div>
          </div>


          <div class="col-md-6 bg-light">
            <div class="login d-flex align-items-center py-2">

              <div class="container">
                <div class="row">
                  <div class="col-lg-10 col-xl-10 mx-auto">
                    <h4 class="display-5 google-font">Register</h4>
                    <form>
                      <div className='row'>
                        <div class="form-group mb-3 col-md-6">
                          <label for="inputEmail4" class="form-label">Company name</label>
                          <input type="text "
                            value={cname}
                            onChange={(e) => setCname(e.target.value)}
                            class="form-control" required />
                        </div>

                        <div class="form-group mb-3 col-md-6">
                          <label for="inputAddress2" class="form-label">CEO</label>
                          <input type="text"
                            value={ceo}
                            onChange={(e) => setCeo(e.target.value)}
                            class="form-control" required />
                        </div>
                      </div>
                      <div className='row'>
                        <div class="form-group mb-3 col-md-6">
                          <label for="inputEmail4" class="form-label">Funding</label>
                          <input type="number"
                            value={funding}
                            onChange={(e) => setFunding(e.target.value)}
                            class="form-control" required />
                        </div>
                        <div class="form-group mb-3 col-md-6">
                          <label for="inputPassword4" class="form-label">Valuation</label>
                          <input type="number"
                            value={valuation}
                            onChange={(e) => setValuation(e.target.value)}
                            class="form-control" required />
                        </div>
                      </div>
                      <div className='row'>
                        <div class="form-group mb-3 col-md-6">
                          <label for="inputCity" class="form-label">Mobile no.</label>
                          <input type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            class="form-control" required />
                        </div>
                        <div class="form-group mb-3 col-md-3">
                          <label for="inputCity" class="form-label">Total ESOP</label>
                          <input type="number"
                            value={esop}
                            onChange={(e) => setEsop(e.target.value)}
                            class="form-control" required />
                        </div>
                        
                        <div class="form-group mb-3 col-md-3">
                          <label for="inputCity" class="form-label">Price of ESOP</label>
                          <input type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            class="form-control" required />
                        </div>
                        </div>



                      <div class="form-group mb-3">
                        <label for="inputCity" class="form-label">Address</label>
                        <input type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          class="form-control" required />
                      </div>
                      <div class="form-group mb-3">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control" required />
                      </div>
                      <div class="form-group mb-3">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          class="form-control" required />
                      </div>









                      <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={handleSubmit}>Sign up</button>

                      <p className='google-font' style={{ color: "red" }}>{message}</p>
                      <div class="text-center d-flex justify-content-between mt-4">
                        <p>Have an account ? <Link to="" class="font-italic text-muted">
                          <u>Sign In</u></Link>
                        </p></div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterCom