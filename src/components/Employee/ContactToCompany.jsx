import React,{useState} from 'react'
import contactimg from '../contactbackground.png'
import './css/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../API/Api'

const ContactToCompany = () => {
    const eid=localStorage.getItem("eid")
    const cid=localStorage.getItem("cid")
    const tost = (message) => toast.success(message);   
    const [uname, setUname] = useState();
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [message, setMessage] = useState();
  
    const send = async (e) => {
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

        try {
          let res = await fetch(BaseUrl + '/api/company/' + cid + '/emp/' + eid + '/contact', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uname: uname,
              email: email,
              message: message,
              time: strTime,
              eid: eid,
              cid: cid,
            })
          });
          let resJson = await res.json();
          if (resJson) {
            console.log(resJson)
            setUname("")
            setMessage("")
            setMessage(resJson.meassage);
            if (resJson.status === "OK") {
              tost(resJson.meassage)
            }
          } else {
            tost("Some error occured")
          }
        } catch (err) {
          console.log(err);
        }
      setMessage("")
  }
  
    return (
      <div>
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
        <div className="container p-3 google-font" style={{ backgroundImage: 'url(' + contactimg + ')', backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
          <h3><b>How can we help?</b></h3>
  
          <div className='row'>
            <div className='col p-3 mt-4'>
              We value your feedback, inquiries, and suggestions. Please don't hesitate to reach out to us. Our team is here to assist you and provide the information you need.
  
              <br></br>
              <br></br>
              <br></br>
              <center>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Linkedin_circle_black-512.png" height={50}/>&nbsp;&nbsp;
              <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" height={50}/>&nbsp;&nbsp;
              <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254551/whatsapp-icon-md.png" height={50}/></center>
              
              
            </div>
            <div className='col mt-2'>
              <center>
                <form onSubmit={(e) => send(e)}>
                  <div class="form-floating mb-3 ">
                    <input type="text" class="form-control" id="floatingPassword" placeholder='Name' required
                    value={uname}
                    onChange={e => setUname(e.target.value)}
                    />
                    <label for="floatingPassword">Your Name</label>
                  </div>
                  <div class="form-floating mb-3 6">
                    <input type="email" class="form-control" id="floatingInput"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='example@email.com' required readOnly/>
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating  mb-3">
                    <textarea class="form-control" placeholder="Leave a message here" id="floatingTextarea2"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{ height: "100px" }} required></textarea>
                    <label for="floatingTextarea2">Message</label>
                  </div>
  
                  <div class="form-floating">
                    <button class="btn btn-dark  col-md-6">Send</button>
                  </div>        </form></center></div>
  
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    )
  }

export default ContactToCompany
