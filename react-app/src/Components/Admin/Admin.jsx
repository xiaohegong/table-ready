import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import Overview from './Overview';
import Setting from './Setting';
import Manage from './Manage';
import {
  ButtonGroup,
  Button
} from 'reactstrap';

const log = console.log;

class Admin extends Component {
  state = {
    // default view
    page: 'overview'
  };

  chooseOverview = (e) => {
    this.setState({page: 'overview'});
    this.setActive(e);
  };

  chooseManage = (e) => {
    this.setState({page: 'manage'});
    this.setActive(e);
  };

  chooseSetting = (e) => {
    this.setState({page: 'setting'});
    this.setActive(e);
  };

  showContent = () => {
    log(this.state.page);
    if (this.state.page === 'overview') {
      return (
        <Overview/>
      );
    } else if (this.state.page === 'manage') {
      return (
        <Manage/>
      );
    } else if (this.state.page === 'setting') {
      return (
        <Setting/>
      );
    }
  };

  setActive = (e) => {
    for (let i = 0; i < 3; i++) {
      let btn = e.target.parentNode.childNodes[i];
      btn.classList.remove("active");
    }
    e.target.classList.add("active");
  };

  render() {
    return (
      <div className='admin-page'>
        <div className="row menu-bar">
          <div className="col-sm-8 menu d-flex justify-content-lg-center">
            <ButtonGroup size={"lg"}>
              <Button outline color="danger" active={true} size="lg" onClick={this.chooseOverview}>Overview
              </Button>
              <Button outline color="danger" size="lg" onClick={this.chooseManage}>Manage
              </Button>
              <Button outline color="danger" size="lg" onClick={this.chooseSetting}>Setting
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="admin-content">{this.showContent()}</div>
      </div>
    );
  }

}

export default Admin;