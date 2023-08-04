import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge,faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import BaseUrl from '../API/Api'
import load from "../load.png"

const EmpDashboard = () => {
  // const data = [];
  const cid = localStorage.getItem("cid");
  const eid = localStorage.getItem("eid");
  const [companyinfo, setCompanyinfo] = useState();
  const [Emp, setEmp] = useState();
  const [loader, setLoader] = useState(false);
  // const [total,setTotal]=useState();
  // const [distributed,setDistributed]=useState();

  useEffect(() => {
    setLoader(true)
    async function getempcom() {
      fetch(BaseUrl + '/company/' + cid + '')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          // console.log(json)
          setCompanyinfo(json);
        })

      fetch(BaseUrl + '/api/' + eid + '')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          console.log(json)
          setEmp(json)
         
        })
    }
    getempcom();
  }, [])





  return (
    <div className='container mt-3 google-font'>
      <p className='fw-bold fs-3'><FontAwesomeIcon icon={faGauge} /> Dashboard</p>

      <div class="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Update your profile</strong> <a href="/Employee/EmpProfile">click here</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>


      {loader === true ?
        <div className="text-center  z-index-1" style={{ width: "90%" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "150px" }} />

        </div>
        :
        <div>
          <div class="row p-3">
            <div className='col'>
              <div class="row">
                <div class="col container">


                  <div className='container p-3 border border-2 rounded shdw'>
                    <p className='fw-bold'>No. of ESOP</p>
                    {Emp?.esop}
                  </div>


                </div>


                <div class="col container ">


                  <div className='container  p-3 border border-2 rounded shdw '>
                    <p className="fw-bold">Current price of ESOP</p>
                   {companyinfo?.price} rupees
                  </div>


                </div>
              </div>
 <div className="container mt-5">
              <div className='row'>

                <div className='col'>
                  <LineChart />
                </div>
              </div>
            </div>
            </div>


           

            <div className='col border border-1 rounded shdw'>
              <div className='p-3'>
              <h5><FontAwesomeIcon icon={faCircleInfo} /> <b>Company information</b></h5>
                <div className='' style={{}}><br></br>
                <p> <b> Company Id</b> : {companyinfo?.cid}<br></br></p>
                  <p>
                   <b> Name</b>      : {companyinfo?.cname}<br></br></p>
                  <p> <b>Email</b>     : {companyinfo?.email}<br></br></p>
                  <p><b>Mobile no.</b>: {companyinfo?.mobile}<br></br></p>
                  <p><b>Address</b>   : {companyinfo?.address}<br></br></p>
                  <p><b>Funding</b>   : {companyinfo?.funding}<br></br></p>
                  <p> <b> Valuation</b> : {companyinfo?.valuation}<br></br></p>

                </div>
              </div>
            </div>
          </div>

        </div>
      }

    </div>
  )
}

export default EmpDashboard