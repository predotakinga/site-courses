// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// const AuthWrapper = () => {
//   let location = useLocation();
//   console.log(location);
//   const decodedJwt = jwtDecode(localStorage.getItem("token"));
//   if (decodedJwt.exp < Math.floor(Date.now() / 1000) - 30)
//     return <Navigate to="/login" replace />;
// };

// export default AuthWrapper;
