// import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'
// import "./css/styles.css"
// import load from "../load.png"
// import BaseUrl from '../API/Api'

// const Transaction = () => {
//   const [loader, setLoader] = useState();
//   const cid = localStorage.getItem("cid")
//   const [granttransaction, setGranttransaction] = useState();
//   const [search, setSearch] = useState("");
//   const [newArray, setNewArray] = useState();
//   useEffect(() => {
//     async function getallemp() {
//       setLoader(true);
//       fetch(BaseUrl + '/grant_transaction/company/' + cid)
//         .then((response) => response.json())
//         .then((json) => {
//           setLoader(false)
//           setGranttransaction(json.data)
//           console.log(json.data)
//         })
//     }
//     getallemp();
//   }, [])

//   // let searchfunc=async()=>{
//   //   if(granttransaction!==0){
//   //     let newtra=granttransaction.filter((gt)=>{
//   //       if(search!==""){
//   //       return gt.emp.eid===parseInt(search);
//   //       }
//   //     })
//   //     setNewArray(newtra);
//   //   }
//   // }

//   return (
//     <div className='container google-font p-3'>
//       {loader &&
//         <div className="text-center  z-index-1" style={{ width: "90%" }} >
//           <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "245px" }} />
//         </div>
//       }
//       <p className='fw-bold fs-3'><FontAwesomeIcon icon={faMoneyBillTransfer} /> All Transactions</p>
//       <input type="text"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value)
//         }}
//       />
//       <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
//         <thead class="bg-light">
//           <tr>
//             <th>Transaction Id</th>
//             <th>Employee Id</th>
//             <th>Type</th>
//             <th>Granted ESOP</th>
//             <th>Date</th>
//             <th>Status</th>

//           </tr>
//         </thead>
//         <tbody>
//           {granttransaction?.map((gt, i) => {
//             return (
//               <tr>
//                 <td>
//                   <div class="d-flex align-items-center">

//                     <div class="ms-3">
//                       <p class="fw-bold mb-1">#{gt.gtId} </p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <p class="fw-normal mb-1">#{gt.emp.eid}</p>
//                 </td>

//                 <td>
//                   <span class="fw-normal mb-1">{gt.gtId ? <>Grant ESOP</> : <></>}</span>
//                 </td>
//                 <td>{gt.esop}</td>
//                 <td>{gt.date}</td>
//                 <td>                <span class="badge bg-success">Success</span></td>

//               </tr>
//             )
//           })

//           }

//         </tbody>
//       </table>
//     </div>

//   )
// }

// export default Transaction
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import "./css/styles.css";
import load from "../load.png";
import BaseUrl from '../API/Api';

const Transaction = () => {
  const [loader, setLoader] = useState();
  const cid = localStorage.getItem("cid");
  const [granttransaction, setGranttransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [ESOPtransaction,setESOPtransaction]=useState();
  const allTransaction=[];
  useEffect(() => {
    async function getallemp() {
      setLoader(true);
      fetch(BaseUrl + '/grant_transaction/company/' + cid)
        .then((response) => response.json())
        .then((json) => {
          setGranttransaction(json.data);
          setFilteredTransactions(json.data); // Initialize filtered transactions with all transactions
          console.log(json.data);
        });

        fetch(BaseUrl + '/transaction/allTransaction')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          setESOPtransaction(json);
          console.log(json)
        });
    }
    getallemp();
  }, [cid]);

  if (ESOPtransaction) {
    for (var i = 0; i < ESOPtransaction.length; i++) {
        if (ESOPtransaction[i].company.cid === parseInt(localStorage.getItem("cid"))) {
              allTransaction.push(ESOPtransaction[i])
            
        }
    }
}

  useEffect(() => {
    // Update filtered transactions whenever the search term changes
    if (granttransaction.length > 0) {
      const filtered = granttransaction.filter((gt) => {
        const employeeIdMatch = gt.emp.eid.toString().includes(search);
        const dateMatch = gt.date.includes(search);
        const transactionTypeMatch = gt.gtId ? 'Grant ESOP'.toLowerCase().includes(search.toLowerCase()) : false;
        const transactionIdMatch = gt.gtId.toString().includes(search);
        const firstNameMatch = gt.emp.fname.toLowerCase().includes(search.toLowerCase());
        const lastNameMatch = gt.emp.lname.toLowerCase().includes(search.toLowerCase());
        return employeeIdMatch || dateMatch || transactionTypeMatch || transactionIdMatch || firstNameMatch || lastNameMatch;
      });
      setFilteredTransactions(filtered);
    }
  }, [search, granttransaction]);

  return (
    <div className='container google-font p-3'>
      {/* Loader */}
      {loader && (
        <div className="text-center z-index-1" style={{ width: "90%" }}>
          <img src={load} className='loader position-absolute' height={"80px"} style={{ marginTop: "245px" }} />
        </div>
      )}
      <div className="d-flex justify-content-between">
      <p className='fw-bold fs-4'><FontAwesomeIcon icon={faMoneyBillTransfer} /> Grant Transactions</p>
      <input 
        type="text"
        style={{width:"50%",height:"50px",borderRadius:"10px"}}
        value={search}
        className="shdw"
        onChange={(e) => setSearch(e.target.value)}
        placeholder=" Search by Employee ID, Date, or Transaction Type"
      /></div>
      <table className="table align-middle mt-3 mb-0 bg-white shdw rounded">
        <thead className="bg-light">
          <tr>
            <th>Transaction Id</th>
            <th>To</th>
            <th>Employee Id</th>
            <th>Type</th>
            <th>Granted ESOP</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((gt, i) => (
            <tr key={i}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">#{gt.gtId} </p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{gt.emp.fname} {gt.emp.lname}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">#{gt.emp.eid}</p>
              </td>
              <td>
                <span className="fw-normal mb-1">{gt.gtId ? 'Grant ESOP' : ''}</span>
              </td>
              <td>{gt.esop}</td>
              <td>{gt.date}</td>
              <td><span className="badge bg-success">Success</span></td>
            </tr>
          ))}
        </tbody>
      </table>


     <br></br> <hr></hr>

     <div className="d-flex justify-content-between">
      <p className='fw-bold fs-4'><FontAwesomeIcon icon={faMoneyBillTransfer} /> ESOP Transactions</p>
      {/* <input 
        type="text"
        style={{width:"50%",height:"50px",borderRadius:"10px"}}
        value={search}
        className="shdw"
        onChange={(e) => setSearch(e.target.value)}
        placeholder=" Search by Employee ID, Date, or Transaction Type"
      /> */}

      </div>
            <table className="table align-middle mt-3 mb-0 bg-white shdw rounded">
        <thead className="bg-light">
          <tr>
            <th>Transaction Id</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Company</th>
            <th>Type</th>
            <th>ESOP</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allTransaction?.map((t, i) => (
            <tr key={i}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">#{t.tid} </p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">#{t.buyRequest.emp.eid} {t.buyRequest.emp.fname} {t.buyRequest.emp.lname}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">#{t.buyRequest.sellRequest.emp.eid} {t.buyRequest.sellRequest.emp.fname} {t.buyRequest.sellRequest.emp.lname}</p>
              </td>
              <td>
                <span className="fw-normal mb-1">#{t.company.cid} {t.company.cname}</span>
              </td>
              <td>
                <span className="fw-normal mb-1">ESOP Transaction</span>
              </td>
              <td>{t.buyRequest.esop}</td>
              <td>{t.price}</td>
              <td><span className="badge bg-success">Success</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
