import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
const Dashboard = () => {

  const data = [];

  return (
    <div className='container mt-3'>
      <p className='fw-bold fs-3'><FontAwesomeIcon icon={faGauge} /> Dashboard</p>

      <div class="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Welcome "companyname"!</strong> This is your Dashboard.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>


      <div class="row p-3">

        <div class="col container">


          <div className='container bg-light p-3 border border-2 rounded'>
            <p className='fw-bold'>No. of Employees</p>
            50
          </div>


        </div>
        <div class="col container">


          <div className='container bg-light p-3 border border-2 rounded'>
            <p className="fw-bold">Current price of ESOP</p>
            50 rupees
          </div>


        </div>
        <div class="col container">


          <div className='container bg-light p-3 border border-2 rounded'>
            <p className="fw-bold">Current Company valuation</p>
            3 cr
          </div>


        </div>


      </div>

      {/* this is graph section */}
      <div className="container">
        <div className='row'>
          <div className='col'>
            <DoughnutChart />
          </div>
          <div className='col'>
            <LineChart />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard