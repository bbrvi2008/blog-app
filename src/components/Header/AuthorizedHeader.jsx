import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import Author from '../Author';

import styles from './Header.module.scss';

const AuthorizedHeader = ({ user, onLogOut }) => {
  const { username, image } = user;

  return (
    <div className={styles.headerMenu} >
      <Link to="/" className={styles.headerMenuItem} ><Button className={styles.buttonCreateArticle} >Create article</Button></Link>
      <Link to="/profile" className={styles.headerMenuItem} ><Author username={username} image={image} /></Link>
      <Button onClick={onLogOut} className={styles.headerMenuItem} >Log Out</Button>
    </div>
  );
};

AuthorizedHeader.defaultProps = {
  user: null
};

AuthorizedHeader.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string
  })
};

export default AuthorizedHeader;