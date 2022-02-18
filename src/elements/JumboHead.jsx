import React from "react";
import { Jumbotron } from "react-bootstrap";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function JumboHead(props) {
  return (
    <Jumbotron>
      <SkeletonTheme baseColor="#A9A9A9" width={200}>
      <h2>{props.head || <Skeleton />}</h2>
      <span>{props.subtitle || <Skeleton />}</span>
      </SkeletonTheme>
    </Jumbotron>
  );
}

JumboHead.propTypes = {
    head: PropTypes.string,
    subtitle: PropTypes.string
};

export default JumboHead;
