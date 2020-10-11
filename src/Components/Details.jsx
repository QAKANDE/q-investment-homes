import React, { Component } from "react";
import { Container, Row, Col, Card, CardDeck, Carousel } from "react-bootstrap";
import DetailsCarousel from "./DetailsCarousel";
import "./css/Details.css";
class Details extends Component {
  state = {
    details: [],
    surroundings: [],
    photos: [],
    featureTags: [],
    taxHistory: [],
  };

  componentDidMount = async () => {
    const propertyId = this.props.match.params.id;
    const res = await fetch(
      `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${propertyId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "e794e7dbccmshcc370740848ba60p1c5bbfjsnf7bcad10477c",
        },
      }
    );
    const detailsFromApi = await res.json();

    this.setState({
      details: detailsFromApi.properties,
    });
    this.state.details.map((x) => {
      this.setState({
        surroundings: x.address.neighborhoods,
        photos: x.photos,
        featureTags: x.feature_tags,
        taxHistory: x.tax_history,
      });
    });
    console.log(this.state.surroundings);
    console.log(this.state.photos);
    console.log(this.state.details);
    console.log(this.state.taxHistory);
  };
  capitalize = (str) => {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    const removeUnderScore = capital.replace(/_/g, " ");
    return removeUnderScore;
  };
  render() {
    return (
      <Container className="mt-5">
        {/* <Carousel>
          {this.state.photos.map((photo, index) => {
            return <DetailsCarousel href={photo.href} key={index} />;
          })}
        </Carousel> */}
        {this.state.details.map((detail, index) => {
          return (
            <>
              <div className="d-flex justify-content-center">
                <h4 className="d-flex mt-1">
                  {detail.address.line} , {detail.address.neighborhood_name} ,
                  {detail.address.county} , {detail.address.city}
                </h4>
              </div>
              <Row className="mb-4">
                <Col id="overview">
                  <div>
                    <h3>Overview</h3>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>Bedrooms</h4>
                      <h3>{detail.beds}</h3>
                    </div>
                    <div>
                      <h4>Bathrooms</h4>
                      <h3>{detail.baths}</h3>
                    </div>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <h3>{detail.state}</h3>
                  </div>
                </Col>
                <Col id="price-details" className="mx-3">
                  <div>
                    <div className="d-flex justify-content-center mt-4">
                      <h3 className="d-flex mt-4">Property Price</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h4>£{detail.price}</h4>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          );
        })}
      </Container>
    );
  }
}

export default Details;
