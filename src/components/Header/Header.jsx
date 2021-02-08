import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AnonymousHeader from './AnonymousHeader';
import AuthorizedHeader from './AuthorizedHeader';

import styles from './Header.module.scss';

const Header = ({ isLogIn, user, className, logOutUser }) => {
  const handleLogOutUser = () => {
    logOutUser();
  }

  const menu = isLogIn
    ? <AuthorizedHeader user={user} onLogOut={handleLogOutUser} />
    : <AnonymousHeader />;

  return (
    <header className={cn(styles.header, className)} >
      <Link to="/" ><span className={styles.logo}>Realworld Blog</span></Link>
      {menu}
    </header>
  )
};

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

export default Header;