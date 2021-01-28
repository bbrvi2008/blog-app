import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import { ArticleItemFull } from '../../components/ArticleItem';
import Spinner from '../../components/Spinner';
import { fetchAtricle } from '../../reducers/articles';

const ArticlePage = ({ article, loading, error, fetchAtricle }) => {
  const { slug } = useParams();

  useEffect(() => {
    fetchAtricle(slug);
  }, [fetchAtricle, slug]);

  if(loading) {
    return (
      <Spinner />
    )
  }

  if(error) {
    return (
      <Alert message="Error loading data" type="error" showIcon />
    );
  }

  if(article === null) return null;

  return (
    <ArticleItemFull {...article} />
  )
};

ArticlePage.defaultProps = {
  article: {}, 
  loading: false, 
  error: false, 
  fetchAtricle: () => null
}

ArticlePage.propTypes = {
  article: PropTypes.object, 
  loading: PropTypes.bool, 
  error: PropTypes.bool, 
  fetchAtricle: PropTypes.func
}

const mapStateToProps = ({ articles }) => {
  const { item: article, loading, error } = articles;

  return {
    article, 
    loading, 
    error, 
  };
}

export default connect(mapStateToProps, { fetchAtricle })(ArticlePage);