// import React, { useState } from "react";
// import logo from "../../assets/logo.png";
// import "./login.css";

// export default function LoginForm({ Login, error }) {
//   const [details, setDetails] = useState({ name: "", email: "", password: "" });

//   const submitHandler = (e) => {
//     e.preventDefault();

//     Login(details);
//   };

//   return (
//     <>
//       <div className="login-container">
//         <form onSubmit={submitHandler}>
//           <img src={logo} alt="Logo" className="logo-img" />
//           <div className="form-inner">
//             {error !== "" ? <div className="error">{error}</div> : ""}
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 placeholder="Email"
//                 onChange={(e) =>
//                   setDetails({ ...details, email: e.target.value })
//                 }
//                 value={details.email}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                   setDetails({ ...details, password: e.target.value })
//                 }
//                 value={details.password}
//               />
//             </div>
//             <input
//               type="submit"
//               value="Zaloguj"
//               className="login-button"
//             ></input>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
