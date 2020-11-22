import React, { Component } from "react";
import { Container, Row, Col, Card, CardDeck, Carousel , Accordion , Spinner} from "react-bootstrap";
import DetailsCarousel from "./DetailsCarousel";
import "./css/Details.css";
class Details extends Component {
  state = {
    details: [],
    spinner: true , 
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
            "2163165846msh4098addb4987fcap12e2c9jsn7001d729dab7",
        },
      }
    );
    const data = await res.json();

    this.setState({
      details: data.properties,
    });
    this.state.details.map((x) => {
      this.setState({
        surroundings: x.address.neighborhoods,
        photos: x.photos,
        featureTags: x.feature_tags,
        taxHistory: x.tax_history,
        spinner:false
      });
    });
    console.log(this.state.surroundings);
    console.log(this.state.photos);

    console.log(this.state.taxHistory);
  };
  capitalize = (str) => {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    const removeUnderScore = capital.replace(/_/g, " ");
    return removeUnderScore;
  };

  redirect = () => {
     const propertyId = this.props.match.params.id;
     window.location.href = `https://q-investment-home-front-end.herokuapp.com/CalculateROI/${propertyId}`; 
  }
  render() {
    return (
      <Container className="mt-5">

        {this.state.spinner === true ?
          <div className="d-flex flex-column" id="spinnerDiv">
              <Spinner animation="grow" id="ROISpinner"/>
              <h3 id="ROISpinnerText">Please wait While We Fetch Details</h3>
            </div> :
          <div>
            {this.state.details.map((detail, index) => {
          return (
           <div className="mx-3">
              <Row>
                <Col lg={8}>
                  {this.state.details.map((detail, index) => {
                    return (
                      <>
                        <div className="d-flex justify-content-center mt-4">
                          <h2 className="d-flex mt-1">
                            {detail.address.line} ,{" "}
                            {detail.address.neighborhood_name} ,
                            {detail.address.county} , {detail.address.city}
                          </h2>
                        </div>
                        <div className="mb-5 mt-5">
                          <h3>Overview</h3>
                        </div>
                        <hr></hr>
                        <div className="d-flex justify-content-between mt-5 mb-3">
                          <div>
                            <h4>Bedrooms</h4>
                            <h3>{detail.beds}</h3>
                          </div>
                          <div>
                            <h4>Bathrooms</h4>
                            <h3>{detail.baths}</h3>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-5">
                          <div>
                            <h4>Location</h4>
                            <h3>{detail.address.state}</h3>
                          </div>
                          <div>
                            <h4>Price</h4>
                            <h3>{detail.price}</h3>
                          </div>
                        </div>
                        <Accordion defaultActiveKey="0" className="mt-4">
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              <div className="d-flex justify-content-between">
                                <h3>Description</h3>
                                <h3>+</h3>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>{detail.description}</Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          {/* <Card className="mt-3">
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          <div className="d-flex justify-content-between">
                            <h3>Surrounding Neighbourhoods</h3>
                            <h3>+</h3>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {this.state.surroundings.length > 0 ? (
                              this.state.surroundings.map((x, index) => {
                                return (
                                  <div>
                                    {x.name}, {x.city} , {x.state_code}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center">
                                Surrounding Neighbourhoods Currently Not
                                Available
                              </div>
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card> */}
                          <Card className="mt-3">
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                              <div className="d-flex justify-content-between">
                                <h3>Features</h3>
                                <h3>+</h3>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-3 text-center">
                                  {this.state.featureTags.length > 0 ? (
                                    this.state.featureTags.map(
                                      (feature, index) => {
                                        return (
                                          <Col>{this.capitalize(feature)}</Col>
                                        );
                                      }
                                    )
                                  ) : (
                                    <div className="currentlyUnavilableText">
                                      Features Currently Not Available
                                    </div>
                                  )}
                                </Row>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          <Card className="mt-3">
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                              <div className="d-flex justify-content-between">
                                <h3>Tax History</h3>
                                <h3>+</h3>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-3 text-center">
                                  {this.state.taxHistory.length > 0 ? (
                                    this.state.taxHistory.map((tax, index) => {
                                      return (
                                        <Col>
                                          <div>
                                            <p>Year - {tax.year}</p>
                                          </div>
                                          <div>
                                            <p>Tax Value - £{tax.tax}</p>
                                          </div>
                                        </Col>
                                      );
                                    })
                                  ) : (
                                    <div className="currentlyUnavilableText">
                                      Tax History Currently Not Available
                                    </div>
                                  )}
                                </Row>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </>
                    );
                  })}
                </Col>
                <Col lg={4}>
                  <div className="mt-4">
                    <h3>Other Properties</h3>
                    <Row>
                      <Col>
                        {/* {this.state.properties.slice(1, 4).map((y, index) => {
                          return (
                            <div onClick={() => this.openModal(y.property_id)}>
                              <img src={y.thumbnail} className="mt-3"></img>
                              <div
                                onClick={() => this.openModal(y.property_id)}
                                id="otherPropertiesInsideDetailsModal"
                              >
                                <p>
                                  {y.address.line}
                                  {y.address.county}
                                </p>
                                <p>{y.address.city}</p>
                              </div>
                            </div>
                          );
                        })} */}
                        qUADRI
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
         <button id="calculateROIInsideDetailsModalBtn" onClick={()=> this.redirect()}>
                    Calculate ROI
        </button>
          </div>
        }
      
      </Container>
    );
  }
}

export default Details;
