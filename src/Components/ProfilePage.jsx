import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import swal from '@sweetalert/with-react'
import "../Components/css/profilePage.css"
class ProfilePage extends Component {
  state = {
    accountBalance: "",
    paymentDetails: {
      amountToBePaid: "",
      nameOnCard: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  };
  makePayment = async (event) => {
    event.preventDefault();
    const convertPaymentToInteger = parseInt(
      this.state.paymentDetails.amountToBePaid
    );

    if (this.state.paymentDetails.amountToBePaid === "") {
      swal("Enter A Valid Amount", "Error", {
            })
    }

    else {
      let accountBalanceResponse = await fetch(
        `https://q-investment-home-back-end.herokuapp.com/account/${localStorage.userId}`,
        {
          method: "POST",
          body: JSON.stringify({
            balance : this.state.paymentDetails.amountToBePaid
          }) , 
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      if (accountBalanceResponse.ok) {
                 swal("Sweet ! ! !", "Payment Success", {  
            }).then((ok) => {
              if (ok) {
                window.location.reload(true);
                window.history.back()
   }
 });
      }
      
      else {
       swal("Oopss... , Something Went Wrong", "Error", {
            })
      }
    }
  };

  updatePaymentForm = (event) => {
    let paymentDetails = this.state.paymentDetails;
    let id = event.currentTarget.id;
    paymentDetails[id] = event.currentTarget.value;
    this.setState({
      paymentDetails,
    });
  };
  render() {
    return (
      <>
        <div>
          {this.state.accountBalance !== "" ? (
            <div>Profile Page</div>
          ) : (
            <div>
                <Container id="profileWrapper">
                  <h2 className="text-center">Top Up Your Account</h2>
                <Form className="mt-5" onSubmit={(e) => this.makePayment(e)}>
                  <Form.Group style={{ marginTop: "1rem" }}>
                    <Form.Control
                      htmlFor="nameOnCard"
                      className="mb-3"
                      type="text"
                      id="nameOnCard"
                      value={this.state.paymentDetails.nameOnCard}
                      placeholder="Enter The Name On Your Card"
                      size="md"
                      onChange={(e) => this.updatePaymentForm(e)}
                    />
                    <Form.Control
                      htmlFor="cardNumber"
                      className="mb-3"
                      type="text"
                      id="cardNumber"
                      value={this.state.paymentDetails.cardNumber}
                      placeholder="Enter The Number On Your Card"
                      size="md"
                      onChange={(e) => this.updatePaymentForm(e)}
                    />
                    <Form.Control
                      htmlFor="expiryDate"
                      className="mb-3"
                      type="Date"
                      id="expiryDate"
                      value={this.state.paymentDetails.expiryDate}
                      placeholder="Enter The Expiry Date On Your Card"
                      size="md"
                      onChange={(e) => this.updatePaymentForm(e)}
                    />
                    <Form.Control
                      htmlFor="cvv"
                      className="mb-3"
                      type="text"
                      id="cvv"
                      value={this.state.paymentDetails.cvv}
                      placeholder="Enter The CVV On Your Card"
                      size="md"
                      onChange={(e) => this.updatePaymentForm(e)}
                    />
                    <Form.Control
                      htmlFor="amountToBePaid"
                      className="mb-3"
                      type="text"
                      id="amountToBePaid"
                      value={this.state.paymentDetails.amountToBePaid}
                      placeholder="Enter The Amount To Be Paid"
                      size="md"
                      onChange={(e) => this.updatePaymentForm(e)}
                    />
                  </Form.Group>
                  <div className="text-center mt-3">
                    <button id="topUp" type="submit" className=" mt-3 ">
                      Pay Now
                    </button>
                  </div>
                </Form>
              </Container>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ProfilePage;
