import React,{useState} from 'react'
import load from './load.png'
import contactimg from './contactbackground.png'
import './Company/css/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, set, ref } from 'firebase/database';
import './../context/Firebase'

const Contact_rapid = () => {
  const cemail = localStorage.getItem("email")
  const cname = localStorage.getItem("cname")
  const tost = (message) => toast.success(message);

  const db = getDatabase();
  const [companyname, setCompanyname] = useState(cname);
  const [email, setEmail] = useState(cemail);
  const [message, setMessage] = useState();

  const send = (e) => {
    e.preventDefault();
    set(ref(db, "ContactMessages/" + Date() + ""), {
        company_name: companyname,
        email: email,
        message: message
    })
    tost("Message sent successfully")
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
            <a href="mailto:rapid.esop@gmail.com">
 <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" height={50}/></a>&nbsp;&nbsp;
            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254551/whatsapp-icon-md.png" height={50}/></center>
            
            
          </div>
          <div className='col mt-2'>
            <center>
              <form onSubmit={(e) => send(e)}>
                <div class="form-floating mb-3 ">
                  <input type="text" class="form-control" id="floatingPassword" placeholder='Name' required
                  value={companyname}
                  onChange={e => setCompanyname(e.target.value)}
                  readOnly/>
                  <label for="floatingPassword">Company Name</label>
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
                  <button class="btn btn-dark  col-md-6">Send to  <span className='logo-font'> <img src={load} height={"40px"} /><b> RAPID ESOP</b></span></button>
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

export default Contact_rapid
