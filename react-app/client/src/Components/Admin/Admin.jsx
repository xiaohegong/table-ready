import React, {Component} from "react";
import axios from 'axios';
import "../../Stylesheets/admin_page.scss";
import Setting from './Setting';
import Manage from './Manage';
import queryString from 'query-string';
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
        page: 'manage',
        users: []
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
        return this.props.isAuthenticated && this.props.current_user.accountType === "SuperAdmin";
    };

    setActive = (e) => {
        for (let i = 0; i < 2; i++) {
            let btn = e.target.parentNode.childNodes[i];
            btn.classList.remove("active");
        }
        e.target.classList.add("active");
    };

    componentDidMount() {
        axios.get('/api/users/')
            .then(res => {
                    if (res.data.length > 0) {
                        this.setState({
                            users: res.data,
                        });
                        const user = this.state.users.filter((u) => u._id === this.props.match.params.id);
                        this.setState({propUser: user[0]});
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state.propUser !== nextState.propUser || this.state.page !== nextState.page;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const users = this.state.users.filter((u) => u._id === this.props.match.params.id);
        this.setState({propUser: users[0]});
    }

    render() {
        if (!this.is_authenticated()) {
            console.log(
                'redirecting to signin since not authenticated in admin page'
            );
            return <Redirect to="/SignIn"/>;
        }
        const values = queryString.parse(this.props.location.search);
        if (this.props.current_user.accountType === 'SuperAdmin' &&
            this.props.current_user._id !== this.props.match.params.id &&
            values.redirect === "true"
        ) {
            return <Redirect to={`/admin/${this.props.match.params.id}`}/>;
        }

        return (
            <div className='admin-page'>
                <Navbar/>
                {this.props.current_user._id !== this.props.match.params.id ? (
                    <div className="alert alert-info" role="alert">
                        {"You are now viewing as Super Admin: " + this.state.propUser.username}
                    </div>
                ) : null}
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
    }


}

//
// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    current_user: state.auth.user
});

export default connect(mapStateToProps, {logout})(withRouter(Admin));
