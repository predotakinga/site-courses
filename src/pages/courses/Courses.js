import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import axios from "axios";
import "../card/Card.css";
import "./Courses.css";

export default function Courses() {
  const [cardProps, setCardProps] = useState([]);
  const [filterParam, setFilterParam] = useState("Wszystko");

  const getCoursesData = async () => {
    let token = localStorage.getItem("token");
    try {
      await axios
        .get(`http://${process.env.REACT_APP_MYHOST}/courses`, {
          headers: {
            // "Content-Type": "application/json",
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

  cardProps.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.DATA) - new Date(a.DATA);
  });

  return (
    <>
      <div className="select">
        <select
          id="standard-select"
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
        >
          <option value="Wszystko">Wszystko</option>
          <option value="Warszawa">Warszawa</option>
          <option value="Poznań">Poznań</option>
          <option value="Łódź">Łódź</option>
          <option value="Kraków">Kraków</option>
        </select>
      </div>
      <div className="courses">
        {cardProps &&
          cardProps
            .filter((card) => {
              if (filterParam === "Wszystko") return card;
              else if (card.LOKALIZACJA === filterParam) return card;
            })
            .map((card, index) => {
              return (
                <div key={index} className="wrapper">
                  <Card
                    id={card.ID}
                    img={card.ZDJECIE}
                    title={card.NAZWA}
                    description={card.OPIS}
                    location={card.LOKALIZACJA}
                    group={card.GRUPA}
                    limit={card.LIMIT}
                    date={card.DATA.substr(0, 10)}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
}
