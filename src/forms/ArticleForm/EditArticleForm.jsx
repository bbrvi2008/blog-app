import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { message } from 'antd';
import ArticleForm from 'components/ArticleForm';
import NotFoundMessage from 'components/NotFoundMessage';
import Spinner from 'components/Spinner';

import { fetchArticle, updateArticle } from 'reducers/articles';
import { selectArticle, selectHasArticle, selectIsUpdatedArticle, selectLoading, selectHasError } from 'selectors/articles';


const EditArticleForm = ({ fetchArticle, updateArticle }) => {
  const article = useSelector(selectArticle);
  const hasArticle = useSelector(selectHasArticle);
  const hasError = useSelector(selectHasError);
  const isUpdated = useSelector(selectIsUpdatedArticle);
  const loading = useSelector(selectLoading);

  const { slug } = useParams();

  useEffect(() => {
    fetchArticle(slug);
  }, [fetchArticle, slug]);
  useEffect(() => {
    if(hasError) {
      message.error('No network connection');
    }
  }, [hasError]);

  const handleSubmit = (articleData) => {
    updateArticle({
      ...article,
      ...articleData
    });
  };

  if(isUpdated) {
    return (
      <Redirect  to={`/articles/${slug}`} />
    )
  }

  if(!hasArticle && loading) {
    return <Spinner />;
  }

  if(!hasArticle) {
    return (
      <NotFoundMessage />
    ) 
  }

  return (
    <ArticleForm title="Create new article" article={article} loading={loading} onSubmit={handleSubmit}  />
  )
};

const mapDispatchToProps = {
  fetchArticle,
  updateArticle
};

const mapStateToProps = ({ articles }) => {
  const { completed, loading, erorr, item } = articles;

  return {
    article: item,
    loading,
    updated: completed,
    erorr
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);