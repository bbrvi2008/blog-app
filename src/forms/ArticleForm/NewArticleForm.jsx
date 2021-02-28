import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { message } from 'antd';
import ArticleForm from 'components/ArticleForm';

import { createArticle } from 'reducers/articles';
import { selectLoading, selectIsCreatedArticle, selectHasError } from 'selectors/articles';


const NewArticleForm = ({ createArticle }) => {
  const loading = useSelector(selectLoading);
  const isCreated = useSelector(selectIsCreatedArticle);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    if(hasError) {
      message.error('No network connection');
    }
  }, [hasError]);

  const handleSubmit = (article) => {
    createArticle(article);
  };

  if(isCreated) {
    return (
      <Redirect  to="/" />
    )
  }

  return (
    <ArticleForm title="Create new article" loading={loading} onSubmit={handleSubmit}  />
  )
};

const mapDispatchToProps = {
  createArticle
};

export default connect(null, mapDispatchToProps)(NewArticleForm);