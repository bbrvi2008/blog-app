import { connect } from 'react-redux';

import Header from 'components/Header';

import { logOutUser } from 'reducers/user';

const mapStateToProps = ({ user }) => {
  const { user: currentUser } = user;

  return {
    user: currentUser,
    isAuthenticated: currentUser !== null
  };
};

const mapDispatchToProps = {
  logOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);