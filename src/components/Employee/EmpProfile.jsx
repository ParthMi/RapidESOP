import React, { useEffect, useState } from 'react'
import "./css/styles.css"
import load from "../load.png"
import BaseUrl from "../API/Api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpProfile = () => {

  const [emp, setEmp] = useState();
  const eid = localStorage.getItem("eid");

  const [cname, setCname] = useState();
  const [ceo, setCeo] = useState();
  const [accountno, setAccountno] = useState();
  const [ifsc, setIfsc] = useState();
  const [loader, setLoader] = useState(false);
  const [st,setSt]=useState(0);
  const tost = () => toast.success("Profile updated successfully");


  useEffect(() => {
    setLoader(true)
    async function EmpProfile() {

      setLoader(true);

      fetch(BaseUrl + '/api/' + eid + '')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          console.log(json)
          setEmp(json)
        })
    }
    EmpProfile();
  }, [st])







  let update = async (e) => {
    e.preventDefault();
    setLoader(true)

    try {
      let res = await fetch(BaseUrl+'/api/' + eid + '', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address:emp.address,
          department: emp.department,
          email: emp.email,
          exercise:emp.exercise,
          esop:emp.esop,
          fname:emp.fname,
          lname:emp.lname,
          granted:emp.granted,
          joiningdate:emp.joiningdate,
          mobile:emp.mobile,
          password:emp.password,
          status:emp.status,
          company_cid:emp.company.cid,
          vesting_plan_id:emp.vestingPlan.pid,
          account_no:accountno,
          ifscno:ifsc
        })
      });
      let resJson = await res.json();
      if (resJson) {
        setLoader(false)
        console.log(resJson)
        setEmp(resJson)
        setSt(st+1)
        tost();
      } else {
        alert("something went wrong!")
      }
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div>

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


      {loader &&
        <div className="text-center " style={{ width: "90%", zIndex: "11" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "245px" }} />
        </div>
      }
      <div class="row d-flex h-100 google-font mt-3 shdw">

        <div class="col">

          <div class="card">
            <div class="text-white d-flex flex-row" style={{ backgroundColor: "#3498eb", height: "200px" }}>
              <div class="ms-4 d-flex flex-column " style={{ width: "150px", marginTop: "70px" }}>
                <div style={{ width: "150px", zIndex: "1", fontSize: "105px", background: "white", color: "#000" }} class="rounded shdw border border-5" ><center>{emp?.fname != null ? emp?.fname[0].toUpperCase() : emp?.fname}</center></div>
                <button type="button" class="btn btn-outline-dark mt-2 shdw" data-mdb-ripple-color="dark"
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                  style={{ zIndex: "1" }}>
                  Edit Profile
                </button>
              </div>
              <div class="ms-3" style={{ marginTop: "130px" }}>
                <div>
                  <h5>{emp?.fname} {emp?.lname}</h5>
                  <p>{emp?.department}</p>
                </div>

              </div>
            </div>
            <div class="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
              <div class="d-flex justify-content-end text-center py-1">
                <div>
                  <p class="mb-1 h5">{emp?.granted}</p>
                  <p class="small text-muted mb-0">Granted ESOP</p>
                </div>
                <div class="px-3">
                  <p class="mb-1 h5">{emp?.price}</p>
                  <p class="small text-muted mb-0">Base ESOP price</p>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black shdw">
              <div className='d-flex gap-3'>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">Total ESOP</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{emp?.esop}</p>
                  </div>
                </div>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">Granted ESOP</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{emp?.granted}</p>
                  </div>
                </div>
              </div>



              <div className='d-flex  gap-3'>
                <div class="mb-5 w-50">
                  <p class="lead fw-normal mb-1">Exercise ESOP</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{emp?.exercise}</p>
                  </div>
                </div>
                <div class="mb-5 w-50" >
                  <p class="lead fw-normal mb-1">Valuation</p>
                  <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                    <p class="font-italic mb-1">{emp?.granted * emp?.price}</p>
                  </div>
                </div>




              </div>

              <div className='row'>
                <div className="col">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">Contact details</p>
                    <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                      <p><b>Email  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>  {emp?.email}</p>
                      <p><b>Mobile &nbsp;&nbsp;&nbsp;&nbsp;</b>  {emp?.mobile}</p>
                      <p><b>Address &nbsp;&nbsp;</b>  {emp?.address}</p>

                    </div>
                  </div>
                </div>
                <div className="col">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">Bank details</p>
                    <div class="p-4 shdw" style={{ backgroundColor: "#f8f9fa" }}>
                      <p><b>Account No.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>  {emp?.account_no}</p>
                      <p><b>IFSC code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>  {emp?.ifscno}</p>

                    </div>
                  </div>
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
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Update details</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">


                  <div className='row'>
                    <br></br>
                    <div class="form-group mb-3 col-md-6">

                      <label for="inputEmail4" class="form-label">Account No.</label>
                      <input type="text"
                        value={accountno}
                        onChange={(e) => setAccountno(e.target.value)}
                        class="form-control" required />
                    </div>

                    <div class="form-group mb-3 col-md-6">
                      <label for="inputAddress2" class="form-label">IFSC code</label>
                      <input type="text"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value)}
                        class="form-control" required />
                    </div>
                  </div>





                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" data-bs-dismiss="modal" onClick={update} class="btn btn-dark">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>




      </div>

    </div>



















  )
}

export default EmpProfile
