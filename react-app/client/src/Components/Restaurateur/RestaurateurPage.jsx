import React, { Component } from 'react';
import '../../Stylesheets/restaurateur_page.scss';
import RestaurantListItem from './RestaurantListItem';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurateurSettingModal from './RestaurateurSettingModal';
import AvatarModal from './AvatarModal';

class RestaurateurPage extends Component {
  state = {
    restaurants: [],
    current_user: {},
    restaurateur_id: this.props.match.params.id
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    axios
      .post(
        '/api/restaurants/findRestaurantByOwner',
        {
          owner: this.props.match.params.id
        },
        header
      )
      .then(restaurants =>
        this.setState({ restaurants: restaurants.data }, () =>
          console.log('Customers fetched...', this.state.restaurants)
        )
      )
      .catch(err => {
        console.log(err);
      });

    axios
      .get('/api/users/auth/' + this.props.match.params.id, this.tokenConfig())
      .then(res => {
        console.log(res);
        this.setState({ current_user: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

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

  changeAvatar = () => {
    console.log('change avatar');
  };

  render() {
    if (this.props.isAuthenticated !== null) {
      if (!this.props.isAuthenticated) {
        console.log(
          'redirecting to signin since not authenticated in RestaurateurPage'
        );
        return <Redirect to="/SignIn" />;
      } else {
        if (
          this.props.current_user.accountType !== 'SuperAdmin' &&
          this.props.current_user._id !== this.props.match.params.id
        ) {
          return <Redirect to="/signin" />;
        }
      }

      return (
        <div>
          <Navbar />
          <div className="restaurateur-page">
            <div className="container">
              <div className="row">
                <div className="col-md-3 info">
                  <h2 className="">{this.state.current_user.username}</h2>
                  <div>
                    {/* <img
                    src={'/images/avatar_sample.png'}
                    alt=""
                    className="avatar"
                  /> */}
                    <AvatarModal image={this.props.current_user.image} />
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Telephone: </strong>
                      {this.state.current_user.tel}
                    </li>
                    <li className="list-group-item">
                      <strong>Email: </strong>
                      {this.state.current_user.email}
                    </li>
                    <li className="list-group-item">
                      <RestaurateurSettingModal user={this.state.current_user} />
                    </li>
                  </ul>
                </div>

                <div className="col-md-9">
                  <h2 style={{ display: 'inline' }}>Your Restaurants</h2>
                  <Link
                    to={{
                      pathname: '/addNewRestaurant',
                      state: {
                        id: this.props.match.params.id,
                        owner_id: this.props.current_user._id
                      }
                    }}
                  >
                    <button className="addNewButton btn btn-outline-success btn-sm">
                      Add New
                    </button>
                  </Link>
                  <div className="restaurants-display">
                    <div className="list-group">
                      {this.state.restaurants.length === 0 ? (
                        <React.Fragment>
                          <br />
                          <p>You don't have any restaurant yet.</p>
                          <p>Please click Add New Button to add a restaurant.</p>
                        </React.Fragment>
                      ) : null}
                      {this.state.restaurants.map(restaurant => (
                        <Link
                          key={restaurant._id}
                          to={{
                            pathname: '/restaurateur2',
                            state: {
                              restaurant_id: restaurant._id
                            }
                          }}
                        >
                          <RestaurantListItem
                            name={restaurant.name}
                            address={restaurant.location}
                            telephone={restaurant.phoneNumber}
                            image={restaurant.image}
                            _id={restaurant._id}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return <p>loading</p>
    }
    }


}
// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(RestaurateurPage));
