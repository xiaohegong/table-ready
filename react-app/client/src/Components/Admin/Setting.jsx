import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

axios.defaults.baseURL = '../';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.confirmChange = this.confirmChange.bind(this);
  }

  confirmChange = () => {
    const new_email = document.getElementById("nf-email").value;
    const new_password = document.getElementById("nf-password").value;
    if (new_email === '' || new_password === '') {
      alert("Please fill all boxes!");
    } else {
      const cur_info = this.props.id;
      const link = '/user/' + cur_info;
      console.log(cur_info);
      console.log("above is curr user id");
      console.log(link);
      let old_user_info;
      axios.get(link)
        .then(res => {
          old_user_info = res.data;
          old_user_info.password = new_password;
          old_user_info.email = new_email;
          axios.put(link, old_user_info)
            .then(res => {
              console.log('User info updated!');
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("update completed!")
    }

  };

  resetInputBox = () => {
    document.getElementById('nf-password').value = '';
    document.getElementById('nf-email').value = '';
  };

  render() {
    return (
      <div className='setting'>
        <div className='setting-container'>
          <div className='row'>
            <Card>
              <CardHeader>
                <strong>Payment Info</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter your name" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Account Number</Label>
                      <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000"
                             required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" id="cvv" placeholder="123" required/>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <strong>Update your Information</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="nf-email">New Email</Label>
                    <Input type="email" id="nf-email" name="nf-email" placeholder="Enter Email.."
                           autoComplete="email"/>
                    <FormText className="help-block">Please enter your new email</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-password">New Password</Label>
                    <Input type="password" id="nf-password" name="nf-password"
                           placeholder="Enter Password.." autoComplete="current-password"/>
                    <FormText className="help-block">Please enter your new password</FormText>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.confirmChange}><i
                  className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.resetInputBox}><i
                  className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;