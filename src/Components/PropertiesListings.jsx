import React, { Component, useState } from "react";
import ReactModal from "react-modal";
import {
  Container,
  Card,
  CardDeck,
  Row,
  Badge,
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
  };
  hideModal = () => {
    this.setState({
      selected: false,
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = (id) => {
    console.log(id);
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount = async () => {
    const res = await fetch(
      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "e794e7dbccmshcc370740848ba60p1c5bbfjsnf7bcad10477c",
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

  // componentWillReceiveProps = (nextProps) => {
  //   if (this.props.show !== nextProps.show) {
  //     console.log("The show prop changed!");
  //   }
  // };
  render(props) {
    return (
      <div id="property-listing-wrapper">
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
          {this.state.properties.length > 0 ? (
            <CardDeck>
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
                        <h4>£{Math.round(property.price * 0.1)}</h4>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/* <Link to={"/Details/" + property.property_id}> */}
                      <button
                        className="mt-3 mb-3"
                        onClick={this.openModal}
                        // onClick={() => {
                        //   this.setState({ selected: !this.state.selected });
                        // }}
                      >
                        More Details
                      </button>
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
                      <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={() =>
                          this.afterOpenModal(property.property_id)
                        }
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                      ></ReactModal>
                      {/* <DetailsModal
                        show={this.state.selected}
                        hideModal={this.hideModal}
                        onHide={this.hideModal}
                        id={property.property_id}

                      /> */}
                      {/* </Link> */}
                      <Link to={"/CalculateROI/" + property.property_id}>
                        <button>Calculate ROI ( Return On InvestMent )</button>
                      </Link>
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
