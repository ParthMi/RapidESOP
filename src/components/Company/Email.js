// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

// export const Email = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_x4idkc5', 'template_rqp2zto', form.current, 'A_8SGElinJDF8jOc1')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };

//   return (
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <input type="text" name="emp_name" value="parth mi"/>
      
//       <input type="email" name="emp_email" value="parthmiroliya72784@gmail.com"/>
      
//       <input type="text" name="emp_password" value="pmiroliya"/>
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>
//   );
// };