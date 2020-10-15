import React, { Component } from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";

class CalculateROI extends Component {
  state = {
    details: {},
    propertyName: "",
    propertyPrice: "",
    investmentValue: "",
    expectedInvestmentIncome: null,
    expectedExpenses: null,
    excessCash: null,
    cashOnCashReturns: null,
    capitalGainsGrowth: null,
    netProfit: null,
    ROI: null,
  };
  // componentDidMount = async () => {
  //   const propertyId = this.props.match.params.id;
  //   const res = await fetch(
  //     `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${propertyId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "realtor.p.rapidapi.com",
  //         "x-rapidapi-key":
  //           "b41254000bmshb62e314b3254f24p1dac92jsn6f1fc3174939",
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   console.log(data);
  //   this.setState({
  //     details: data.properties,
  //   });
  //   console.log(this.state.details);
  // };

  updateInvestmentValue = (event) => {
    this.setState({
      investmentValue: event.target.value,
    });
  };

  calculateROI = (e) => {
    e.preventDefault();
    const convertValue = parseInt(this.state.investmentValue);
    const newExpectedInvestmentIncome = 5000 * 52;
    const newExpectedExpenses = 9000;
    const newExcessCash = newExpectedInvestmentIncome - newExpectedExpenses;
    const newCashOnCashReturns = (newExcessCash / convertValue) * 100;
    const newCapitalGainsGrowth = convertValue * 0.05;
    const newNetProfit = newCapitalGainsGrowth + newExcessCash;
    const newROI = Math.round((newNetProfit / convertValue) * 100);

    this.setState({
      expectedInvestmentIncome: newExpectedInvestmentIncome,
      expectedExpenses: newExpectedExpenses,
      excessCash: newExcessCash,
      cashOnCashReturns: newCashOnCashReturns,
      capitalGainsGrowth: newCapitalGainsGrowth,
      netProfit: newNetProfit,
      ROI: newROI,
      investmentValue: "",
    });
    console.log(newROI);
    console.log(this.state.ROI);
  };
  render() {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-2">
          <h3>Calculate ROI ( Return On Investment )</h3>
        </div>

        <div className="mt-3">
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
            <button onClick={(e) => this.calculateROI(e)}>
              Calculate ROI ( Return On Investment )
            </button>
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
    );
  }
}

export default CalculateROI;