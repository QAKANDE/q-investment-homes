import React, { Component, useState, useEffect } from "react";
import { Container, Card, CardDeck, Row } from "react-bootstrap";
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
          <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-3 mb-4 text-center">
            {this.state.properties.slice(3, 9).map((property, i) => {
              return (
                <Card className="Col" key={i}>
                  <Card.Img variant="top" src={property.image_url} />
                  <Card.Body>
                    <Card.Title>{property.property_type}</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      <p>{property.short_description}</p>
                      <p>{property.num_bedrooms} Bedrooms</p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              );
            })}
          </Row>
        </Container>
        <hr></hr>
      </>
    );
  }
}

export default PropertyListings;
