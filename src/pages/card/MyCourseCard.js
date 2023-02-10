import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyCourseCard(props) {
  const notify = () => toast("Pomyślnie wypisano z kursu!");

  const handleClick = (event) => {
    let token = localStorage.getItem("token");
    let id = event.currentTarget.id;
    let date = new Date().toISOString().split("T")[0];
    // console.log(date);
    try {
      axios
        .post(
          `http://${process.env.REACT_APP_MYHOST}/signoffcourse`,
          {
            date: date,
            courseID: id,
          },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .catch((error) => console.log(error))
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getCoursesData();
  // }, []);

  return (
    <>
      <div className="card">
        {/* <Link to={`/offer/${props.id}}`}> */}
        <div className="card-body">
          <img src={props.img} />
          <p className="card-date">{props.date.slice(0, 10)}</p>
          <p className="card-location">{props.location}</p>
          <h2 className="card-title">{props.title}</h2>
          <p className="card-description">{props.description}</p>
        </div>
        {/* </Link> */}
        <Link
          to={"/mojekursy"}
          className="card-btn"
          id={props.id}
          onClick={handleClick}
        >
          Wypisz się
        </Link>
      </div>
      {/* <ToastContainer hideProgressBar={true} /> */}
    </>
  );
}
