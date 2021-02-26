import { connect } from 'react-redux';

import Like from 'components/Like';

import { favoriteAtricle as favorite, unfavoriteAtricle as unfavorite } from 'reducers/articles';

const mapDispatchToProps = {
  favorite,
  unfavorite
};

const mapStateToProps = ({ user }) => {
  const { user: currentUser } = user;

  return {
    isAuthenticated: currentUser !== null
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Like);