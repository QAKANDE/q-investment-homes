import React, { Component, useState } from "react";
import ReactModal from "react-modal";
import {
  Container,
  Card,
  CardDeck,
  Row,
  Col,
  Badge,
  Form,
  Carousel,
  Accordion,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/PropertyListing.css";
import DetailsModal from "./DetailsModal";
class PropertyListings extends Component {
  state = {
    properties: [],
    selected: false,
    modalIsOpen: false,
    ROIModalIsOpen: false,
    cardId: null,
    dataForModal: [],
    dataForROI: [],
    surroundings: [],
    photos: [],
    featureTags: [],
    taxHistory: [],
    propertyName: "",
    propertyPrice: null,
    investmentValue: "",
    expectedInvestmentIncome: null,
    expectedExpenses: null,
    excessCash: null,
    cashOnCashReturns: null,
    capitalGainsGrowth: null,
    netProfit: null,
    grossYield: null,
    ROI: null,
    investmentValueToDisplay: null,
  };
  hideModal = () => {
    this.setState({
      selected: false,
    });
  };

  openModal = async (id) => {
    const res = await fetch(
      `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "1cebc59b22mshcf0f5b3f9cc23d6p1684afjsn9ae8ff134827",
        },
      }
    );
    const data = await res.json();

    this.setState({
      modalIsOpen: true,
      cardId: id,
      dataForModal: data.properties,
    });
    this.state.dataForModal.map((x) => {
      this.setState({
        surroundings: x.address.neighborhoods,
        photos: x.photos,
        featureTags: x.feature_tags,
        taxHistory: x.tax_history,
      });
    });
    console.log(this.state.surroundings);
    console.log(this.state.photos);

    console.log(this.state.taxHistory);
  };
  openROIModal = async (id) => {
    const res = await fetch(
      `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "1cebc59b22mshcf0f5b3f9cc23d6p1684afjsn9ae8ff134827",
        },
      }
    );
    const data = await res.json();

    this.setState(
      { ROIModalIsOpen: true, ROICardId: id, dataForROI: data.properties },
      () => console.log(this.state.dataForROI)
    );
    this.state.dataForROI.map((x) => {
      return this.setState({ propertyPrice: x.price });
    });
  };
  updateInvestmentValue = (event) => {
    this.setState({
      investmentValue: event.target.value,
    });
  };

  calculateROI = (e) => {
    e.preventDefault();

    const convertValue = parseInt(this.state.investmentValue);
    // const newExpectedInvestmentIncome = 5000 * 52;
    // const newExpectedExpenses = 9000;
    // const newExcessCash = newExpectedInvestmentIncome - newExpectedExpenses;
    // const newCashOnCashReturns = (newExcessCash / convertValue) * 100;
    // const newCapitalGainsGrowth = convertValue * 0.05;
    // const newNetProfit =
    //   newCapitalGainsGrowth + newExcessCash / this.state.propertyPrice;
    // const grossYield = newExpectedInvestmentIncome / this.state.propertyPrice;
    // const newROI = Math.round(convertValue - newNetProfit * 100);
    const newExpectedInvestmentIncome = 1000 * 52;
    const newExpectedExpenses = 1000;
    const investCost = convertValue + newExpectedExpenses;
    const grossYield = newExpectedInvestmentIncome / this.state.propertyPrice;
    const newROI = newExpectedInvestmentIncome - investCost / investCost;

    const ROIToPercent = Math.round(newROI / 100);

    this.setState({
      expectedInvestmentIncome: newExpectedInvestmentIncome,
      expectedExpenses: newExpectedExpenses,
      // excessCash: newExcessCash,
      // cashOnCashReturns: newCashOnCashReturns,
      // capitalGainsGrowth: newCapitalGainsGrowth,
      // netProfit: newNetProfit,
      grossYield,
      ROI: ROIToPercent,
      investmentValueToDisplay: convertValue,
      investmentValue: "",
    });

    console.log("happened", ROIToPercent, this.state.ROI);
  };
  capitalize = (str) => {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    const removeUnderScore = capital.replace(/_/g, " ");
    return removeUnderScore;
  };

  afterOpenModal = (id) => {
    console.log("quadri");
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  closeROIModal = () => {
    this.setState({ ROIModalIsOpen: false });
  };

  componentDidMount = async () => {
    const res = await fetch(
      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "1cebc59b22mshcf0f5b3f9cc23d6p1684afjsn9ae8ff134827",
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
  render(props) {
    return (
      <div id="property-listing-wrapper">
        <Container className="mt-4">
          <div className="mt-5">
            <h3 className="text-center">Some Investment Opportunities</h3>
            <p>
              The Archi-Kraft Consults real estate crowdfunding platform is the
              only platform where all investors actually own the properties, can
              stay there if they want and earn high yield rental income.
            </p>
          </div>
          {/* <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-3 mb-4 text-center"> */}
          {this.state.properties.length > 0 ? (
            <CardDeck className="mt-5">
              {this.state.properties.slice(0, 3).map((property, i) => {
                return (
                  <Card key={i} id="property-card">
                    <Card.Img
                      variant="top"
                      src={property.thumbnail}
                      alt="Property Image"
                    />
                    <Card.Body id="cardBody">
                      <Card.Title>
                        <div>
                          <p>
                            {property.address.line} , {property.address.county}
                          </p>
                          <p>{property.address.city}</p>
                        </div>
                      </Card.Title>
                      <hr></hr>
                      <Card.Text>
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
                        <h4>£{Math.round(property.price / 4)}</h4>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/* <Link to={"/Details/" + property.property_id}> */}
                      <div className="d-flex justify-content-between">
                        <button
                          id="propertyListingsDetailsButton"
                          className="mt-3 mb-3"
                          onClick={() => this.openModal(property.property_id)}
                        >
                          More Details
                        </button>
                        <button
                          onClick={() =>
                            this.openROIModal(property.property_id)
                          }
                          id="propertyListingsROIButton"
                        >
                          Calculate ROI
                        </button>
                      </div>
                      {/* <Modal
                        dialogClassName="modal-90w"
                        size="xl"
                        show={this.state.selected}
                        onHide={() => this.hideModal()}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body></Modal.Body>
                      </Modal> */}

                      {/* <DetailsModal
                        show={this.state.selected}
                        hideModal={this.hideModal}
                        onHide={this.hideModal}
                        id={property.property_id}

                      /> */}
                      {/* </Link> */}
                      {/* <Link to={"/CalculateROI/" + property.property_id}> */}

                      {/* </Link> */}
                    </Card.Footer>
                  </Card>
                );
              })}
            </CardDeck>
          ) : (
            <div>
              <div className="d-flex justify-content-center">
                <Spinner animation="grow" />
              </div>
              <div className="d-flex justify-content-center">
                <h2>Please Wait While We Fetch Properties...</h2>
              </div>
            </div>
          )}
          {/* </Row> */}
          <ReactModal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            data={this.state.dataForModal}
            contentLabel="Example Modal"
          >
            <div className="mx-3">
              {/* {this.state.photos.length > 0 ? (
                <Carousel>
                  {this.state.photos.map((photo, index) => {
                    return (
                      <Carousel.Item
                        interval={1000}
                        key={index}
                        className="img-fluid"
                      >
                        <img
                          className="d-block w-100 "
                          src={photo.href}
                          alt="First slide"
                        />
                        <Carousel.Caption>
                          <h3>{this.capitalize(photo.tags[0].label)}</h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                <div></div>
              )} */}

              <Row>
                <Col lg={8}>
                  {this.state.dataForModal.map((detail, index) => {
                    return (
                      <>
                        <div className="d-flex justify-content-center mt-4">
                          <h4 className="d-flex mt-1">
                            {detail.address.line} ,{" "}
                            {detail.address.neighborhood_name} ,
                            {detail.address.county} , {detail.address.city}
                          </h4>
                        </div>
                        <div className="mb-5 mt-5">
                          <h3>Overview</h3>
                        </div>
                        <hr></hr>
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
                        <div className="d-flex justify-content-between">
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
                  <button id="calculateROIInsideDetailsModalBtn">
                    Calculate ROI
                  </button>
                </Col>
                <Col lg={4}>
                  <div className="mt-4">
                    <h3>Other Properties</h3>
                    <Row>
                      <Col>
                        {this.state.properties.slice(1, 4).map((y, index) => {
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
                        })}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </ReactModal>
          <ReactModal isOpen={this.state.ROIModalIsOpen}>
            <div
              id="closeROI"
              className="d-flex justify-content-center"
              onClick={() => this.closeROIModal()}
            >
              X
            </div>
            <button onClick={() => console.log("here")}>
              Calculate ROI ( Return On Investment )
            </button>
            <Container>
              <div className="d-flex justify-content-center mt-1">
                <h3>Calculate ROI ( Return On Investment )</h3>
              </div>

              <div className="mt-1">
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Investment Value</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please Enter Investment Value"
                      value={this.state.investmentValue}
                      onChange={(e) => this.updateInvestmentValue(e)}
                    />
                    <Form.Text className="text-muted">
                      Minimum Investment - £2,000,000
                    </Form.Text>
                  </Form.Group>
                </Form>
              </div>
              <div>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Property Value</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>{" "}
                <hr></hr>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Expected Investment Income Per Year</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Expected Expense Per Year</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Excess Cash</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Cash On Cash Return</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h5>Capital Gain Growth</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between mt-4 mb-2">
                  <h5>Return On Investment ( ROI )</h5>
                  <h4>£ Value In Pounds Placeholder </h4>
                </div>
              </div>
            </Container>
          </ReactModal>
        </Container>
        <hr></hr>
      </div>
    );
  }
}

export default PropertyListings;
