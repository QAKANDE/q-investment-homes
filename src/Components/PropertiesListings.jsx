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
    this.setState(
      { modalIsOpen: true, cardId: id, dataForModal: data.properties },
      () => console.log(this.state.dataForModal)
    );
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
                      // className="rounded-circle z-depth-2"
                      variant="top"
                      src={property.thumbnail}
                      alt="Property Image"
                    />
                    <Card.Body id="cardBody">
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
                        <h4>£{Math.round(property.price / 4)}</h4>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/* <Link to={"/Details/" + property.property_id}> */}
                      <div className="d-flex justify-content-between">
                        <button
                          className="mt-3 mb-3"
                          onClick={() => this.openModal(property.property_id)}
                        >
                          More Details
                        </button>
                        <button
                          onClick={() =>
                            this.openROIModal(property.property_id)
                          }
                          className="mx-4"
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
              {this.state.dataForModal.map((detail, index) => {
                return (
                  <>
                    <div className="d-flex justify-content-center">
                      <h4 className="d-flex mt-1">
                        {detail.address.line} ,{" "}
                        {detail.address.neighborhood_name} ,
                        {detail.address.county} , {detail.address.city}
                      </h4>
                    </div>
                    <Row className="mb-5 mt-5">
                      <Col id="overview">
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
                        <hr></hr>
                        <div className="mb-3">
                          <h3>Property Description</h3>
                        </div>
                        <div>
                          <h3>{detail.description}</h3>
                        </div>
                        <hr></hr>
                        <h3 className="d-flex justify-content-center mt-5 mb-5">
                          Surrounding Neighborhoods
                        </h3>
                        {this.state.surroundings.map((x, index) => {
                          return (
                            <h5 className="d-flex justify-content-center">
                              {x.name}, {x.city} , {x.state_code}
                            </h5>
                          );
                        })}
                        <hr></hr>
                        <h3 className="d-flex justify-content-center mb-5 mt-5">
                          Property Features
                        </h3>
                        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-3 text-center">
                          {this.state.featureTags.length > 0 ? (
                            this.state.featureTags.map((feature, index) => {
                              return (
                                <Card
                                  key={index}
                                  className="col"
                                  id="feature-card"
                                >
                                  <Card.Body>
                                    <Card.Title>
                                      {this.capitalize(feature)}
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              );
                            })
                          ) : (
                            <div>Loading...</div>
                          )}
                        </Row>
                        <hr></hr>
                        <h3 className="d-flex justify-content-center mt-5 mb-5">
                          Property Tax History
                        </h3>
                        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-4 text-center">
                          {this.state.taxHistory.map((tax, index) => {
                            return (
                              <Card
                                key={index}
                                className="col"
                                id="feature-card"
                              >
                                <Card.Body>
                                  <Card.Title>Year - {tax.year}</Card.Title>
                                  <Card.Text> Tax Value - £{tax.tax}</Card.Text>
                                </Card.Body>
                              </Card>
                            );
                          })}
                        </Row>
                      </Col>
                      {/* <Col id="price-details" className="mx-3">
                          <div>
                            <div className="d-flex justify-content-center mt-4">
                              <h3 className="d-flex mt-4">Property Price</h3>
                            </div>
                            <div className="d-flex justify-content-center">
                              <h4>£{detail.price}</h4>
                            </div>
                          </div>
                        </Col> */}
                    </Row>
                  </>
                );
              })}
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
