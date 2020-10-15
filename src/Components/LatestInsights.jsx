import React, { Component } from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import resort1 from "../Assets/resort1.jpg";
import resort2 from "../Assets/resort2.jpg";
import resort4 from "../Assets/resort4.jpg";
import "./css/LatestInsights.css";
class LatestInsights extends Component {
  state = {};
  render() {
    return (
      <Container className="mb-5">
        <h3 className="d-flex justify-content-center mt-5 mb-5">
          Latest Insights
        </h3>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src={resort1} />
            <Card.Body>
              <Card.Title>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/investor/private-investors-ramp-up-real-estate-strategies-amid-covid19-uncertainty"
                >
                  f Private Investors Ramp Up<br></br> Real Estate Strategies
                  Amid COVID-19 Uncertainty
                </a>
              </Card.Title>
              <Card.Text>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/investor/private-investors-ramp-up-real-estate-strategies-amid-covid19-uncertainty"
                >
                  High Net Worth and Family Office capital is playing an even
                  bigger part in real estate investment across the globe as
                  private investors seek to take advantage of opportunities
                  emerging from ongoing uncertainty.
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={resort2} />
            <Card.Body>
              <Card.Title>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/investor/domestic-investors-boost-real-estate-markets"
                >
                  Domestic Investors Boost Real Estate Markets
                </a>
              </Card.Title>
              <Card.Text>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/investor/domestic-investors-boost-real-estate-markets"
                >
                  Countries with deep domestic pools of capital outperformed the
                  broader market in the first half of the year. Countries with
                  deep domestic pools of capital outperformed the broader market
                  in the first half of the year.
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={resort4} />
            <Card.Body>
              <Card.Title>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/research/reimagining-real-estate-achieving-a-sustainable-and-just-recovery"
                >
                  Reimagining Real Estate: Achieving A Sustainable & Just
                  Recovery
                </a>
              </Card.Title>
              <Card.Text>
                <a
                  className="blog-link"
                  href="https://www.jll.co.uk/en/trends-and-insights/research/reimagining-real-estate-achieving-a-sustainable-and-just-recovery"
                >
                  Our new report outlines three priority areas for the real
                  estate sector as we adjust to the new world and reimagine the
                  decade ahead.
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default LatestInsights;
