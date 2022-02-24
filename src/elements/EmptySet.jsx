import React from "react";
import { Card } from "react-bootstrap";

function EmptySet() {
  return (
    <Card style={{ backgroundColor: "#F0F0F0", width: "full" }}>
      <Card.Body>No restaurant(s) to show...</Card.Body>
    </Card>
  );
}

export default EmptySet;
