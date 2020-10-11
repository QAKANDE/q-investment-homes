import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
class DetailsCarousel extends Component {
  state = {};
  render() {
    return (
    
        <Carousel.Item interval={1000}>
          <img src={this.props.href} className="d-block w-100"></img>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
    
    );
  }
}

export default DetailsCarousel;
