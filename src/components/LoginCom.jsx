import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import load from './load.png'
import './Employee/css/styles.css'
import BaseUrl from './API/Api';

const LoginCom = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [data,setData]=useState();
  const [loader, setLoader] = useState(false);
const [msg,setMsg]=useState("");

  useEffect(() => {
    setLoader(true)
    async function EmpProfile() {

      setLoader(true);

      fetch(BaseUrl + '/company/')
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          console.log(json)
          setData(json);
        })
    }
    EmpProfile();
  }, [])


  function login(){
    setLoader(true)

    for(let i=0;i<data.length;i++){
      if(email===data[i].email){
        if(password===data[i].password){
          localStorage.setItem("cid",data[i].cid);
          localStorage.setItem("status","1");
          localStorage.setItem("email",data[i].email);
          localStorage.setItem("cname",data[i].cname);
          navigate('/Company')
        }
        else{
          setMsg("Details invalid")
        }
      }
      
      else{
        setMsg("Details invalid")
      }
    }
  }


  return (
    <div className='container bg-light p-5 mt-5' style={{  boxShadow:" 0 .15rem 1.75rem 0 rgba(58,59,69,.35)",borderRadius:"30px"}}>
        <center className='container '>
       
       <span className="logo-font fs-2">
       <h1><b><img src={load}  height={"80px"} style={{ }} /> RAPID ESOP</b></h1></span></center>
       
        <div class="container d-grid gap-3 mt-2">
          <center class="logo-font"><h3><b>Login</b></h3></center>
          <form>
            <center><div class="form-floating mb-3"  style={{width:"280px"}}>
  <input type="email" class="form-control" id="floatingInput"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  placeholder="Email" required/>
  <label for="floatingInput">Email address</label>
</div>
<div class="form-floating " style={{width:"280px"}}>
  <input type="password" class="form-control" id="floatingPassword" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  placeholder="Password" required/>
  <label for="floatingPassword">Password</label>
</div>
<button className="mt-4 btn btn-primary google-font" onClick={login} style={{width:"280px"}}>{loader!==true ? <>Login</> : <div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div> }</button>
{msg!="" ? <p style={{color:"red"}}> {msg} </p>: <></>}
</center>
          </form>
        </div>
        <center><hr class="col-3"></hr></center>
        <br></br>

        <center><Link to="/RegisterCompany"><button class="btn btn-dark p-2 google-font" type="button"><b>Register a Company</b></button></Link></center>
    </div>
)
}

export default LoginCom