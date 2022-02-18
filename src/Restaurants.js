import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import JumboHead from "./elements/JumboHead";
import RestaurantsInfo from "./elements/RestaurantsInfo";
import { Spinner } from "react-bootstrap";

import "./Restaurants.css";
import EmptySet from "./elements/EmptySet";

function Restaurants() {
  let [restaurants, setRestaurants] = useState([]);
  let [page, setPage] = useState(1);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    fetch(
      `https://powerful-retreat-64160.herokuapp.com/api/restaurants?page=${page}&perPage=10` +
        (borough === undefined ? `&borough=${borough}` : ``)
    )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setIsFilled(false);
      })
      .then((res) => {
        return res.json();
      })
      .then((restaurantData) => {
        console.log(restaurantData.length);
        if(restaurantData.length > 0){
          setRestaurants(restaurantData);
          setIsFilled(true);
        }
        else{
          setIsFilled(false);
        }
        setLoading(false);
      });
  }, [location, page, setIsFilled]);
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <>
      <div>
        <JumboHead
          head="Restaurant List"
          subtitle="Full list of restaurants. Optionally sorted by borough"
        />
        <Container fluid id="list-restaurant">
          <Row className="justify-content-md-center">
            {loading ? (
              <Spinner animation="border" />
            ) : (isFilled ? (
              restaurants.map((record, index) => {
                return (
                  <div key={index}>
                    <Col className="col-md-3">
                      <RestaurantsInfo
                        _id={record._id}
                        name={record.name}
                        building={record.address.building}
                        street={record.address.street}
                        borough={record.borough}
                        cuisine={record.cuisine}
                        key={record._id}
                      />
                    </Col>
                  </div>
                );
              })
            ) : (
              <Col className='col-md-12' style={{paddingBottom: "30px"}}>
              <EmptySet />
              </Col>)
            )}
          </Row>
        </Container>
        <Pagination>
          <Pagination.Prev onClick={prevPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>
    </>
  );
}

export default Restaurants;
