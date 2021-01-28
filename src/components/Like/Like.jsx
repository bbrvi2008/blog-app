import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Like.module.scss';

const Like = ({ count, className }) => (
  <button className={cn(styles.container, className)} >
    <div className={styles.icon} ></div>
    <span className={styles.text} >{count}</span>
  </button>
);

Like.defaultProps = {
  count: 0,
  className: ''
};

Like.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string
};

export default Like;