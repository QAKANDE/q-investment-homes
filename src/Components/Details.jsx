import React, { Component } from "react";

class Details extends Component {
  state = {
    details: {},
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
            "b41254000bmshb62e314b3254f24p1dac92jsn6f1fc3174939",
        },
      }
    );
    const details = await res.json();
    console.log(details);
    this.setState({
      details,
    });
    console.log(this.state.details);
  };
  render() {
    return <div>Quadri</div>;
  }
}

export default Details;
