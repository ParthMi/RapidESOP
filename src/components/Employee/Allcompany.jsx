import React, { useState, useEffect } from 'react'
import BaseUrl from '../API/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faUpLong,faDownLong} from '@fortawesome/free-solid-svg-icons'
import LineChart from './LineChart';
import load from "../load.png"
import { getDatabase, set, ref ,onValue} from 'firebase/database';
import '../../context/Firebase'

const Allcompany = () => {
  const [companies, setCompanies] = useState()
  const [loader, setLoader] = useState(false);
  const [pricechart,setPricechart]=useState();


  useEffect(() => {
    setLoader(true);
    async function getchart(){
    const db = getDatabase();
    const starCountRef = ref(db, 'PriceChart/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setPricechart(data)
    })
  }
    async function getallcompanies() {
      fetch(BaseUrl + '/company/')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          setCompanies(json)
          // console.log(json)
        });

    }
    getallcompanies();
    getchart();
  }, [])

  return (
    <div class="container p-3 google-font">
      {loader &&
        <div className="text-center  z-index-1" style={{ width: "90%" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "150px" }} />

        </div>}
      <h1><p className='fw-bold fs-5'><FontAwesomeIcon icon={faList} /> All Companies</p></h1>
      <div>
        <table class="table align-middle mt-3 mb-0 bg-white shdw rounded">
          <thead class="bg-light">
            <tr>
              <th>Company Name</th>
              <th>CEO</th>
              <th>Current Valuation</th>
              <th>Funding</th>
              <th>Base ESOP price</th>
              <th>Current ESOP price</th>
              <th>Price Chart</th>
            </tr>
          </thead>
          <tbody>
            {
              companies?.map((com, i) => {
                return (
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="ms-3">
                          <p class="fw-bold mb-1">{com.cname} </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{com.ceo}</p>
                    </td>
                    <td>
                      <p>₹ {com.valuation}</p>
                    </td>

                    <td>
                      <span class="fw-normal mb-1">₹ {com.funding}</span>
                    </td>
                    <td>₹ {com.baseprice}</td>
                    <td>₹ {com.price}</td>
                    <td>
                      {/* chart */}
                      <button className='btn btn-success' data-bs-toggle="modal" data-bs-target={"#exampleModal" + i}>View price chart</button>&nbsp;&nbsp;
                      { com.price>com.baseprice ?
                      <span className='text-success'><FontAwesomeIcon icon={faUpLong} /> +{((com.price-com.baseprice)/com.price*100).toFixed(2)} %</span>
                      :<span className='text-danger'><FontAwesomeIcon icon={faDownLong} /> {((com.price-com.baseprice)/com.price*100).toFixed(2)} %</span>
              }
                      <div class="modal fade" id={"exampleModal" + i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">{com.cname}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              { pricechart!=null ?
                              <LineChart time={pricechart[i+1]?.time} price={pricechart[i+1]?.price}/>
              :<></>}
              <br></br>
              <center>Current ESOP price: {com.price} ₹</center>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* chart-end */}

                    </td>
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

export default Allcompany
