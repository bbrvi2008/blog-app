import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Like.module.scss';

const Like = ({ slug, count, active, className, isAuthenticated, favorite, unfavorite }) => {
  const handleClick = () => {
    if(!isAuthenticated) {
      return;
    }

    if(active) {
      unfavorite(slug);
    } else {
      favorite(slug);
    }
  }
  
  const iconClasses = cn([
    styles.icon,
    {
      [styles.iconEmpty]: !active,
      [styles.iconFilled]: active
    }
  ]);

  return (
    <button className={cn(styles.container, className)} onClick={handleClick} >
      <div className={iconClasses} ></div>
      <span className={styles.text} >{count}</span>
    </button>
  );
};

Like.defaultProps = {
  slug: null,
  count: 0,
  active: false, 
  className: '',
  isAuthenticated: false,
  favorite: () => null,
  unfavorite: () => null
};

Like.propTypes = {
  slug: PropTypes.string,
  count: PropTypes.number,
  active: PropTypes.bool,
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  favorite: PropTypes.func,
  unfavorite: PropTypes.func
};

export default Like;