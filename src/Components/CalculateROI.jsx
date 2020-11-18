import React, { Component } from "react";
import { Container, Form, FormGroup, Button, Spinner , Row , Col} from "react-bootstrap";
import {Link} from "react-router-dom"
import swal from '@sweetalert/with-react'
import ReactModal from "react-modal";
import "../Components/css/CalculateROI.css"

class CalculateROI extends Component {
  state = {
    price: "",
    address: {},
    openROISpinner: true , 
    propertyName: "",
    propertyPrice: "",
    investmentValue: "",
    roiToPercent: "",
    roiForEachInvestor: "",
    yearlyIncome: "",
    annualReturnOnInvest: "",
    annualReturnOnInvestForEach: "", 
    reloadCheck : false,
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
            "3e6e71316fmsh4aac5b7ec80b565p135d26jsn334c29d48c43",
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

    this.setState({
      openROISpinner : false
    })
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
    const convertPropertyPrice = parseInt(this.state.price)
    const mininumInvestment =Math.round(convertPropertyPrice / 4);
    if (convertValue !== mininumInvestment) {
      swal("Amount Entered isn't minimum investment value", "error")
      
      
    }
    else if (this.state.investmentValue === "")  {
      swal("Please Enter A Valid Value", "error")
    }
    else  {
      const yearlyIncome = 500000; 
      const currentValue = yearlyIncome + convertPropertyPrice
      const profit = currentValue - convertPropertyPrice
      // const minimumInvestMentDifferenceWithPrice = mininumInvestment / convertPropertyPrice 
      // const mininumInvestmentInPercent = Math.round(minimumInvestMentDifferenceWithPrice * 100)
      const roi = profit / convertPropertyPrice
      const roiToPercent = Math.round(roi * 100)
      const roiForEachInvestor = Math.round(roiToPercent / 4)
      const annualReturnOnInvest = Math.round(roiToPercent / 5 )
      const annualReturnOnInvestForEach = Math.round(roiForEachInvestor / 5)
      this.setState({
    roiToPercent,
    roiForEachInvestor ,
    yearlyIncome,
    annualReturnOnInvest,
    annualReturnOnInvestForEach, 
      })      
    }
  }

  investInProperty = async () => {  
    const convertValue = parseInt(this.state.investmentValue)
    if (!localStorage.userId) {
                   swal("Please Log In", {  
            }).then((ok) => {
              if (ok) {
                window.location.href = `https://q-investment-home-front-end.herokuapp.com/Login`; 
   }
 });
    }
    else if (this.state.investmentValue === "") {
      swal ( "Please Enter An Investment Value" ,  "error" )
       
    }
    else if (this.state.yearlyIncome === "") {
       
      swal ( "Please Calculate ROI" ,  "error" )
      
    }
    else {
       const accountBalanceResponse = await fetch(
      `https://q-investment-home-back-end.herokuapp.com/${localStorage.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
      const balanceFromApi = await accountBalanceResponse.json();
      console.log(balanceFromApi)
      if (balanceFromApi.balance < convertValue || balanceFromApi.balance === 0) {
                      swal("Please Top Up Your Account", {  
            }).then((ok) => {
              if (ok) {
                window.location.href = `https://q-investment-home-front-end.herokuapp.com/profile`; 
   }
 })
      }
      else {
        const deductFromBalance = await fetch(`https://q-investment-home-back-end.herokuapp.com/account/accountBalanceReduce/${localStorage.userId}`,
        {
          method: "POST",
         body: JSON.stringify({
          balance : convertValue
        }) ,
        headers: {
          "Content-Type": "Application/json",
        },
          })
                         swal("Investment Successful", {  
            }).then((ok) => {
              if (ok) {
                window.location.reload() 
   }
 })
          this.setState({
        investmentValue : "" 
      })
      }

    }
    
  }
  render() {
    return (
      <Container className="mt-5">
           {/* <ReactModal isOpen={this.state.openROISpinner}  id="ROISpinnerOpenModal"> 
              <Spinner animation="grow" id="ROISpinner" />
          </ReactModal> */}
        <div className="d-flex justify-content-center" id="calculateROIHeader">
          <h3>Calculate ROI ( Return On Investment )</h3>
        </div>

        <div id="formDiv">
          <Row>
            <Col xl={9}>
              <Form>
              <Form.Control
                type="text"
                placeholder="Please Enter Investment Value"
                value={this.state.investmentValue}
                onChange={(e) => this.updateInvestmentValue(e)}
              />
            
          </Form>
            </Col>
            <Col xl={3}> 
            <button onClick={(e) => this.calculateROI(e)} className="mx-3" id="calculate-roi-button">
              Calculate ROI
            </button>
            </Col>
          </Row>
        </div>
        <div id="roiDiv">
          {this.state.price === "" ?
            <div  className="d-flex flex-column">
              <Spinner animation="grow" id="ROISpinner"/>
              <h3 id="ROISpinnerText">Please wait While We Fetch Details</h3>
            </div> :              
          <div>
          <div className="text-center" id="property-address">
            <h3>
              {this.state.address.line} , {this.state.address.county} ,{" "}
              {this.state.address.city}
            </h3>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Property Value</h5>
            <h4>£ {this.state.price}</h4>
          </div>{" "}
          <div className="d-flex justify-content-between mt-4">
            <h5>Minimum Investment</h5>
            <h4>£ {Math.round(this.state.price / 4)}</h4>
          </div>
          </div>
          }
          <hr></hr>
          {this.state.yearlyIncome === "" ?
            <div id="noInvestmentValueDiv">
              <p className="text-center" id="noInvestmentValueDivText">Please Calculate Return On Investment</p>
            </div> : 
          
          <div>
              <div className="d-flex justify-content-between mt-4">
            <h5>Expected Investment Income Per Year</h5>
            <h4>£ {this.state.yearlyIncome} </h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Return On Investment</h5>
            <h4>{this.state.roiToPercent} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Return On Investment For Each Investor</h5>
            <h4>{this.state.roiForEachInvestor} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Annual Return On Investment</h5>
            <h4>{this.state.annualReturnOnInvest} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Annual Return On Investment For Each Investor</h5>
            <h4> {this.state.annualReturnOnInvestForEach} %</h4>
          </div>
          </div>
          }
        </div>
        <div className="text-center" id="investBtnDiv">
      <button id= "calculate-invest-button" onClick= {()=>this.investInProperty()}>Invest</button>
        </div>
      </Container>
    );
  }
}

export default CalculateROI;
