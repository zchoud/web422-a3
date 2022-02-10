import React from "react";
import { Jumbotron } from "react-bootstrap";
import PropTypes from "prop-types";

function JumboHead(props) {
  return (
    <Jumbotron>
      <h2>{props.head}</h2>
      <span>{props.subtitle}</span>
    </Jumbotron>
  );
}

JumboHead.propTypes = {
    head: PropTypes.string,
    subtitle: PropTypes.string
};

export default JumboHead;
