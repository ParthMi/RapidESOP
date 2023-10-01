import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import "./css/styles.css";
import load from "../load.png";
import BaseUrl from '../API/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Empbuysell = () => {
  const [loader, setLoader] = useState();
  const cid = localStorage.getItem("cid");
  const empid=localStorage.getItem("eid");
  const [company, setCompany] = useState();
  const [esop, setEsop] = useState();
  const tost = (message) => toast.success(message);
  const [st, setSt] = useState(0);
  const [req, setReq] = useState();

  useEffect(() => {

    async function getallcom() {
      setLoader(true);
      fetch(BaseUrl + '/company/' + cid)
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          console.log(json)
          setCompany(json);
        })
    }
    fetch(BaseUrl + '/request/send')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setReq(json)
        setLoader(false)
      })
    getallcom();
  }, [cid, st]);




  let sendsellrequest = async (e, eid) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl + '/request/company/' + cid + '/emp/' + eid + '/send', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          esop: esop,
          status: "pending"
        })
      });
      let resJson = await res.json();
      if (resJson) {

        console.log(resJson)
        if (resJson.status === "OK") {
          tost("Request submitted!!!")
          setSt(st + 1)
        }
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let update = async (e,reqId,esop) => {
    e.preventDefault();
    setLoader(true)
    try {
      let res = await fetch(BaseUrl+"/request/"+reqId+'/update' , {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            esop:esop,
            status:"success"
        })
      });
      let resJson = await res.json();
      if (resJson.status==="OK") {
        setSt(st + 1)
        tost("Request submitted!!!")
      } else {
        alert("something went wrong!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  let sendbuyrequest = async (e, eid,buyesop,sellableesop,reqId,sellreqId) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl + '/buyrequest/emp/' + eid + '/sellRequest/'+sellreqId+'/send', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          esop: esop,
          status: "pending"
        })
      });
      let resJson = await res.json();
      if (resJson) {

        console.log(resJson)
        if (resJson.status === "OK") {
          var remainingESOP=sellableesop-buyesop;
          update(e,reqId,remainingESOP);
        }
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <div className='container google-font p-3'>
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
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "150px" }} />
        </div>}
      <div className="d-flex justify-content-between">
        <p className='fw-bold fs-4'>Buy/Sell</p>
        <div><button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Generate sell request</button></div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Generate sell request</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={e => sendsellrequest(e, parseInt(localStorage.getItem("eid")))}>
                  <div class="row">
                    <div class="col">
                      <input type="email" class="form-control" placeholder="Email" aria-label="First name" required />
                    </div>
                    <div class="col">
                      <input type="number" class="form-control"
                        value={esop}
                        onChange={(e) => setEsop(e.target.value)}
                        placeholder="No. of ESOP" aria-label="Last name" required />
                    </div>
                  </div><br></br>
                  <div class="row">
                    <div class="col">
                      <input type="text"
                        class="form-control" placeholder="Contact no." aria-label="Last name" required />
                    </div>

                    <div class="col">
                      <input type="number"
                        value={company?.price}
                        class="form-control" placeholder="Mobile No." aria-label="First name" readOnly />
                    </div>

                  </div>
                  <br></br>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" required />
                    <label class="form-check-label" for="gridCheck">
                      By checking this box, I confirm that all the information provided in this sell request form is accurate and complete to the best of my knowledge. I understand that any false or misleading information may result in a rejection of this sell request and could lead to further actions as per company policy.
                    </label>
                  </div>
                  <button type="submit" class="btn btn-primary float-end" data-bs-dismiss="modal">Send Request</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div>
        <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
          <thead class="bg-light">
            <tr>
              <th>Request Id</th>
              {/* <th>Employee Id</th> */}
              <th>Employee Contact</th>
              <th>Company</th>
              <th>ESOPs</th>
              <th>Current price</th>
              {/* <th>status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {req?.map((r, i) => {
              return (
               <> {r.esop===0 || r.status==="pending"?<></>:
                <tr>
                  <td>
                    <div class="d-flex align-items-center">

                      <div class="ms-3">
                        <p class="fw-bold mb-1">#{r.reqId} </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">{r.emp.email}</p>

                    <p class="text-muted mb-0"><span class="d-inline-block text-truncate" style={{ maxWidth: "100px" }}>
                      {r.emp.mobile}
                    </span></p>
                  </td>
                  <td>
                    <p class="fw-normal mb-1"><Link to="/Employee/Allcompany">{r.company.cname}</Link></p>
                  </td>
                  <td>{r.esop}</td>
                  <td>{r.company.price} ₹</td>
                  {/* <td>{r.status!=="success" ?<><span class="badge bg-danger">{r.status}</span></>:<><span class="badge bg-success">Success</span></>

                                    }</td> */}
                  <td><button className='btn btn-outline-primary'
                    data-bs-toggle="modal" data-bs-target={'#exampleModalbuy'+i}>+ Generate Buy Request</button></td>


                  <div class="modal fade" id={'exampleModalbuy'+i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Generate Buy request</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form onSubmit={e => sendbuyrequest(e, empid, esop,r.esop,r.reqId,r.reqId)}>
                            <div class="row">
                              <div class="col">
                                <input type="email" class="form-control" placeholder="Email" aria-label="First name" required />
                              </div>
                              <div class="col">
                                <input type="number" class="form-control"
                                  value={esop}
                                  onChange={(e) => setEsop(e.target.value)}
                                  min="1"
                                  max={r.esop}
                                  placeholder="No. of ESOP" aria-label="Last name" required />
                              </div>
                            </div><br></br>
                            <div class="row">
                              <div class="col">
                                <input type="text"
                                  class="form-control" placeholder="Contact no." aria-label="Last name" required />
                              </div>

                              <div class="col">
                                <input type="number"
                                  value={company?.price}
                                  class="form-control" placeholder="Mobile No." aria-label="First name" readOnly />
                              </div>

                            </div>
                            <br></br>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" id="gridCheck" required />
                              <label class="form-check-label" for="gridCheck">
                                I confirm that all the information provided in this buy request form is accurate and complete to the best of my knowledge. I understand that any false or misleading information may impact the processing of this buy request and could result in appropriate actions as per company policy.                    </label>
                            </div>
                            <button type="submit" class="btn btn-primary float-end" data-bs-dismiss="modal">Send Request</button>
                          </form>
                        </div>

                      </div>
                    </div>
                  </div>


                </tr>
              }</>
              
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Empbuysell
