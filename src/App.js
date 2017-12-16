import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Container, Row, Col, Jumbotron, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardText,
InputGroupButton,
InputGroup,
ListGroup,
ListGroupItem,
ListGroupItemHeading,
ListGroupItemText,
CardTitle,
Badge,
CardSubtitle,
CardFooter,
 } from 'reactstrap';

 import Countdown from 'react-countdown-now';
 var moment = require('moment-timezone');

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
    this.onConfirmationNumberChange2 = this.onConfirmationNumberChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      pageType: 'landing',
      message: '',
      dateToExecute: '',

      firstName: '',
      lastName: '',
      confirmationNumber: '',
      confirmationNumber2: '',
      emailAddress: '',
      departureDate: '',
      departureTime: '',
      timeZoneDeparture: '',

      data: [],
    };

    // this.state = {
    //   pageType: 'landing',
    //   message: '',
    //   dateToExecute: '',

    //   firstName: 'qwe',
    //   lastName: 'qwe',
    //   confirmationNumber: 'q',
    //   confirmationNumber2: '',
    //   emailAddress: 'a@d.com',
    //   departureDate: "1982-12-12",
    //   departureTime: "12:12",
    //   timeZoneDeparture: '',

    //   data: [],
    // };
  }

  onFirstNameChange(e) {this.setState({firstName: e.target.value });}
  onLastNameChange(e) {this.setState({lastName: e.target.value });}
  onConfirmationNumberChange(e) {this.setState({confirmationNumber: e.target.value });}
  onEmailAddressChange(e) {this.setState({emailAddress: e.target.value });}
  onDepartureDateChange(e) {this.setState({departureDate: e.target.value });}
  onDepartureTimeChange(e) {this.setState({departureTime: e.target.value });}
  onTimeZoneDepartureChange(e) {this.setState({timeZoneDeparture: e.target.value });}
  onConfirmationNumberChange2(e) {this.setState({confirmationNumber2: e.target.value });}

  handleSearch(e) {
    e.preventDefault();
    let url = '/getExisting/' + this.state.confirmationNumber2

    axios.get(url)
      .then((response) => {
        this.setState({ 
          pageType: response.data.pageType, 
          message: response.data.message, 
          data: response.data.data, 
        })
      })
      .catch(error => {
        this.setState({ 
          pageType: 'error', 
          message: error.response.status,
          data: [],
        })
      });
  }

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

  showCards() {

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return <span>{hours}:{minutes}:{seconds}(PST) until check-in</span>;
      }
    };

    const Completionist = () => <Badge color="info" pill>Checking In Now</Badge>;

    var rows = [];
    var data = this.state.data;

    data.map(function(obj){

      var dateTimeZoneDeparture = moment(obj.dateTimeZoneDeparture).format('MMMM Do YYYY, h:mm:ss a z');
      var dateToExecute = moment(obj.dateToExecute).format();

      const showBadgeStatic = obj.checkedIn ?  <Badge color="success" pill>Checked-In ✓</Badge> : <Badge color="danger" pill>Checked-In Failed</Badge>
      const showBadge = <Countdown date={dateToExecute} zeroPadLength={3} renderer={renderer} />

       rows.push( 
          <ListGroupItem key={ obj._id }>
          <Card>
            <CardHeader>{obj.firstName} {obj.lastName}</CardHeader>
            <CardBody>
              <CardText>
              <small className="text-muted">Status - </small>{obj.checkedIn || obj.errorEmailSent ? showBadgeStatic : showBadge }
              </CardText>
              <CardText>
              <small className="text-muted">Email - </small>{obj.emailAddress}
              </CardText>
              <CardText>
              <small className="text-muted">Confirmation # - </small>{obj.confirmationNumber}
              </CardText>
              <CardText>
              <small className="text-muted">Departure - </small>{dateTimeZoneDeparture}
              </CardText>
              <CardText>
              <small className="text-muted">TimeZone - </small>{obj.timeZoneDeparture}
              </CardText>
            </CardBody>
          </Card>
          </ListGroupItem>
              // <small className="text-muted">Status - </small>{<Countdown date={dateToExecute} zeroPadLength={3} renderer={renderer} />}
         )
    })
    return rows
  }



  render() {
    let error =  <Alert color="danger"> Could not find trip ! </Alert>
    if (this.state.pageType === 'landing'){
      return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col md={{ size: 6}}>
                    <h1 className="mainLogo">Southwest Auto Check-In</h1>
                    <p>This app automatically checks you in 24 hours ahead of your flight’s departure. Just submit your info and check your email for status updates.</p>
                    <hr />
                    <p>Already submitted? Search for existing reservations with your Southwest confirmation number.</p>


                    <ListGroup>
                      <ListGroupItem>
                      <Form onSubmit={ this.handleSearch }>
                        <InputGroup>
                          <Input onChange={this.onConfirmationNumberChange2} value={this.state.confirmationNumber2} type="text" name="confirmationNumber2" id="confirmationNumber2" placeholder="Confirmation #" required/>
                          <InputGroupButton color="primary">Search Existing</InputGroupButton>
                        </InputGroup>
                      </Form>
                      </ListGroupItem>
                      {this.state.message === 'Could not find trip' ? error : this.showCards()}
                    </ListGroup>
                    <hr />

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
      } else if (this.state.pageType === 'tripsSuccess') {
        return (
          <div>
            <Jumbotron>
              <Container>
                <Row>
                  <Col>
                    <h1 className="mainLogo">Southwest Auto Check-In</h1>

                    <ListGroup>
                      <ListGroupItem>

                      <Card body outline color="success">
                        <CardBody >
                          <CardTitle>John seyfert</CardTitle>
                          <CardText>johnseyfert@gmail.com</CardText>
                          <CardText><small className="text-muted">Confirmation #:</small> ASDF34</CardText>
                          <CardText><small className="text-muted">Auto check-in in</small>  33min</CardText>
                        </CardBody>
                      </Card>

                      </ListGroupItem>
                    </ListGroup>


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



                    // <Card>
                    //   <CardHeader>Southwest.com boarding pollicy</CardHeader>
                    //   <CardBody>
                    //     <CardText>
                    //     <i>Available boarding positions will be distributed on a first-come, first-serve basis upon check in. The earlier you check in, beginning 24 hours before your departure, the lower your boarding group and position will be.</i>
                    //     </CardText>
                    //   </CardBody>
                    // </Card>