import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import Overview from './Overview';
import Setting from './Setting';
import Manage from './Manage';
import {
    ButtonGroup,
    Button
} from 'reactstrap';
import {Route, Redirect} from 'react-router';
import Navbar from "../Navbar";
import {withRouter} from "react-router-dom";


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
                <Setting cookies={this.props.cookies} id={this.props.match.params.id}/>
            );
        }
    };

    is_authenticated = () => {
        const user = this.props.cookies.cookies.cur_user;
        if (user.accountType === "SuperAdmin") {
            return true;
        } else {
            return false;
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
        if (this.is_authenticated()) {
            return (
                <div className='admin-page'>
                    <Navbar cookies={this.props.cookies}/>
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
        } else {
            return (
                <Redirect to="/error"></Redirect>
            );
        }
    }

}

export default withRouter(Admin);