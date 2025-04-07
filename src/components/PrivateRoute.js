import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

// Modified to always allow access without authentication
const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  // ...rest props are spread from Route
};

export default PrivateRoute;
