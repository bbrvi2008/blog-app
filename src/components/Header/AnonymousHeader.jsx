import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './Header.module.scss';

const AnonymousHeader = () => (
  <div className={styles.headerMenu} >
    <Link to="/sign-in" className={styles.headerMenuItem} ><Button type="text" >Sign In</Button></Link>
    <Link to="/sign-up" className={styles.headerMenuItem} ><Button className={styles.buttonSignUp} >Sign Up</Button></Link>
  </div>
);

export default AnonymousHeader;