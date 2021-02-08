import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderComponent from '../../components/Header';

import { logOutUser } from '../../reducers/user';

const Header = (props) => (
    <HeaderComponent {...props} />
);

Header.defaultProps = {
  isLogIn: false,
  user: {},
  className: '',
  logOutUser: () => null
};

Header.propTypes = {
  isLogIn: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string
  }),
  className: PropTypes.string,
  logOutUser: PropTypes.func
};

const mapStateToProps = ({ user }) => {
  const { user: userData } = user;

  return {
    user: userData,
    isLogIn: userData !== null
  };
};

const mapDispatchToProps = {
  logOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);