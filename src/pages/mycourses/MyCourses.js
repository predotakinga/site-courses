import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "../card/Card.css";
import { useLocation } from "react-router-dom";
import MyCourseCard from "../card/MyCourseCard";

export default function MyCourses() {
  const location = useLocation();
  const [cardProps, setCardProps] = useState("");

  const getCoursesData = () => {
    let token = localStorage.getItem("token");

    try {
      axios
        .get(`http://${process.env.REACT_APP_MYHOST}/mycourses`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCardProps(res.data);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoursesData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="courses">
        {cardProps &&
          cardProps.map((card, index) => {
            return (
              <div key={index} className="wrapper">
                <MyCourseCard
                  id={card.ID}
                  img={card.ZDJECIE}
                  title={card.NAZWA}
                  description={card.OPIS}
                  location={card.LOKALIZACJA}
                  limit={card.LIMIT}
                  date={card.DATA.substr(0, 10) + card.DATA.substr(12, 16)}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
