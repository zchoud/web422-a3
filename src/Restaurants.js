import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import JumboHead from "./elements/JumboHead";
import RestaurantsInfo from "./elements/RestaurantsInfo";
import { Spinner } from "react-bootstrap";
import "./Restaurants.css";
import EmptySet from './elements/EmptySet';

function Restaurants() {
  //upon render start page number to 1 
  //if there is a search parameter for borough add that to the fetch url
  let [restaurants, setRestaurants] = useState([]);
  let [page, setPage] = useState(1);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let [borough, setBorough] = useState(null);
  let [empty, setEmpty] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    let url = `https://powerful-retreat-64160.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
    if(borough !== null){
      borough = borough.charAt(0).toUpperCase() + borough.substring(1, borough.length).toLowerCase();
      url = url + `&borough=${borough}`;
      setBorough(borough);
    }
    else{
      setBorough(null);
    }
    fetch(url)
      .then((res) => {
        if(res.status !== 200){
          setEmpty(true);
          throw new Error("failed to fetch");
        }
        return res.json();
      })
      .then((restaurantData) => {
        if(restaurantData.length > 0){
          setEmpty(false);
          setRestaurants(restaurantData);
        }
        else{
          setEmpty(true);
          setBorough(null);
        }
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        setEmpty(true);
      });
  }, [location, page, borough, empty]);
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  if(empty){
    return (<><EmptySet /></>);
  }

  return (
    <>
      <div>
        <JumboHead
          head={`Restaurant List`}
          subtitle={`Full list of restaurants${borough ? " located in " + borough : "."}`}
        />
        <Container fluid id="list-restaurant">
          <Row className="justify-content-md-center">
            {loading ? (
              <Spinner animation="border" />
            ) : (
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
