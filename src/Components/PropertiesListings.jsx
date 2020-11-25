import React, { Component, useState } from "react";
import ReactModal from "react-modal";
import placeHolder from "../Assets/propertyplace.jpg";
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
 

  capitalize = (str) => {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    const removeUnderScore = capital.replace(/_/g, " ");
    return removeUnderScore;
  };


  componentDidMount = async () => {
    const res = await fetch(
      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "559b910a19msh7a2a72572d95136p1a1475jsn0f903e02b330",
        },
      }
    );
    const data = await res.json();
    this.setState({
      properties: data.properties,
    });
    console.log("props" , this.state.properties.slice(0,3))
  };
  render(props) {
    return (
      <div id="property-listing-wrapper">
        <Container className="mt-5">
          <div id="property-listings-header-wrapper">
            <h3 className="text-center"  id="property-listings-header">Some Investment Opportunities</h3>
            <p>
              The Archi-Kraft Consults real estate crowdfunding platform is the
              only platform where all investors actually own the properties, can
              stay there if they want and earn high yield rental income.
            </p>
          </div>
          {this.state.properties.length > 0 ? (
            <CardDeck className="mt-5 mb-5">
              {this.state.properties.slice(0, 3).map((property, i) => {
                return (
                  <Card key={i} id="property-card">
                    {!property.thumbnail  ?
                      <Card.Img
                      variant="top"
                      src={placeHolder}
                      alt="Property Image"
                    /> :    
                    <Card.Img
                      variant="top"
                      src={property.thumbnail}
                      alt="Property Image"
                    />
                    }
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
                        <h4>£{Math.round(property.price / 5)}</h4>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
          
                      <div className="d-flex justify-content-between align-items-center">
                         <Link to={"/Details/" + property.property_id}>
                        <button
                          id="propertyListingsDetailsButton"
                          className="mt-3 mb-3"
                          // onClick={() => this.openModal(property.property_id)}
                        >
                          More Details
                        </button>
                        
                        </Link>
                        <Link to={"/CalculateROI/" + property.property_id}>
                          <button
                            // onClick={() =>
                            //   this.openROIModal(property.property_id)
                            // }
                            id="propertyListingsROIButton"
                          >
                            Calculate ROI
                          </button>
                        </Link>
                      </div>
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
        </Container>
        <hr></hr>
      </div>
    );
  }
}

export default PropertyListings;
