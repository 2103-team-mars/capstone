import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import Home from './components/home';
import { me } from './store';
import Meeting from './components/Meeting';
import Dashboard from './components/Dashboard';
import PatientDocProfile from './components/PatientDocProfile';
import ImmediateHelp from './components/ImmediateHelp';
import AboutUs from './components/AboutUs';
import BMI from './components/BMI';
import PatientProfileDoctor from './components/PatientProfileDoctor';
import { PatientRoute, DoctorRoute } from './components/routeProtection/ProtectedRoutes';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  setLoading() {
    console.log('hello');
    this.setState({ loading: false });
  }

  render() {
    const { isLoggedIn, performedAuth } = this.props;

    return (
      <div>
        {!performedAuth ? (
          'Loading'
        ) : isLoggedIn ? (
          <Switch>
            <DoctorRoute exact path="/patients/:patientId" component={PatientProfileDoctor} />
            <Route path="/home" component={Home} />
            <Route path="/meeting" component={Meeting} />
            <Route path="/help" component={ImmediateHelp} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/dashboard" component={Dashboard} />
            <PatientRoute path="/doctor/:docId" component={PatientDocProfile} />
            <Route path="/BMICalculator" component={BMI} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/auth" component={AuthForm} />
            <Route path="/help" component={ImmediateHelp} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/immediateHelp" component={ImmediateHelp} />
            <Route path="/BMICalculator" component={BMI} />
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
    performedAuth: state.auth.performedAuth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(setLoading) {
      dispatch(me(setLoading));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
