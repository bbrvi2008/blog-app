import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createAtricle } from 'reducers/articles';

import ArticleForm from 'components/ArticleForm';

const NewArticleForm = ({ loading, error, created, createAtricle }) => {
  const handleSubmit = (article) => {
    createAtricle(article);
  };

  if(created) {
    return (
      <Redirect  to="/" />
    )
  }

  return (
    <ArticleForm title="Create new article" loading={loading} onSubmit={handleSubmit}  />
  )
};

const mapDispatchToProps = {
  createAtricle
};

const mapStateToProps = ({ articles }) => {
  const { completed, loading, erorr } = articles;

  return {
    loading,
    created: completed,
    erorr
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticleForm);