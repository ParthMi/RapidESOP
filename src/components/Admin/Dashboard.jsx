import React, { useEffect,useState } from 'react'
import BaseUrl from '../API/Api'
import load from "../load.png"
import { getDatabase, set, ref ,onValue} from 'firebase/database';
import '../../context/Firebase'

const Dashboard = () => {
    const [loader, setLoader] = useState(false);
    const [allcomp,setAllcom]=useState();
    const [allemp,setAllemp]=useState();
    useEffect(() => {
        setLoader(true)
        async function alldata() {
            setLoader(true);
            fetch(BaseUrl + '/company/')
                .then((response) => response.json())
                .then((json) => {
                    setAllcom(json);
                })
                fetch(BaseUrl + '/api/employee')
                .then((response) => response.json())
                .then((json) => {
                  setLoader(false);
                  setAllemp(json);
                })
        }
        alldata();
    }, [])
    return (
        <div className='container google-font p-3'>
             {loader &&
        <div className="text-center  z-index-1" style={{ width: "90%" }} >
          <img src={load} className='loader  position-absolute' height={"80px"} style={{ marginTop: "150px" }} />
        </div>}
            <div className='row'>
                <div class="col container ">
                    <div className='container  p-3 border border-2 rounded shdw '>
                        <p className="fw-bold">Registered companies</p>
                        {allcomp?.length}
                    </div>
                </div>
                <div class="col container ">
                    <div className='container  p-3 border border-2 rounded shdw '>
                        <p className="fw-bold">Registered Employees</p>
                        {allemp?.length}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard
