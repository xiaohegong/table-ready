import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../Stylesheets/restaurateur_page_2.scss';
import { Redirect } from 'react-router-dom';
import Employees from './Employees';
import Table from './Table';
import Menu from './Menu';
import Navbar from '../Navbar';
import DressCode from './DressCode';
import uid from 'uid';
import axios from 'axios';
import EditRestaurant from './EditRestaurant';
import { connect } from 'react-redux';
import RestaurantImageModal from './RestaurantImageModal';

class RestaurateurPage2 extends Component {
  state = {
    info: undefined,
    access: false,
    curState: <Employees res_id={this.props.match.params.id} />,
    functions: [
      {
        id: 1,
        title: 'Employees',
        model: <Employees res_id={this.props.match.params.id} />
      },
      {
        id: 2,
        title: 'Dress Code',
        model: <DressCode id={this.props.match.params.id} />
      },
      {
        id: 3,
        title: 'Menu',
        model: <Menu res_id={this.props.match.params.id} />
      },
      {
        id: 4,
        title: 'Table',
        model: <Table res_id={this.props.match.params.id} />
      }
    ]
  };

  tokenConfig = () => {
    const token = this.props.auth.token;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  componentDidMount() {
    axios
      .post('/api/restaurants/findRestaurantById', {
        _id: this.props.match.params.id
      })
      .then(response => {
        this.setState({access:true, info: response.data }, () => {

          console.log('Customers fetched...', this.state.info);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showComponent = component => {
    this.setState({
      curState: component
    });
  };

  render() {
    console.log('Restaurant render');

    if (this.props.isAuthenticated !== null && this.state.info) {
      if (!this.props.isAuthenticated) {
        console.log(
          'redirecting to signin since not authenticated in RestaurateurPage'
        );
        return <Redirect to="/SignIn"/>;
      }
      if (
        this.props.current_user.accountType !== 'SuperAdmin' &&
        this.props.current_user._id !== this.state.info.owner
      ) {
        console.log(this.state.info.owner)
        return <Redirect to="/SignIn"/>;
      }


      return (
        <div>
          <Navbar/>
          <div className="restaurateur-page-2">
            <div className="container">
              <div className="row">
                <div className="col-md-4 restaurant-info">
                  <button
                    className="addNewButton btn btn-outline-success btn-sm"
                    onClick={this.showComponent.bind(
                      this,
                      <EditRestaurant
                        info={this.state.info}
                        link={this.props.match.params.id}
                      />
                    )}
                  >
                    Edit
                  </button>
                  <h2>Restaurant Info</h2>
                  <RestaurantImageModal image={this.state.info.image}/>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Name: </strong> {this.state.info.name}
                    </li>
                    <li className="list-group-item">
                      <strong>Operation Hours: </strong>{' '}
                      {this.state.info.operationHour}
                    </li>
                    <li className="list-group-item">
                      <strong>Address: </strong> {this.state.info.location}
                    </li>
                    <li className="list-group-item">
                      <strong>Telephone: </strong> {this.state.info.phoneNumber}
                    </li>
                    <li className="list-group-item">
                      <strong>Rating: </strong> {this.state.info.Rating}
                    </li>
                    <li className="list-group-item">
                      <strong>Cuisine: </strong> {this.state.info.Cuisine}
                    </li>
                  </ul>
                  <h2>Options</h2>
                  <div className="list-group options">
                    {this.state.functions.map(fun => (
                      <button
                        key={uid()}
                        type="button"
                        className="list-group-item list-group-item-action"
                        onClick={this.showComponent.bind(this, fun.model)}
                      >
                        {fun.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-8 content-display">
                  {this.state.curState}
                </div>
              </div>
            </div>
          </div>
          <br/><br/>
        </div>
      );
    }
    return <p>loading</p>
  }
}

// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(RestaurateurPage2));
