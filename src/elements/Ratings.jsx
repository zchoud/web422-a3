import {Container, Row, Col} from "react-bootstrap";
import './Ratings.css';

function Ratings(props) {
  return (
    <>
    {props.res.grades.length > 0 && (
      <Container className="reviewSet">
        <Row><Col className="col-md-12"><h3>Reviews</h3></Col></Row>
        {props.res.grades.map((grade, index) => {
            return (
                <Row key={"mainRow" + index}>
                  <Container className="review" key={"review" + index}>
                    <Row key={"headRow" + index}>
                      <Col key={"colRow" + index}>
                        <h5 key={"h5Row" + index}>Review: #{index + 1}</h5>
                      </Col>
                    </Row>
                    <Row className="details" key={"details" + index}>
                      <Col key={"date" + index}>Date: {grade.date.substring(0, 10)}</Col>
                      <Col key={"score" + index}>Score: {grade.score}</Col>
                      <Col key={"grade" + index}>Grade: {grade.grade}</Col>
                    </Row>
                  </Container>
                </Row>
            )
          })}
      </Container>
    )}
    </>
  );
}

export default Ratings;
