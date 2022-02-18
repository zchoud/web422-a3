import React from "react";
import PropTypes from "prop-types";
import {Card} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { SiGooglemaps } from 'react-icons/si'

function RestaurantsInfo(props) {
  var navigate = useNavigate();
  function handleClick(){
    navigate(`/restaurant/${props._id}`, {
      state: {
      _id: props._id,
    }
    });
  }
  return (
    <div className="res-card">
      <div onClick={handleClick}>
      <Card 
        style={{ width: "300px", height: "150px", margin:"5px" }}
      >
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle>{props.cuisine}</Card.Subtitle>
          <Card.Body><SiGooglemaps /> {props.building} {props.street}</Card.Body>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

RestaurantsInfo.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  building: PropTypes.string,
  street: PropTypes.string,
  borough: PropTypes.string,
  cuisine: PropTypes.string
};

export default RestaurantsInfo;
