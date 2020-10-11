import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./css/DetailsModal.css";
class DetailsModal extends Component {
  //   constructor(props) {
  //     super(props);
  //     console.log("baba", this.props.id);
  //   }
  state = {};
  componentDidMount = async () => {
    const propertyId = this.props.id;
    console.log(propertyId);
    // const res = await fetch(
    //   `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${propertyId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "realtor.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "e794e7dbccmshcc370740848ba60p1c5bbfjsnf7bcad10477c",
    //     },
    //   }
    // );
    // const detailsFromApi = await res.json();
    // this.setState({
    //   details: detailsFromApi.properties,
    // });
    // this.state.details.map((x) => {
    //   this.setState({
    //     surroundings: x.address.neighborhoods,
    //     photos: x.photos,
    //     featureTags: x.feature_tags,
    //     taxHistory: x.tax_history,
    //   });
    // });
    // console.log(this.state.surroundings);
    // console.log(this.state.photos);
    // console.log(this.state.details);
    // console.log(this.state.taxHistory);
  };
  render() {
    return (
      <div>
        <Modal
          dialogClassName="modal-90w"
          size="xl"
          show={this.props.show}
          onHide={() => this.props.hideModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(DetailsModal);
