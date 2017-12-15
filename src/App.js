import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Container, Row, Col, Jumbotron, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardText, } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onConfirmationNumberChange = this.onConfirmationNumberChange.bind(this);
    this.onEmailAddressChange = this.onEmailAddressChange.bind(this);
    this.onDepartureDateChange = this.onDepartureDateChange.bind(this);
    this.onDepartureTimeChange = this.onDepartureTimeChange.bind(this);
    this.onTimeZoneDepartureChange = this.onTimeZoneDepartureChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      pageType: 'landing',
      message: '',
      dateToExecute: '',

      firstName: '',
      lastName: '',
      confirmationNumber: '',
      emailAddress: '',
      departureDate: '',
      departureTime: '',
      timeZoneDeparture: '',
    };
  }

  onFirstNameChange(e) {this.setState({firstName: e.target.value });}
  onLastNameChange(e) {this.setState({lastName: e.target.value });}
  onConfirmationNumberChange(e) {this.setState({confirmationNumber: e.target.value });}
  onEmailAddressChange(e) {this.setState({emailAddress: e.target.value });}
  onDepartureDateChange(e) {this.setState({departureDate: e.target.value });}
  onDepartureTimeChange(e) {this.setState({departureTime: e.target.value });}
  onTimeZoneDepartureChange(e) {this.setState({timeZoneDeparture: e.target.value });}

  handleSubmit(e) {
    e.preventDefault();
    let firstName = this.state.firstName
    let lastName = this.state.lastName
    let confirmationNumber = this.state.confirmationNumber
    let emailAddress = this.state.emailAddress
    let departureDate = this.state.departureDate
    let departureTime = this.state.departureTime
    let timeZoneDeparture = this.state.timeZoneDeparture

    let dateTimeDeparture = departureDate + 'T' + departureTime

    let url = '/submitCheckIn/' + firstName + '/' + lastName + '/' + confirmationNumber + '/' + emailAddress + '/' + dateTimeDeparture + '/' + timeZoneDeparture

    axios.get(url)
      .then((response) => {
        this.setState({ 
          pageType: response.data.pageType, 
          message: response.data.message, 
          dateToExecute: response.data.dateToExecute, 
        })
      })
      .catch(error => {
        this.setState({ 
          pageType: 'error', 
          message: error.response.status,
        })
      });
  }

  render() {
    if (this.state.pageType === 'landing'){
      return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col md={{ size: 6}}>
                    <h1 className="mainLogo">Southwest Auto Check-In</h1>
                    <p>This app automatically checks you in 24 hours ahead of your flight’s departure. Just submit your info and check your email for status updates.</p>
                    <Card>
                      <CardHeader>Southwest.com boarding pollicy</CardHeader>
                      <CardBody>
                        <CardText>
                        <i>Available boarding positions will be distributed on a first-come, first-serve basis upon check in. The earlier you check in, beginning 24 hours before your departure, the lower your boarding group and position will be.</i>
                        </CardText>
                      </CardBody>
                    </Card>
                  <br/>

                  </Col>
                  <Col md={{ size: 6}}>
                      <Form onSubmit={ this.handleSubmit }>
                       <FormGroup>
                         <Label for="firstName">First Name</Label>
                         <Input  onChange={this.onFirstNameChange} value={this.state.firstName} type="text" name="firstName" id="firstName" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="lastName">Last Name</Label>
                         <Input  onChange={this.onLastNameChange} value={this.state.lastName} type="text" name="lastName" id="lastName" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="confirmationNumber">Confirmation Number</Label>
                         <Input  onChange={this.onConfirmationNumberChange} value={this.state.confirmationNumber} type="text" name="confirmationNumber" id="confirmationNumber" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="emailAddress">Email Address</Label>
                         <Input onChange={this.onEmailAddressChange} value={this.state.emailAddress} type="email" name="emailAddress" id="emailAddress" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="departureDate">Departure Date</Label>
                         <Input  onChange={this.onDepartureDateChange} value={this.state.departureDate} type="date" name="departureDate" id="departureDate" placeholder="date placeholder" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="departureTime">Departure Time</Label>
                         <Input  onChange={this.onDepartureTimeChange} value={this.state.departureTime} type="time" name="departureTime" id="departureTime" placeholder="time placeholder" required/>
                       </FormGroup>
                       <FormGroup>
                         <Label for="timeZoneDeparture">Departure Time Zone</Label>
                         <Input  onChange={this.onTimeZoneDepartureChange} value={this.state.timeZoneDeparture} type="select" name="timeZoneDeparture" id="timeZoneDeparture" required>
                           <option></option>
                           <option value="HI">Hawaii</option>
                           <option value="AL">Alaska</option>
                           <option value="PA">Pacific</option>
                           <option value="MT">Mountain</option>
                           <option value="CE">Central</option>
                           <option value="ES">Eastern</option>
                         </Input>
                       </FormGroup>
                       <Button color="primary">Submit</Button>
                     </Form>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </div>
        );
      } else if (this.state.pageType === 'error') {
        return (
          <div>
            <Jumbotron>
              <Container>
              <Row>
                <Col>
                  <h1 className="mainLogo">Southwest Auto Check-In</h1>
                  <Alert color="danger">
                   <p>The server has returned the following error: {this.state.message}</p>
                  {this.state.message !== 'This trip is already registered' &&
                   <p className="mb-0">
                    Please check-in manually
                   </p>}
                  </Alert>
                </Col>
              </Row>
              </Container>
            </Jumbotron>
          </div>
          );
      } else if (this.state.pageType === 'success') {
        return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col>
                    <h1 className="mainLogo">Southwest Auto Check-In</h1>
                    <Alert color="success">
                      <h4 className="alert-heading">Success!</h4>
                      <hr />
                      <p>
                        {this.state.firstName} {this.state.lastName} will automatically be checked-in on <b>{this.state.dateToExecute}</b>
                      </p>
                      <p className="mb-0">
                        Please check {this.state.emailAddress} for status updates
                      </p>
                    </Alert>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </div>
          );
      } else {
        return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col>
                    <h1 className="mainLogo">Southwest Auto Check-In</h1>
                    <h1>ERROR</h1>
                    <h1>ERROR</h1>
                    <h1>ERROR</h1>
                    <h1>ERROR</h1>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </div>
          );

      }

  }
}

export default App;