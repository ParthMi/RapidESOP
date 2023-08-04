import React, { useEffect, useState } from 'react'
import "./css/styles.css"
import load from "../load.png"
import BaseUrl from "../API/Api"
const Profile = () => {

  const [profiledata, setProfiledata] = useState([]);
  const cid = localStorage.getItem("cid");

  const [cname, setCname] = useState();
  const [ceo, setCeo] = useState();
  const [funding, setFunding] = useState();
  const [valuation, setValuation] = useState();
  const [esop, setEsop] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [email,setEmail]=useState();
  const [price,setPrice]=useState();
  const [password,setPassword]=useState();
  const [updatemsg, setUpdatemsg] = useState("");
  const [updatetimeout,setUpdatetimeout]=useState(false);
  const [loader,setLoader]=useState(false);


  useEffect(() => {
    setLoader(true)
    async function profile() {

      // setSpinner(true);

      fetch(BaseUrl+'/company/' + cid + '')
        .then((response) => response.json())
        .then((json) => {
          setLoader(true)

          setProfiledata(json);
          console.log(profiledata.cname);
          setCname(json.cname)
          setCeo(json.ceo)
          setFunding(json.funding)
          setValuation(json.valuation)
          setEsop(json.esop)
          setMobile(json.mobile)
          setAddress(json.address)
          setEmail(json.email)
          setPassword(json.password)
          setPrice(json.price)
        })
    }
    profile();
  }, [])







  let update = async (e) => {
    e.preventDefault();
    setLoader(true)

    try {
      let res = await fetch(BaseUrl+'/company/' + cid + '', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cname: cname,
          ceo: ceo,
          funding: funding,
          valuation: valuation,
          esop: esop,
          mobile: mobile,
          address: address,
          email:email,
          password:password,
          price:price
        })
      });
      let resJson = await res.json();
      if (resJson) {
        setLoader(false)
        setProfiledata(resJson.data)
        setUpdatemsg(resJson.meassage)
        // console.log(resJson)
        setUpdatetimeout(true)
        setTimeout(function(){
          setUpdatetimeout(false)
        }
        , 3000)
      } else {
        alert("something went wrong!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  return (
    <div>

      {updatetimeout ? 
      <div class="alert alert-success mt-2" role="alert">
          <b>{updatemsg}</b>
        </div>
      :
        <div>
        </div>
      }


{loader &&
<div className="text-center " style={{width:"90%",zIndex:"11"}} >
<img src={load} className='loader  position-absolute' height={"80px"} style={{marginTop:"245px"}}/>
</div>
}
      <div class="row d-flex h-100 google-font mt-3 shdw">

        <div class="col">

          <div class="card">
            <div class="text-white d-flex flex-row" style={{ backgroundColor: "#3498eb", height: "200px" }}>
              <div class="ms-4 d-flex flex-column " style={{ width: "150px", marginTop: "70px" }}>
                <div style={{ width: "150px", zIndex: "1", fontSize: "105px", background: "white", color: "#000" }} class="rounded shdw border border-5" ><center>{profiledata.cname != null ? profiledata.cname[0].toUpperCase() : profiledata.cname}</center></div>
                <button type="button" class="btn btn-outline-dark mt-2 shdw" data-mdb-ripple-color="dark"
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                  style={{ zIndex: "1" }}>
                  Edit profile
                </button>
              </div>
              <div class="ms-3" style={{ marginTop: "130px" }}>
                <div>
                  <h5>{profiledata.cname}</h5>
                  <p>{profiledata.address}</p>
                </div>

              </div>
            </div>
            <div class="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
              <div class="d-flex justify-content-end text-center py-1">
                <div>
                  <p class="mb-1 h5">253</p>
                  <p class="small text-muted mb-0">Employees</p>
                </div>
                <div class="px-3">
                  <p class="mb-1 h5">{profiledata.price}</p>
                  <p class="small text-muted mb-0">ESOP price</p>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black shdw">
              <div className='d-flex gap-3'>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">Company Name</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{profiledata.cname}</p>
                  </div>
                </div>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">CEO</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{profiledata.ceo}</p>
                  </div>
                </div>
              </div>



              <div className='d-flex  gap-3'>
                <div class="mb-5 w-50">
                  <p class="lead fw-normal mb-1">Funding</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{profiledata.funding}</p>
                  </div>
                </div>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">Valuation</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{profiledata.valuation}</p>
                  </div>
                </div>




              </div>



              <div class="mb-5">
                <p class="lead fw-normal mb-1">Contact details</p>
                <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                  <p><b>Email  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>  {localStorage.getItem("email")}</p>
                  <p><b>Mobile &nbsp;&nbsp;&nbsp;&nbsp;</b>  {profiledata.mobile}</p>
                  <p><b>Address &nbsp;&nbsp;</b>  {profiledata.address}</p>

                </div>
              </div>




            </div>

          </div>
        </div>














        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered google-font">
            <div class="modal-content">
              <form>
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">


                  <div className='row'>
                    <br></br>
                    <div class="form-group mb-3 col-md-6">

                      <label for="inputEmail4" class="form-label">Company name</label>
                      <input type="text"
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
                    <div class="form-group mb-3 col-md-6">
                      <label for="inputCity" class="form-label">Total No. of ESOP</label>
                      <input type="number"
                        value={esop}
                        onChange={(e) => setEsop(e.target.value)}
                        class="form-control" required />
                    </div></div>
                    <div class="form-group mb-3 col-md-6">
                      <label for="inputCity" class="form-label">Price of ESOP</label>
                      <input type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        class="form-control" required />
                    </div>



                  <div class="form-group mb-3">
                    <label for="inputCity" class="form-label">Address</label>
                    <input type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      class="form-control" required />
                  </div>

               




                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={update} data-bs-dismiss="modal" class="btn btn-dark">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>




      </div>

    </div>



















  )
}

export default Profile
