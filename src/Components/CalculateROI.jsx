import React, { Component } from "react";
import { Container, Form, FormGroup, Button, Spinner, Row, Col , DropdownButton , ButtonGroup , Dropdown } from "react-bootstrap";
import { PieChart } from 'react-minimal-pie-chart';
import {Link} from "react-router-dom"
import swal from '@sweetalert/with-react'
import ReactModal from "react-modal";
import "../Components/css/CalculateROI.css"
import ReactSvgPieChart from "react-svg-piechart"
import { convertCurrency, getCurrencyRate, getCurrencyRateList } from 'currencies-exchange-rates';




class CalculateROI extends Component {
  state = {
    dataForPie : [],
    roiDiv: false,
    naira: false,
    dollars: false,
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
    reloadCheck: false,
    minimumInvestMent:""
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
            "2163165846msh4098addb4987fcap12e2c9jsn7001d729dab7",
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
        minimumInvestMent: parseInt(detail.price / 4)
      });
    });


    this.setState({
      openROISpinner : false
    })
    console.log(this.state.details);
    console.log("pie" , this.state.dataForPie)
  };

 

  updateInvestmentValue = (event) => {
    this.setState({
      investmentValue: event.target.value,
    });
  };

  convertToNaira = () => {
    if (this.state.roiDiv === false) {
       swal("Please Calculate ROI", "error")
    }
    else {
      const yearlyIncomeToNaira = this.state.yearlyIncome * 600 
      const priceToNaira = parseInt(this.state.price * 600)
      const minimumInvestMentToNaira = Math.round(priceToNaira / 4)
      const minimumInvestMentInNaira = minimumInvestMentToNaira * 600 
      this.setState({
        yearlyIncome: yearlyIncomeToNaira,
        price: priceToNaira,
        minimumInvestMent: minimumInvestMentInNaira,
        naira:true
      })

    }
 
   
  }

  convertToDollars = () => {
      if (this.state.roiDiv === false) {
       swal("Please Calculate ROI", "error")
    }
    else {
      const yearlyIncomeToDollars = Math.round(this.state.yearlyIncome * 1.33 )
      const priceToDollars = parseInt(this.state.price * 1.33)
      const minimumInvestMentToDollars = Math.round(priceToDollars / 4)
      const minimumInvestMentInDollars = Math.round(minimumInvestMentToDollars * 1.33 )
      this.setState({
        yearlyIncome: yearlyIncomeToDollars,
        price: priceToDollars,
        minimumInvestMent: minimumInvestMentInDollars ,
        dollars:true
      })
    }

  }

  calculateROI = (e) => {
    const data = []
    e.preventDefault()
    const convertValue = parseInt(this.state.investmentValue)
    const convertPropertyPrice = parseInt(this.state.price)
    const mininumInvestment =Math.round(convertPropertyPrice / 4);
    if (convertValue !== this.state.minimumInvestMent) {
      swal("Amount Entered isn't minimum investment value", "error")
      
      
    }
    else if (this.state.investmentValue === "")  {
      swal("Please Enter A Valid Value", "error")
    }
    else  {
      const yearlyIncome = 500000; 
      const currentValue = yearlyIncome + convertPropertyPrice
      const profit = currentValue - convertPropertyPrice
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
        roiDiv: true,
    minimumInvestMent:mininumInvestment
      }) 
      const dataFake = [{
        Value : this.state.roiToPercent , Label : "ROI"
      }, { Value: this.state.roiForEachInvestor  ,Label:"ROI For Each Investor" },
        { Value: this.state.annualReturnOnInvest , Label:"Annual Return On Investment" },
        { Value: this.state.annualReturnOnInvestForEach , Label:"Annual Return For Each Investor" }]
      dataFake.map((d) => {
        const insert = {
         Label: d.Label, 
      Value: d.Value,
        }
        this.state.dataForPie.push(insert)
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
      `https://q-investment-home-back-end.herokuapp.com/account/${localStorage.userId}`,
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
        console.log(balanceFromApi.balance)
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
                value={this.state.minimumInvestMent}
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
              {this.state.address.line}  {this.state.address.county}  {this.state.address.city}
            </h3>
              </div>
              <Row>
                <Col>           
                <DropdownButton as={ButtonGroup} title="Select Other Currencies" id="bg-vertical-dropdown-2">
    <Dropdown.Item eventKey="1" onClick={()=> this.convertToDollars()}>Dollars (USD)</Dropdown.Item>
    <Dropdown.Item eventKey="2"onClick={()=> this.convertToNaira()}>Naira (NGN)</Dropdown.Item>
  </DropdownButton>
                </Col>
                <Col>
                  {this.state.naira === true ?
                    <div>
                 <div className="d-flex justify-content-between mt-4">
            <h5>Property Value</h5>
            <h4>N {this.state.price}</h4>
          </div>{" "}
          <div className="d-flex justify-content-between mt-4">
            <h5>Minimum Investment</h5>
            <h4>N {this.state.minimumInvestMent}</h4>
              </div>
                    </div> : this.state.dollars === true ?
                      <div>
                        <div className="d-flex justify-content-between mt-4">
            <h5>Property Value</h5>
            <h4>$ {this.state.price}</h4>
          </div>{" "}
          <div className="d-flex justify-content-between mt-4">
            <h5>Minimum Investment</h5>
            <h4>$ {this.state.minimumInvestMent}</h4>
              </div>

                      </div> :
                      <div>
                        <div className="d-flex justify-content-between mt-4">
            <h5>Property Value</h5>
            <h4>£ {this.state.price}</h4>
          </div>{" "}
          <div className="d-flex justify-content-between mt-4">
            <h5>Minimum Investment</h5>
            <h4>£ {this.state.minimumInvestMent}</h4>
              </div>  
                  </div> }
                </Col>
              </Row>
                <div>
              </div>
          </div>
          }
          <hr></hr>
          {this.state.roiDiv === false ?
            <div id="noInvestmentValueDiv">
              <p className="text-center" id="noInvestmentValueDivText">Please Calculate Return On Investment</p>
            </div> :
            
          
            <div id="roiDiv">
               <Row id="pie-chart-row">
                <Col>
                  <PieChart
                    animate
              animationDuration={2400}
              animationEasing="ease-out"
              center={[50, 50]}
              lengthAngle={360}
              lineWidth={15}
              paddingAngle={0}
              radius={50}
                    rounded
                    startAngle={0}
                    viewBoxSize={[100, 100]}
                    labelPosition={65}
                  data={[
                    { title: 'we are', value: this.state.roiToPercent, color: '#E38627' },
                    { title: 'Two', value: this.state.roiForEachInvestor, color: '#C13C37' },
                      { title: 'Three', value: this.state.annualReturnOnInvest, color: '#6A2135' },
                    {title:"four" , value:this.state.annualReturnOnInvestForEach , color : "#692569"}
                  ]}
                style={{ height: '300px' }}
/>
                </Col>
                <Col className="mt-5">
                  <div  className="d-flex flex-row">
            <div id="first-one"></div>
            <p className="mx-3 mt-2">Return On Investment</p>
          </div>
          <div  className="d-flex flex-row">
            <div id="second-one"></div>
            <p className="mx-3 mt-2">Return On Investment For Each Investor</p>
          </div>
          <div  className="d-flex flex-row">
            <div id="third-one"></div>
            <p className="mx-3 mt-2">Annual Return On Investment</p>
          </div>
          <div  className="d-flex flex-row">
            <div id="fourth-one"></div>
            <p className="mx-3 mt-2">Annual Return On Investment For Each Investor</p>
          </div>
                </Col>
              </Row>
              <hr></hr>
                  {this.state.naira === true ?
                    <div>
              <div className="d-flex justify-content-between mt-4">
            <h5>Expected Investment Income Per Year</h5>
            <h4>N {this.state.yearlyIncome} </h4>
          </div> 
                    </div> : this.state.dollars === true ?
                      <div>
    <div>
              <div className="d-flex justify-content-between mt-4">
            <h5>Expected Investment Income Per Year</h5>
            <h4>$ {this.state.yearlyIncome} </h4>
          </div> 
                    </div>

                      </div> : <div>
                            <div>
              <div className="d-flex justify-content-between mt-4">
            <h5>Expected Investment Income Per Year</h5>
            <h4 className="mx-3">£ {this.state.yearlyIncome} </h4>
          </div> 
                    </div>
                    </div>
                }  
          <div className="d-flex justify-content-between mt-4">
            <h5>Return On Investment</h5>
          <h4 className="mx-3">{this.state.roiToPercent} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Return On Investment For Each Investor</h5>
          <h4 className="mx-3">{this.state.roiForEachInvestor} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5>Annual Return On Investment</h5>
          <h4 className="mx-3">{this.state.annualReturnOnInvest} %</h4>
          </div>
          <div className="d-flex justify-content-between mt-4">
                <h5>Annual Return On Investment For Each Investor</h5>
                {this.state.annualReturnOnInvestForEach === "0" ? <h4>1 %</h4> : <h4> {this.state.annualReturnOnInvestForEach} %</h4>}
            
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
