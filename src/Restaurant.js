import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JumboHead from "./elements/JumboHead";
import Map from "./elements/Map";
import EmptySet from "./elements/EmptySet";
import SpinnerCon from "./elements/SpinnerCon";
import Ratings from "./elements/Ratings";

function Restaurant() {
  let [restaurant, setRestaurant] = useState({});
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://powerful-retreat-64160.herokuapp.com/api/restaurants/${id}`)
      .then((res) => {
        if(res.status !== 200){
          setEmpty(true);
          throw new Error("Failed to get restaurant ID " + {id});
        }
        return res.json();
      })
      .then((data) => {
        if (data.length < 1) {
          return (<><EmptySet /></>)
        } else {
          setRestaurant(data);
          setLoading(false);
          setEmpty(false);
        }
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        setEmpty(true);
      });
  }, [loading, id]);
  //if the fetch failed return to showing there is no restaurant to show
  if(empty){
    return (<><EmptySet /></>);
  }

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
        <>
        <Map res={restaurant} />
        <Ratings res={restaurant} />
        </>
      ) : (
        <SpinnerCon />
      )}
    </div>
  );
}

export default Restaurant;
