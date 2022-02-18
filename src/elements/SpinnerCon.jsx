import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';

function SpinnerCon() {
  return (
    <div><Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Spinner animation="border" />
      </Col>
    </Row>
  </Container></div>
  )
}

export default SpinnerCon