import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import JumboHead from "./elements/JumboHead";
import { Placeholder, Spinner, Container, Row, Col } from "react-bootstrap";
import Map from "./elements/Map";
import EmptySet from "./elements/EmptySet";
import SpinnerCon from "./elements/SpinnerCon";

function Restaurant() {
  let [restaurant, setRestaurant] = useState({});
  let [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://powerful-retreat-64160.herokuapp.com/api/restaurants/${id}`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .then((data) => {
        if (data.length < 1) {
          return (<><EmptySet /></>)
        } else {
          setRestaurant(data);
          setLoading(false);
        }
      });
  }, [loading, id]);
  return (
    <div>
      {!loading && restaurant ? (
        <JumboHead
          head={restaurant.name}
          subtitle={
            restaurant.address.building + " " + restaurant.address.street
          }
        />
      ) : (
        <JumboHead />
      )}
      {!loading && restaurant ? (
        <Map res={restaurant} />
      ) : (
        <SpinnerCon />
      )}
    </div>
  );
}

export default Restaurant;
