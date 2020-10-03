import React, { Component, useState, useEffect } from "react";
import { Container, Card, CardDeck, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/PropertyListing.css";
class PropertyListings extends Component {
  state = {
    properties: [],
  };
  componentDidMount = async () => {
    const response = await fetch(
      "http://api.zoopla.co.uk/api/v1/property_listings.js?area=England&api_key=w7y65ynfkd4fbatgmd9jaskn",
      {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
        }),
      }
    );
    const details = await response.json();
    this.setState({
      properties: details.listing,
    });
    console.log(details);
    console.log(this.state.properties);
    this.state.properties.map((q) => {
      console.log(q.agent_address);
    });
  };
  render() {
    return (
      <>
        <Container>
          <div className="mt-4">
            <h3 className="d-flex justify-content-center">
              Available Investment Opportunities
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis
            </p>
          </div>
          {/* <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-3 mb-4 text-center"> */}
          <CardDeck>
            {this.state.properties.slice(0, 3).map((property, i) => {
              return (
                <Card key={i}>
                  <Card.Img variant="top" src={property.image_url} />
                  <Card.Body>
                    <Card.Title>
                      <p>{property.property_type}</p>
                      <p>{property.displayable_address}</p>
                    </Card.Title>
                    <hr></hr>
                    <Card.Text>
                      <p>{property.short_description}</p>
                      <hr></hr>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Bedrooms</h5>
                          <h4>{property.num_bedrooms}</h4>
                        </div>
                        <div>
                          <h5>Price</h5>
                          <h4>£{property.price}</h4>
                        </div>
                      </div>
                      <hr></hr>
                      <h5>Minimum Investment</h5>
                      <h4>£{property.price * 0.1}</h4>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={"/CalculateROI"}>
                      <button>Calculate ROI ( Return On InvestMent )</button>
                    </Link>
                  </Card.Footer>
                </Card>
              );
            })}
          </CardDeck>
          {/* </Row> */}
        </Container>
        <hr></hr>
      </>
    );
  }
}

export default PropertyListings;
