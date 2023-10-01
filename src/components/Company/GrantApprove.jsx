import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "./css/styles.css"
import load from "../load.png"
import BaseUrl from '../API/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GrantApprove = () => {
  const [loader,setLoader]=useState();
  const [employees,setEmployees]=useState();
  const cid=localStorage.getItem("cid")
  const emp=[];
  const grantESOP=[];
  var vesperiod=0;
  var cliff=0;
  const [st,setSt]=useState(0);

  const tost = (message) => toast.success(message);   



  useEffect(()=>{
    async function getallemp() {
      setLoader(true);
      fetch(BaseUrl + '/api/company/' + cid + '/employee')
        .then((response) => response.json())
        .then((json) => {
          setEmployees(json)
          // console.log(json)
          setLoader(false)
        })
    }
    getallemp();
  },[st])

  let granttransaction=async(e,eid,approve_grant)=>{
    e.preventDefault();
     var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = +day + "/" + month + "/" + date.getFullYear() % 100 ;

        try {
          let res = await fetch(BaseUrl+'/grant_transaction/company/'+cid+'/emp/'+eid+'/grant' , {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              date: strTime,
              esop: approve_grant
            })
          });
          let resJson = await res.json();
          if (resJson) {
            tost("Grant Approved!!!")
            setLoader(false)
            setSt(st+1)
          } else {
            alert("something went wrong!")
          }
        } catch (err) {
          console.log(err);
        }
  }

  let update = async (e,eid,fname,lname,email,password,mobile,address,joiningDate,esop,department,status,approve_grant) => {
    e.preventDefault();
    setLoader(true)
    try {
      let res = await fetch(BaseUrl+"/api/"+ eid , {
        method: "PUT",
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
          status: status,
          granted:approve_grant
        })
      });
      let resJson = await res.json();
      if (resJson) {
        granttransaction(e,eid,approve_grant)
      } else {
        alert("something went wrong!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (employees) {
  for(var i=0;i<employees.length;i++){
    vesperiod= employees[i].vestingPlan.vestingPeriod
    cliff= employees[i].vestingPlan.cliffPeriod
    var joiningyear= parseInt(employees[i].joiningDate.slice(0,4))
    var currentyear=new Date().getFullYear()
    var duration=currentyear-joiningyear
    // console.log(duration,employees[i].fname)
    var yearwithcliff=duration/cliff
    if(yearwithcliff%1===0){
    var div=vesperiod/duration
    if(parseInt((employees[i].esop)/div)!==0 && employees[i].granted!==parseInt((employees[i].esop)/div)){
      grantESOP.push(parseInt((employees[i].esop)/div))
      emp.push(employees[i])
    }
    }
  }}

  if(grantESOP.length!==0){
    // console.log(grantESOP)
    // console.log(emp)
  }

  return (
    <div className="container google-font p-3">
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
      <h3><FontAwesomeIcon icon={faCircleCheck} /> Grant Approve</h3>
      <div>
      {grantESOP.lenght===0 ? <h1>No request recieve yet!!!</h1> :
      <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
                    <thead class="bg-light">
                        <tr>
                            <th>Employee id</th>
                            <th>Employee email</th>
                            <th>ESOPs</th>
                            <th>Granted</th>
                            <th>Request grant</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp?.map((emp,i) => {
                            return (
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">#{emp.eid} </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{emp.email}</p>
                                    </td>
                                    <td>
                                        {emp.esop}
                                    </td>

                                    <td>
                                        <span class="fw-normal mb-1">{emp.granted}</span>
                                    </td>
                                    <td>{grantESOP[i]}</td>
                                    <td><button className='btn btn-outline-primary' onClick={e=>update(e,emp.eid,emp.fname,emp.lname,emp.email,emp.password,emp.mobile,emp.address,emp.joiningDate,emp.esop,emp.department,emp.status,grantESOP[i])}>Approve</button></td>
                                    
                                </tr>
                            )
                        })

                        }

                    </tbody>
                </table>
}
      </div>
    </div>
  )
}

export default GrantApprove
