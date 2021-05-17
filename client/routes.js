import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Meeting from './components/Meeting';
import Dashboard from './components/Dashboard';
import PatientDocProfile from './components/PatientDocProfile';
import PatientProfile from './components/PatientProfile';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/patients/:patientId" component={PatientProfile} />
            <Route path="/home" component={Home} />
            <Route path="/meeting" component={Meeting} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/doctor/:docId" component={PatientDocProfile} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/auth" component={AuthForm} />
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
