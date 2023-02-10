import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import "./Offer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AiFillCar, AiFillFileExcel } from "react-icons/ai";
// import { szkolenie_czesc_pierwsza } from "../../assets/szkolenie_czesc_pierwsza.xlsx";

export default function Offer() {
  const [offerProps, setOfferProps] = useState("");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const endPoint = window.location.href.split("/").at(-1);

  const notify = () => toast("Pomyślnie zapisano do kursu!");

  const getCoursesData = async () => {
    try {
      await axios
        .get(`http://${process.env.REACT_APP_MYHOST}/courses/${endPoint}`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setOfferProps(res.data);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  const joinCourse = () => {
    const date = new Date().toISOString().split("T")[0];
    try {
      axios
        .post(
          `http://${process.env.REACT_APP_MYHOST}/joincourse`,
          {
            date: date,
            courseID: endPoint,
          },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .catch((error) => console.log(error))
        .then(() => {
          return navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
    notify();
  };

  useEffect(() => {
    getCoursesData();
    console.log(offerProps);
  }, []);

  // let s = offerProps[0].OPIS_DLUGI;
  // console.log(s.replace(/&/g, "\n"));

  let dateToCompare = new Date().toISOString();

  // let content = offerProps[0].OPIS_DLUGI;
  // let dataArray = content.split("&");
  // let opisDlugi = dataArray.join("\n");

  // console.log(dataArray);
  // console.log(dataArray.join("\n"));

  return (
    <>
      <Navbar />
      <div className="container">
        {offerProps &&
          offerProps.map((offer, index) => {
            return (
              <div key={index} className="offer">
                <h2>{offer.NAZWA}</h2>
                <div className="container-tiny">
                  <div className="left">
                    <img src={offer.ZDJECIE} className="cover" alt="" />
                  </div>
                  <div className="right">
                    <div className="place">
                      <div className="address">
                        <p style={{ marginRight: "0.2rem" }}>
                          {offer.LOKALIZACJA}, {offer.LOKALIZACJA_ULICA}
                          {"  "}
                        </p>
                        <a href={offer.MAPA}>
                          <AiFillCar size="28px" />
                        </a>
                      </div>
                      <p>{offer.DATA.slice(0, 10)}</p>
                      <p>
                        {offer.DATA.slice(11, 16)}-
                        {offer.DATA_KONIEC.slice(11, 16)}
                      </p>
                    </div>

                    <div className="description">
                      <p>{offer.OPIS_DLUGI}</p>
                    </div>

                    <div className="place">
                      <p>Zapisy otwarte do: </p>
                      <p>{offer.DATA_KONIEC_ZAPISOW.slice(0, 10)}</p>
                    </div>
                    <div className="address">
                      <p style={{ marginRight: "0.2rem" }}>
                        Pełen plan szkolenia:
                        {"  "}
                      </p>
                      <a href={offer.EXCEL}>
                        <AiFillFileExcel size="28px" />
                      </a>
                    </div>
                    <ToastContainer hideProgressBar={true} />
                  </div>
                </div>
                {dateToCompare > offer.DATA_KONIEC_ZAPISOW.slice(0, 10) ? (
                  <button className="btn">Koniec zapisów</button>
                ) : (
                  <button onClick={joinCourse} className="btn">
                    Zapisz się
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}
