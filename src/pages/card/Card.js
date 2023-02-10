import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Card(props) {
  const [limit, setLimit] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState([]);

  const getLimit = () => {
    try {
      axios
        .get(`http://${process.env.REACT_APP_MYHOST}/limit`)
        .then((res) => {
          setLimit(res.data);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };
  const participants = () => {
    for (let i = 0; i < limit.length; i++) {
      if (limit[i].ID === props.id) {
        return (
          <p className="card-date">
            Limit osób: {limit[i].ILOSC_UCZESTNIKOW}/{props.limit}
          </p>
        );
      }
    }
  };

  const isLimitFull = () => {
    for (let i = 0; i < limit.length; i++) {
      if (limit[i].ID === props.id) {
        return props.limit !== limit[i].ILOSC_UCZESTNIKOW ? (
          <Link to={"oferta/" + props.id} className="card-btn">
            Zobacz ofertę
          </Link>
        ) : (
          <Link to={"/"} className="card-btn">
            Brak miejsc
          </Link>
        );
      }
    }
  };

  useEffect(() => {
    getLimit();
  }, []);

  const todayDate = new Date().toISOString().slice(0, 10);
  return (
    <>
      {props.date.slice(0, 10) > todayDate ? (
        <div className="card">
          <div className="card-body">
            <img src={props.img} />
            <p className="card-date">{props.date}</p>
            {participants()}
            <p className="card-location">Grupa: {props.group}</p>
            <p className="card-location">{props.location}</p>
            <h2 className="card-title">{props.title}</h2>
            <p className="card-description">{props.description}</p>
          </div>
          {isLimitFull()}
        </div>
      ) : (
        <div className="card-disabled">
          <div className="card-body">
            <img src={props.img} />
            <p className="card-date">{props.date}</p>
            {participants()}
            <p className="card-location">Grupa: {props.group}</p>
            <p className="card-location">{props.location}</p>
            <h2 className="card-title">{props.title}</h2>
            <p className="card-description">{props.description}</p>
          </div>
          <Link to={"/"} className="card-btn">
            Szkolenie wygasło
          </Link>
        </div>
      )}
    </>
  );
}
