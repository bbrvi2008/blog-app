import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Tags.module.scss';

const Tags = ({ values, className }) => {
  if(!values.length) return null;

  const tags = values.map(tag => {
    return (
      <li key={tag} className={styles.item} >{tag}</li>
    )
  });

  return (
    <ul className={cn(styles.list, className)} >{tags}</ul>
  )
}

Tags.defaultProps = {
  values: [],
  className: ''
};

Tags.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
};

export default Tags;