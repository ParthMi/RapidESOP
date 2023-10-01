import React, { useState, useEffect } from 'react'
import BaseUrl from '../API/Api'
import load from "../load.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGauge, faArrowRightFromBracket, faBell, faBullhorn, faUsers, faBriefcase, faMoneyBillTransfer, faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCompany = () => {
    const [loader, setLoader] = useState(false);
    const [allcomp, setAllcom] = useState();
    const [st, setSt] = useState(0);
    const tost = (message) => toast.success(message);



    

    let deleteCom = async (e, cid) => {
        e.preventDefault();
    
        try {
            let res = await fetch(BaseUrl + '/company/' + cid, {
                method: 'DELETE'
            })
            let resJson = await res.json();
            if (resJson) {
                setSt(st + 1)

                tost("Company deleted successfully!!!");

            } else {
                tost("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setLoader(true)
        async function alldata() {
            setLoader(true);
            fetch(BaseUrl + '/company/')
                .then((response) => response.json())
                .then((json) => {
                    setAllcom(json);
                    console.log(json)
                })

            fetch(BaseUrl + '/api/employee')
                .then((response) => response.json())
                .then((json) => {
                    setLoader(false);
                    console.log(json);
                })
        }
        alldata();
    }, [])




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
            <h1><p className='fw-bold fs-5'><FontAwesomeIcon icon={faList} /> All Companies</p></h1>
            <div>
                <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
                    <thead class="bg-light">
                        <tr>
                            <th>Company id</th>
                            <th>Company name</th>
                            <th>CEO</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Valuation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allcomp?.map((com) => {
                            return (
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">{com.cid} </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{com.cname}</p>
                                    </td>
                                    <td>
                                        <p>{com.ceo}</p>
                                    </td>

                                    <td>
                                        <span class="fw-normal mb-1">{com.email}</span>
                                    </td>
                                    <td>{com.address}</td>
                                    <td>₹ {com.valuation}</td>
                                    <td><button className='btn btn-outline-danger' onClick={e => deleteCom(e, com.cid)}>Delete</button></td>
                                    
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

export default AllCompany
