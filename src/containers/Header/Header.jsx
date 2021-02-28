import React from 'react';
import { connect, useSelector } from 'react-redux';

import Header from 'components/Header';

import { logOutUser } from 'reducers/user';
import { selectIsAuthenticated, selectUser } from 'selectors/user';

const HeaderContainer = (props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectUser);

  return (
    <Header {...props} isAuthenticated={isAuthenticated} user={currentUser} />
  )
}

const mapDispatchToProps = {
  logOutUser
};

export default connect(null, mapDispatchToProps)(HeaderContainer);