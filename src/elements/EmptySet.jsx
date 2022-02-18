import React from "react";
import { Card, Col } from "react-bootstrap";

function EmptySet() {
  return (
    <Card style={{ backgroundColor: "#F0F0F0", width: "full" }}>
      <Card.Body>No restaurants to show...</Card.Body>
    </Card>
  );
}

export default EmptySet;
