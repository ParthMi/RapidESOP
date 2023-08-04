import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faUserPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import load from "../load.png"
import BaseUrl from '../API/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Myplan = () => {

  const cid = localStorage.getItem("cid");
  const [loader, setLoader] = useState(false);
  const [plans, setPlans] = useState();



  useEffect(() => {
    async function selectplans() {

      setLoader(true);

      fetch(BaseUrl + '/vplan/company/' + cid + '/plans')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);

          setPlans(json.data)
          
        })
    }
    selectplans();

  }, [])
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


      <div className="container mt-2 p-2 google-font">


        <span className='fw-bold fs-3'><FontAwesomeIcon icon={faBriefcase} style={{ color: "#090c11", }} /> Vesting Plans</span>
        <div className='container p-2'>

          <div className='row google-font'>
            {
              plans?.map((p) => {
                return (
                  <div class="col card text-black m-3" style={{ minWidth: "270px", boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)", maxWidth: "270px", fontSize: "15px" }}>
                    <div class="card-header"><b>Plan ID : #{p.pid}</b>
                      <div className='float-end'>










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

          </div>

        </div>

      </div>


    </div>
  );
};

export default Myplan;
