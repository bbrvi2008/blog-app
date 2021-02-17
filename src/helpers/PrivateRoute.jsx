import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: "/sign-in",
            state: { from: props.location }
          }} />
      )}
    />
  )
};

const mapStateToProps = ({ user }) => {
  const { user: currentUser } = user;

  return {
    isAuthenticated: currentUser !== null
  }
}

export default connect(mapStateToProps)(PrivateRoute);