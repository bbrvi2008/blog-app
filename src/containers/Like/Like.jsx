import React from 'react';
import { connect, useSelector } from 'react-redux';

import Like from 'components/Like';

import { favoriteArticle as favorite, unfavoriteArticle as unfavorite } from 'reducers/articles';
import { selectIsAuthenticated } from 'selectors/user';

const LikeContainer = (props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  return (
    <Like {...props} isAuthenticated={isAuthenticated} />
  )
}

const mapDispatchToProps = {
  favorite,
  unfavorite
};

export default connect(null, mapDispatchToProps)(LikeContainer);