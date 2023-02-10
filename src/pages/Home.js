import React from "react";
import Courses from "./courses/Courses.js";
import Navbar from "./navbar/Navbar.js";

export default function Home() {
  return (
    <>
      <Navbar />
      <Courses />
    </>
  );
}
