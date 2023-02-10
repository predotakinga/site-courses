import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MyCourses from "./pages/mycourses/MyCourses";
import Offer from "./pages/offer/Offer";
import Login from "./pages/login/Login";
import Page404 from "./pages/page404/Page404";
import jwtDecode from "jwt-decode";

function App() {
  let isExpired = false;
  let decodedToken;
  let token;
  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token");
    decodedToken = jwtDecode(token, { complete: true });
    let dateNow = new Date();
    let dateExp = new Date(decodedToken.exp * 1000);
    if (dateExp < dateNow.getTime()) {
      isExpired = true;
    }
    if (isExpired === true) localStorage.removeItem("token");
  }

  // console.log(Math.floor(Date.now() / 1000) - 30 + 60 * 60);

  const isAuthenticated = !!localStorage.getItem("token");
  // localStorage.removeItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<Page404 />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/mojekursy"
          element={isAuthenticated ? <MyCourses /> : <Navigate to="/login" />}
        />
        <Route
          path={`/oferta/:id`}
          element={isAuthenticated ? <Offer /> : <Navigate to="/login" />}
        />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<AuthWrapper />}>
//           <Route path="/" element={<Home />} />
//         </Route>
//         <Route element={<AuthWrapper />}>
//           <Route path="/login" element={<Login />} />
//         </Route>
//         <Route element={<AuthWrapper />}>
//           <Route path="/mojekursy" element={<MyCourses />} />
//         </Route>
//         <Route element={<AuthWrapper />}>
//           <Route path={`/oferta/:id`} element={<Offer />} />
//         </Route>
//         <Route element={<AuthWrapper />}>
//           <Route path="*" element={<Page404 />} />{" "}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
