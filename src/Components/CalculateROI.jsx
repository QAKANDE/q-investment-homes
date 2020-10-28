import React, { Component } from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";

class CalculateROI extends Component {
  state = {
    price: "",
    address: {},

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
  componentDidMount = async () => {
    const propertyId = this.props.match.params.id;
    const res = await fetch(
      `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${propertyId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key":
            "99f1701846mshccb023096a35442p152124jsne97c1895a6fe",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    this.setState({
      details: data.properties,
    });

    this.state.details.map((detail) => {
      return this.setState({
        price: detail.price,
        address: detail.address,
      });
    });
    console.log(this.state.details);
  };

  updateInvestmentValue = (event) => {
    this.setState({
      investmentValue: event.target.value,
    });
  };

  calculateROI = (e) => {
    e.preventDefault()
    const convertValue = parseInt(this.state.investmentValue)
    const expectedIncome = 10000;
    const cost = this.state.price
   const  percentageOfInvestor = cost / convertValue * 100
     const netProfit = expectedIncome - cost 

  }

  // calculateROI = (e) => {
  //   e.preventDefault();
  //   const convertValue = parseInt(this.state.investmentValue);
  //   const newExpectedInvestmentIncome = 1000 * 52;
  //   const newExpectedExpenses = 500;
  //   const newExcessCash = newExpectedInvestmentIncome - newExpectedExpenses;
  //   const newCashOnCashReturns = (newExcessCash / convertValue) * 100;
  //   const newCapitalGainsGrowth = convertValue * 0.05;
  //   const newNetProfit =
  //     newCapitalGainsGrowth + newExcessCash / this.state.propertyPrice;
  //   const grossYield = newExpectedInvestmentIncome / this.state.propertyPrice;
  //   const newROI = Math.round(convertValue - newNetProfit * 0.01);
  //   // const newExpectedInvestmentIncome = 1000 * 52;
  //   // const newExpectedExpenses = 500;
  //   // const investCost = convertValue + newExpectedExpenses;
  //   // const grossYield = newExpectedInvestmentIncome / this.state.propertyPrice;
  //   // const newROI = (newExpectedInvestmentIncome - investCost) / investCost;

  //   // // const ROIToPercent = Math.round(newROI / 100);
  //   // const ROIToPercent = 10000;

  //   // this.setState({
  //   //   expectedInvestmentIncome: newExpectedInvestmentIncome,
  //   //   expectedExpenses: newExpectedExpenses,
  //   //   // excessCash: newExcessCash,
  //   //   // cashOnCashReturns: newCashOnCashReturns,
  //   //   // capitalGainsGrowth: newCapitalGainsGrowth,
  //   //   // netProfit: newNetProfit,
  //   //   grossYield,
  //   //   ROI: newROI,
  //   //   investmentValueToDisplay: convertValue,
  //   //   investmentValue: "",
  //   // });

  //   console.log(this.state.ROI);
  //   console.log(newROI);
  // };

  // calculateROI = (e) => {
  //   e.preventDefault();
  //   const convertValue = parseInt(this.state.investmentValue);
  //   const newExpectedInvestmentIncome = 5000 * 52;
  //   const newExpectedExpenses = 9000;
  //   const newExcessCash = newExpectedInvestmentIncome - newExpectedExpenses;
  //   const newCashOnCashReturns = (newExcessCash / convertValue) * 100;
  //   const newCapitalGainsGrowth = convertValue * 0.05;
  //   const newNetProfit = newCapitalGainsGrowth + newExcessCash;

  //   const newROI = Math.round((newNetProfit / convertValue) * 100);

  //   this.setState({
  //     expectedInvestmentIncome: newExpectedInvestmentIncome,
  //     expectedExpenses: newExpectedExpenses,
  //     excessCash: newExcessCash,
  //     cashOnCashReturns: newCashOnCashReturns,
  //     capitalGainsGrowth: newCapitalGainsGrowth,
  //     netProfit: newNetProfit,
  //     ROI: newROI,
  //     investmentValue: "",
  //   });
  //   console.log(newROI);
  //   console.log(this.state.ROI);
  // };
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
          <div>
            <p>
              {this.state.address.line} , {this.state.address.county} ,{" "}
              {this.state.address.city}
            </p>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Property Value</h5>
            <h4>£ {this.state.price}</h4>
          </div>{" "}
          <div className="d-flex justify-content-between mt-4">
            <h5>Minimum Investment</h5>
            <h4>£ {Math.round(this.state.price / 5)}</h4>
          </div>
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
