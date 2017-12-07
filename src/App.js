import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      pageType: 'input',
      message: '',

      firstName: 'sdf',
      lastName: 'sdf',
      confirmationNumber: 'sdf',
      emailAddress: 'asdf@sdf.com',
      departureDate: "2017-12-06",
      departureTime: "19:50",
      timeZoneDeparture: '',
    };
  }

  //

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

    // let url = 'http://localhost:3001/' + firstName + '/' + lastName + '/' + confirmationNumber + '/' + emailAddress + '/' + dateTimeDeparture + '/' + timeZoneDeparture
    // let url = 'http://localhost:3001/submitCheckIn/john/seyfert/MWVE2L/johnseyfert@gmail.com/2017-12-06 16:40/PA'
    let url = '/submitCheckIn/john/seyfert/MWVE2L/johnseyfert@gmail.com/2017-12-06 16:40/PA'
    console.log(url)

    axios.get(url)
      .then((response) => {
        console.log('in success1', response )
        console.log('in success2', response.data.message )
        this.setState({ 
          message: response.data.message, 
          pageType: 'submitted', 
        })
      })
      .catch(error => {
        console.log(error.response.status);
        this.setState({ 
          message: error.response.status,
          pageType: 'error', 
        })
      });
  }

  render() {
    if (this.state.pageType === 'input'){
      return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col>
                    <h1>Southwest-CheckIn</h1>
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
                    <h1>Southwest-CheckIn</h1>
                    <span><b>Error: </b>{this.state.message}</span>
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
                    <h1>Southwest-CheckIn</h1>
                   <h2>{this.state.message}</h2>
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