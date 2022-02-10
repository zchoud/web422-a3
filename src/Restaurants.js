import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import JumboHead from "./elements/JumboHead";
import RestaurantsInfo from "./elements/RestaurantsInfo";

function Restaurants() {
  let [restaurants, setRestaurants] = useState([]);
  let [page, setPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    fetch(
      `https://powerful-retreat-64160.herokuapp.com/api/restaurants?page=${page}&perPage=10` +
        (borough === undefined ? `&borough=${borough}` : ``)
    )
      .then((res) => {
        return res.json();
      })
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurants(restaurantData);
      });
  }, [location, page]);
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
        <Container fluid>
          <Row>
            {restaurants &&
              restaurants.map((record, index) => {
                return (
                  <div key={index}>
                    <Col>
                      <RestaurantsInfo
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
              })}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Restaurants;
