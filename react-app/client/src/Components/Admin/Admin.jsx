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
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import Navbar from "../Navbar";
import {withRouter} from "react-router-dom";


const log = console.log;

class Admin extends Component {
    state = {
        // default view
        page: 'manage'
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
        if (this.state.page === 'manage') {
            return (
                <Manage/>
            );
        } else if (this.state.page === 'setting') {
            return (
                <Setting id={this.props.match.params.id}/>
            );
        }
    };

    is_authenticated = () => {
        log(this.props);
        return this.props.current_user.accountType === "SuperAdmin" && this.props.isAuthenticated;
    };

    setActive = (e) => {
        for (let i = 0; i < 2; i++) {
            let btn = e.target.parentNode.childNodes[i];
            btn.classList.remove("active");
        }
        e.target.classList.add("active");
    };

    render() {
        log(this.props);
        if (!this.props.isAuthenticated) {
            console.log(
                'redirecting to signin since not authenticated in admin page'
            );
            return <Redirect to="/SignIn"/>;
        }
        if (this.is_authenticated()) {
            return (
                <div className='admin-page'>
                    <Navbar/>
                    <div className="row menu-bar">
                        <div className="col-sm-8 menu d-flex justify-content-lg-center">
                            <ButtonGroup size={"lg"}>
                                <Button outline color="danger" active={true} size="lg" onClick={this.chooseManage}>Manage
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

//
// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    current_user: state.auth.user
});
//
export default connect(mapStateToProps, {logout})(withRouter(Admin));
// export default ( withRouter(Admin));