import React from "react";
import PropTypes from "prop-types";
import {Card} from 'react-bootstrap'

function RestaurantsInfo(props) {
  return (
    <div>
      <Card style={{ width: "20rem", height: "15rem", margin:"5px" }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

RestaurantsInfo.propTypes = {
  name: PropTypes.string,
  building: PropTypes.string,
  street: PropTypes.string,
  borough: PropTypes.string,
  cuisine: PropTypes.string
};

export default RestaurantsInfo;
