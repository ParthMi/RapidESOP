import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import "./css/styles.css"
import load from "../load.png"
import BaseUrl from '../API/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom"



const Employees = () => {
  const cid = localStorage.getItem("cid");

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [joiningDate, setJoiningDate] = useState();

  //if we have to add plan details manually then uncomment next line
  // const [pid, setPid] = useState();

  const [esop, setEsop] = useState();
  const [granted, setGranted] = useState();
  const [exercise, setExercise] = useState();
  const [department, setDepartment] = useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Active");
  const [employees, setEmployees] = useState();
  const [st, setSt] = useState(0);
  const [loader, setLoader] = useState(false);

  //if we have to add more than one plan that convert variable to array
  const [selectplan, setSelectPlan] = useState();
  const [noplanexist, setnoplanexist] = useState(false);

  const tost = (message) => toast.success(message);






  //send mail
  const form = useRef();





  let deleteEmp = async (e, eid) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl + '/api/' + eid, {
        method: 'DELETE'
      })
      let resJson = await res.json();
      if (resJson) {
        setSt(st + 1)
        setMessage(resJson.meassage);
        if (resJson.status === "OK") {
          tost(resJson.meassage);

        }
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    setLoader(true)
    async function getallemp() {
      setLoader(true);
      fetch(BaseUrl + '/api/company/' + cid + '/employee')
        .then((response) => response.json())
        .then((json) => {
          setEmployees(json)
          console.log(employees)
        })
    }
    async function getplan() {
      fetch(BaseUrl + '/vplan/company/' + cid + '/plans')
        .then((response) => response.json())
        .then((json) => {
          if (json.data) {
            if (json.data.length === 0) {
              setnoplanexist(true)
            }
          }
          setSelectPlan(json.data[0]?.pid)
          console.log(json.data[0]?.pid)
          setLoader(false)
        });

    } getplan();
    getallemp();

  }, [st])




  let addemp = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl + '/api/company/' + cid + '/plan/' + selectplan + '/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          mobile: mobile,
          address: address,
          joiningDate: joiningDate,
          esop: esop,
          department: department,
          company_id: cid,
          status: status
        })
      });
      let resJson = await res.json();
      if (resJson) {

        console.log(resJson)

        setFname("")
        setLname("")
        setEmail("")
        setPassword("")
        setMobile()
        setAddress("")
        setJoiningDate()
        // setPid()
        setEsop()
        setStatus("Deactive")
        setSt(st + 1)


        setMessage(resJson.meassage);
        if (resJson.status === "OK") {
          tost(resJson.meassage)
          //mail script
          //
          emailjs.sendForm('service_x4idkc5', 'template_rqp2zto', form.current, 'A_8SGElinJDF8jOc1')
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
          //
          //
        }
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };









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
        <div className="text-center  z-index-1" style={{ width: "90%" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "245px" }} />

        </div>
      }



      <div className='container p-3'>
        <span className='fw-bold fs-3'><FontAwesomeIcon icon={faBriefcase} style={{ color: "#090c11", }} /> Employees</span>
        {noplanexist ? <></>
          :
          <span className="float-end"><button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ fontSize: "15px" }}><FontAwesomeIcon icon={faUserPlus} style={{ color: "#ffffff", }} /><span className='google-font'> Add Employee</span></button></span>}
        <br></br>



        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered google-font">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>



              <div class="modal-body">
                <form class="row g-3" ref={form} onSubmit={addemp}>
                  <input type="hidden" name="email_message" value="Your account has been successfully created in Rapid ESOP" />
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="inputEmail4"
                      name='emp_name'
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder='Enter first name' required />
                  </div>
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Last Name</label>
                    <input type="text" class="form-control"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      id="inputEmail4" placeholder='Enter last name' required />
                  </div>

                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail4"
                      name='emp_email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter Email-id' required />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control"
                      name='emp_password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="inputPassword4" placeholder='Enter Password' required />
                  </div>


                  <div class="col-12">
                    <label for="inputAddress" class="form-label">Mobile no.</label>
                    <input type="text" class="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      id="inputAddress" placeholder='Enter mobile no.' required />
                  </div>


                  <div class="col-12">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input type="text" class="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="inputAddress" placeholder='Enter Address' required />
                  </div>

                  <div class="col-md-4">
                    <label for="inputEmail4" class="form-label">Department</label>
                    <input type="text" class="form-control"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      id="inputEmail4" required />
                  </div>
                  <div class="col-md-4">
                    <label for="inputEmail4" class="form-label">Joining date</label>
                    <input type="date" class="form-control"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                      id="inputEmail4" required />
                  </div>

                  <div class="col-md-3">
                    <label for="inputEmail4" class="form-label">No. of ESOPs</label>
                    <input type="text" class="form-control"
                      value={esop}
                      onChange={(e) => setEsop(e.target.value)}
                      id="inputEmail4" required />
                  </div>
                  <div class="col-md-5">
                    <label for="inputEmail4" class="form-label">Vesting Schedule ID</label>
                    <input type="number"
                      value={selectplan}
                      class="form-control" id="inputEmail4" readonly />
                  </div>
                  <div class="col-md-5">
                    <label for="inputEmail4" class="form-label">Status</label>
                    <select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}

                      class="form-control" id="dropdown" required>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                    </select>

                  </div>



                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit"  class="btn btn-dark">Add Employee</button>
                  </div>
                </form>
              </div>


            </div>
          </div>
        </div>


















        <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
          <thead class="bg-light">
            <tr>
              <th>Name</th>
              <th>Other</th>
              <th>Department</th>
              <th>Status</th>
              <th>JoiningDate</th>
              <th>ESOPs</th>
              <th>Granted ESOPs</th>
              <th>Exercise ESOPs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees?.map((emp,i) => {
                return (
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <button
                          style={{ width: "45px", height: "45px" }}
                          className="btn bg-primary bg-opacity-25 text-dark d-inline rounded-circle text-uppercase shdw"
                        ><span className='fs-5'><b>{emp.fname[0]}</b></span></button>

                        <div class="ms-3">
                          <p class="fw-bold mb-1">{emp.fname} {emp.lname}</p>
                          <p class="text-muted mb-0">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{emp.mobile}</p>

                      <p class="text-muted mb-0"><span class="d-inline-block text-truncate" style={{ maxWidth: "100px" }}>
                        {emp.address}
                      </span></p>
                    </td>
                    <td>
                      <p>{emp.department}</p>
                    </td>
                    <td>
                      {emp.status === "Active" ?
                        <span class="badge rounded-pill bg-success bg-opacity-25 text-success d-inline">{emp.status}</span>
                        :
                        <span class="badge rounded-pill bg-secondary bg-opacity-25 text-dark d-inline">{emp.status}</span>
                      }
                    </td>
                    <td>
                      <span class="d-inline-block text-truncate" style={{ maxWidth: "110px" }}>{emp.joiningDate}</span>
                    </td>
                    <td>{emp.esop}</td>
                    <td>{emp.granted}</td>
                    <td>{emp.exercise}</td>
                    <td><button className='btn btn-danger' onClick={e => deleteEmp(e, emp.eid)} >Remove</button></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        {noplanexist &&
          <div className="" >
            <div className='google-font fs-3' style={{ marginTop: "100px", color: "gray" }} ><center>
              <br></br>
              <p className="fs-5">please make vesting plan for add employees <Link to="/Company/VestingPlans">click here</Link></p>
            </center></div>
          </div>
        }

      </div>
    </div>
  )
}

export default Employees
