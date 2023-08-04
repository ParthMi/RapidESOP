import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import BaseUrl from '../API/Api'
import load from "../load.png"

const Dashboard = () => {
  const data = [];
  const cid = localStorage.getItem("cid");
  const [companyinfo, setCompanyinfo] = useState();
  const [countEmp, setCountEmp] = useState(0);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState();
  const [distributed, setDistributed] = useState();
  var tt;
  useEffect(() => {
    setLoader(true)
    async function getcompany() {
      fetch(BaseUrl + '/company/' + cid + '')
        .then((response) => response.json())
        .then((json) => {
          // setLoader(false);
          tt=json.esop;
          setCompanyinfo(json);
        })

      fetch(BaseUrl + '/api/company/' + cid + '/employee')
        .then((response) => response.json())
        .then((json) => {
          console.log(json.length)
          if (json.length === 0) {
            setCountEmp(0)
            setDistributed(0)
          }
          else {
            var sum = 0;
            for (var i = 0; i < json.length; i++) {
              sum = sum + json[i].esop
            }
            setCountEmp(json.length)
            console.log(sum)
            
              setDistributed(sum)
              
              var yy=tt-sum
              setTotal(yy)

          }
          setLoader(false)

        })
    }
    getcompany();
  }, [])





  return (
    <div className='container mt-3'>
      <p className='fw-bold fs-3'><FontAwesomeIcon icon={faGauge} /> Dashboard</p>

      <div class="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Welcome {companyinfo?.cname}</strong> This is your Dashboard.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>


      {loader === true ?
        <div className="text-center  z-index-1" style={{ width: "90%" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "150px" }} />

        </div>
        :
        <div>
          <div class="row p-3">

            <div class="col container">


              <div className='container p-3 border border-2 rounded shdw'>
                <p className='fw-bold'>No. of Employees</p>
                {countEmp}
              </div>


            </div>


            <div class="col container ">


              <div className='container  p-3 border border-2 rounded shdw '>
                <p className="fw-bold">Current price of ESOP</p>
                {companyinfo?.price} rupees
              </div>


            </div>
            <div class="col container">


              <div className='container p-3 border border-2 rounded shdw'>
                <p className="fw-bold">Current Company valuation</p>
                {companyinfo?.valuation}
              </div>


            </div>


          </div>


          <div className="container">
            <div className='row'>
              <div className='col'>
                <DoughnutChart d1={total} d2={distributed} />
              </div>
              <div className='col'>
                <LineChart />
              </div>
            </div>
          </div>

        </div>
      }

    </div>
  )
}

export default Dashboard