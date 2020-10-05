import React, { Component } from "react";
import { Container, Card, CardDeck, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/PropertyListing.css";
class PropertyListings extends Component {
  state = {
    properties: [],
  };
  componentDidMount = async () => {
    // const response = await fetch(
    //   "http://api.zoopla.co.uk/api/v1/property_listings.js?area=England&api_key=pg7bx4r9jazkrpjbfkxeb8ag",
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       "content-type": "application/json",

    //     }),
    //   }
    // );
    // const details = await response.json();
    // this.setState({
    //   properties: details.listing,
    // });
    // console.log(details);
    // console.log(this.state.properties);
    // this.state.properties.map((q) => {
    //   console.log(q.agent_address);
    // });

    const res = await fetch(
      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "b41254000bmshb62e314b3254f24p1dac92jsn6f1fc3174939",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    this.setState({
      properties: data.properties,
    });
    console.log(this.state.properties);
  };
  render() {
    return (
      <>
        <Container>
          <div className="mt-4">
            <h3 className="d-flex justify-content-center">
              Some Investment Opportunities
            </h3>
            <p>
              The Archi-Kraft Consults real estate crowdfunding platform is the
              only platform where all investors actually own the properties, can
              stay there if they want and earn high yield rental income.
            </p>
          </div>
          {/* <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-3 mb-4 text-center"> */}
          <CardDeck>
            {this.state.properties.slice(0, 3).map((property, i) => {
              return (
                <Card key={i}>
                  <Card.Img
                    variant="top"
                    src={property.thumbnail}
                    alt="Property Image"
                  />
                  <Card.Body>
                    <Card.Title>
                      <p>
                        {property.address.line} , {property.address.county}
                      </p>
                      <p>{property.address.city}</p>
                      <Badge className="property-listing-badge">
                        {property.prop_status}
                      </Badge>
                    </Card.Title>
                    <hr></hr>
                    <Card.Text>
                      {/* <h4>{property.building_size.size} Square Feets</h4> */}
                      <hr></hr>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Bedrooms</h5>
                          <h4>{property.beds}</h4>
                        </div>
                        <div>
                          <h5>Bathrooms</h5>
                          <h4>{property.baths}</h4>
                        </div>
                      </div>
                      <hr></hr>
                      <h5>Price</h5>
                      <h4>£{property.price}</h4>
                      <hr></hr>
                      <h5>Minimum Investment</h5>
                      <h4>£{property.price * 0.1}</h4>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={"/Details/" + property.property_id}>
                      <button className="mt-3 mb-3">More Details</button>
                    </Link>
                    <Link to={"/CalculateROI/" + property.property_id}>
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
