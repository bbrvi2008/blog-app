import React from 'react';
import PropTypes from 'prop-types';

import styles from './Author.module.scss';

const Author = ({ username, image }) => (
  <div className={styles.container} >
    <span className={styles.title} >{username}</span>
    <img src={image} alt="avatar" className={styles.avatar} />
  </div>
);

Author.defaultProps = {
  username: '', 
  image: ''
}

Author.propTypes = {
  username: PropTypes.string, 
  image: PropTypes.string
}

export default Author;