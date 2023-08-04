import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faUserPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import load from "../load.png"
import BaseUrl from '../API/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VestingPlans = () => {
  const navigate = useNavigate();
  const [vestingPeriod, setVestingPeriod] = useState();
  const [cliffPeriod, setCliffPeriod] = useState();
  const cid = localStorage.getItem("cid");
  const [st, setSt] = useState(0);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [plans, setPlans] = useState();
  const tost = (message) => toast.success(message);

  const [noplan,setNoplan]=useState(false);
  // const plan = [
  //   {
  //     year: 4,
  //     cliff: 1
  //   },

  // ]
  // const [plans, setPlans] = useState(plan);


  let editplan = async (e, pid) => {
    e.preventDefault();
    setLoader(true)
    try {
      let res = await fetch(BaseUrl + '/vplan/update/' + pid + '', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vestingPeriod: vestingPeriod,
          cliffPeriod: cliffPeriod,
        })
      });
      let resJson = await res.json();
      if (resJson) {
        setLoader(false)
        setSt(st + 1)
        setMessage(resJson.meassage);

        setVestingPeriod("");
        setVestingPeriod("");
        if (resJson.status === "OK") {
          tost(resJson.meassage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  let deleteplan = async (e, pid) => {
    e.preventDefault();
    setLoader(true)
    try {
      let res = await fetch(BaseUrl + '/vplan/' + pid + '', {
        method: "DELETE",
      })
      let resJson = await res.json();
      if (resJson) {
        setSt(st + 1)
        setLoader(false)
        setMessage(resJson.meassage);
        if (resJson.status === "OK") {
          tost(resJson.meassage);
          setNoplan(true);
        }
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    async function selectplans() {

      setLoader(true);

      fetch(BaseUrl + '/vplan/company/' + cid + '/plans')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);

          setPlans(json.data)
          if(json.data){
          //  console.log(json.data.length )
          if(json.data.length===0){
            setNoplan(true)
          }
        }
        })
    }
    selectplans();

  }, [st])

  let add = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(BaseUrl + '/vplan/company/' + cid + '/plans', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vestingPeriod: vestingPeriod,
          cliffPeriod: cliffPeriod,
        })
      });
      let resJson = await res.json();
      if (resJson) {
        setSt(st + 1)
        setMessage(resJson.meassage);

        setVestingPeriod("");
        setCliffPeriod("");
        if (resJson.status === "OK") {
          tost(resJson.meassage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };




  // console.log(plans)



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


      <div className="container mt-2 p-2">


        <span className='fw-bold fs-3'><FontAwesomeIcon icon={faBriefcase} style={{ color: "#090c11", }} /> Manage Vesting Plans</span>
        {noplan&&     <span className="float-end"><button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ fontSize: "15px" }}><FontAwesomeIcon icon={faUserPlus} style={{ color: "#ffffff", }} /><span className='google-font'> Add Plan</span></button></span>

        }

        <br></br>
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
                    <input type="number"

                      value={vestingPeriod}
                      onChange={(e) => setVestingPeriod(e.target.value)}
                      class="form-control" id="inputEmail4" required />
                  </div>
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Cliff Period</label>
                    <input type="number"

                      value={cliffPeriod}
                      onChange={(e) => setCliffPeriod(e.target.value)}
                      class="form-control" id="inputEmail4" required />
                  </div>






                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={add} class="btn btn-dark" data-bs-dismiss="modal" >Add</button>
              </div>
            </div>
          </div>
        </div>









        <div className='container p-2'>

          <div className='row google-font'>
            {
              plans?.map((p) => {
                return (
                  <div class="col card text-black m-3" style={{ minWidth: "270px", boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)", maxWidth: "270px", fontSize: "15px" }}>
                    <div class="card-header"><b>Plan ID : #{p.pid}</b>
                      <div className='float-end'>
                        <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#ff0000", cursor: "pointer" }} onClick={e => deleteplan(e, p.pid)} />
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "black", cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#editmodel" />


                        <div class="modal fade" id="editmodel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered google-font">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Plan (#{p.pid})</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <form class="row g-3">
                                  <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Vesting Period </label>
                                    <input type="number"
                                      value={vestingPeriod}
                                      onChange={(e) => setVestingPeriod(e.target.value)}
                                      class="form-control" id="inputEmail4" required />
                                  </div>
                                  <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Cliff Period</label>
                                    <input type="number"

                                      value={cliffPeriod}
                                      onChange={(e) => setCliffPeriod(e.target.value)}
                                      class="form-control" id="inputEmail4" required />
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={e => editplan(e, p.pid)} class="btn btn-dark" data-bs-dismiss="modal" >Update</button>
                              </div>
                            </div>
                          </div>
                        </div>









                      </div>
                    </div>
                    
                    <div class="card-body">


                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Year</th>
                              <th>Vested ESOPs</th>
                            </tr>
                          </thead>
                          <tbody>



                            {(() => {
                              const a = []
                              for (let i = 0; i < p.vestingPeriod; i++) {
                                a.push(
                                  <tr>
                                    <td >Year {i + 1}</td>
                                    <td>{(((i + 1) / p.vestingPeriod) * 100).toFixed(2)} %</td>
                                  </tr>
                                );
                              }
                              return a
                            })()}



                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>

                )
              })
            }



{noplan&&   <div className='container p-2 mt-5 fs-4' style={{color:"gray"}}><center>Plan not found !!!</center></div>}


          </div>

        </div>

      </div>


    </div>
  );
};

export default VestingPlans;
