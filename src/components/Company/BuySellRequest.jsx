import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "./css/styles.css"
import load from "../load.png"
import BaseUrl from '../API/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BuySellRequest = () => {
    const [loader, setLoader] = useState();
    const [req, setReq] = useState();
    const [reqbuy, setReqbuy] = useState();
    const cid = localStorage.getItem("cid")
    const [st, setSt] = useState(0);
    const reqs = [];
    const buyreqs = [];
    const tost = (message) => toast.success(message);


    useEffect(() => {
        async function getallsellreq() {
            setLoader(true);
            fetch(BaseUrl + '/request/send')
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                    setReq(json)
                    setLoader(false)
                })
        }
        async function getallbuyreq() {
            setLoader(true);
            fetch(BaseUrl + '/buyrequest/allRequest')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setReqbuy(json)
                    setLoader(false)
                })
        }
        getallsellreq();
        getallbuyreq();
    }, [st])

    if (req) {
        for (var i = 0; i < req.length; i++) {
            if (req[i].company.cid === parseInt(cid)) {
                if (req[i].status === "pending") {
                    reqs.push(req[i])
                }
            }
        }
    }
    if (reqbuy) {
        for (var i = 0; i < reqbuy.length; i++) {
            if (reqbuy[i].emp.company.cid === parseInt(cid)) {
                if (reqbuy[i].status === "pending") {
                    buyreqs.push(reqbuy[i])
                }
            }
        }
        console.log(buyreqs)
    }

    let update = async (e, reqId, esop) => {
        e.preventDefault();
        setLoader(true)
        try {
            let res = await fetch(BaseUrl + "/request/" + reqId + '/update', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esop: esop,
                    status: "success"
                })
            });
            let resJson = await res.json();
            if (resJson.status === "OK") {
                tost("Request Approved!!!")
                setSt(st + 1)
            } else {
                alert("something went wrong!")
            }
        } catch (err) {
            console.log(err);
        }
    }


let final_transaction = async (e, buyreqId,comId,sellReqId,curr_price) => {
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
        var strTime = +day + "/" + month + "/" + date.getFullYear() % 100 + "  " + hours + ':' + minutes + ' ' + ampm;
    

        setLoader(true)
        try {
            let res = await fetch(BaseUrl + "/transaction/Company/" +comId +'/BuyRequest/'+ buyreqId + '/SellRequest/'+ sellReqId, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: strTime,
                    price: curr_price
                })
            });
            let resJson = await res.json();
            if (resJson.status === "OK") {
                tost("Transaction Completed!!!")
                setSt(st + 1)
            } else {
                alert("something went wrong!")
            }
        } catch (err) {
            console.log(err);
        }
    }


    
   let updatebuytransaction = async (e, buyreqId, esop,comId,sellReqId,curr_price) => {
        e.preventDefault();
        setLoader(true)
        try {
            let res = await fetch(BaseUrl + "/buyrequest/" + buyreqId + '/update', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esop: esop,
                    status: "success"
                })
            });
            let resJson = await res.json();
            if (resJson.status === "OK") {
                final_transaction(e,buyreqId,comId,sellReqId,curr_price)
            } else {
                alert("something went wrong!")
            }
        } catch (err) {
            console.log(err);
        }
    }




   

    return (
        <div className='container p-3 google-font'>
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
            <h4><FontAwesomeIcon icon={faCircleCheck} /> Sell Requests</h4>

            <div>
                <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
                    <thead class="bg-light">
                        <tr>
                            <th>Request Id</th>
                            <th>Employee Id</th>
                            <th>Contact</th>
                            <th>Requested sellable ESOPs</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reqs?.map((r, i) => {
                            return (
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">#{r.reqId} </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">#{r.emp.eid}</p>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{r.emp.email}</p>

                                        <p class="text-muted mb-0"><span class="d-inline-block text-truncate" style={{ maxWidth: "100px" }}>
                                            {r.emp.mobile}
                                        </span></p>
                                    </td>

                                    <td>{r.esop}</td>
                                    <td>{r.status !== "success" ? <><span class="badge bg-danger">{r.status}</span></> : <><span class="badge bg-success">Success</span></>

                                    }</td>
                                    <td><button className='btn btn-outline-primary' onClick={e => update(e, r.reqId, r.esop)}>Approve</button></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>

            <hr></hr>


            <h4><FontAwesomeIcon icon={faCircleCheck} /> Buy Requests</h4>

            <div>
                <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
                    <thead class="bg-light">
                        <tr>
                            <th>Request Id</th>
                            <th>Seller Employee</th>
                            <th>Buyer Employee</th>
                            <th>Total ESOPs</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyreqs?.map((r, i) => {
                            return (
                                <tr>
                                    <td>#{r.buyreq}</td>
                                    <td>
                                        <p class="fw-normal mb-1">#{r?.sellRequest.emp.eid} {r.sellRequest.emp.fname} {r.sellRequest.emp.lname}</p>
                                        {/* <p class="text-muted mb-0"><span class="d-inline-block text-truncate" style={{ maxWidth: "100px" }}>
                                            
                                        </span></p> */}
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">#{r.emp.eid} {r.emp.fname} {r.emp.lname}</p>

                                        {/* <p class="text-muted mb-0"><span class="d-inline-block text-truncate" style={{ maxWidth: "100px" }}>
                                            
                                        </span></p> */}
                                    </td>
                                    {/* <td>{r.sellRequest.emp.eid}</td>
                                    <td>{r.emp.eid}</td> */}
                                    <td>{r.esop}</td>
                                    <td>{r.status !== "success" ? <><span class="badge bg-danger">{r.status}</span></> : <><span class="badge bg-success">Success</span></>
                                    }</td>
                                    <td>
                                        
                                        {/* ahiyathi baki 6 jyare aa approve thay atle sidhu transaction creat thay */}
                                        
                                        <button className='btn btn-outline-primary' 
                                        onClick={e => updatebuytransaction(e, r.buyreq, r.esop,r.emp.company.cid,r.sellRequest.reqId,r.emp.company.price)}
                                        >Approve Request</button></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BuySellRequest
