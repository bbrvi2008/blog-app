import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { fetchAtricle, updateAtricle } from 'reducers/articles';

import ArticleForm from 'components/ArticleForm';
import Spinner from 'components/Spinner';

const EditArticleForm = ({ article, loading, error, updated, fetchAtricle, updateAtricle }) => {
  const { slug } = useParams();

  useEffect(() => {
    fetchAtricle(slug);
  }, [fetchAtricle, slug]);

  const handleSubmit = (articleData) => {
    updateAtricle({
      ...article,
      ...articleData
    });
  };

  if(updated) {
    console.log('updated', updated);

    return (
      <Redirect  to={`/articles/${slug}`} />
    )
  }

  if(article === null && loading) {
    return <Spinner />;
  }

  if(article === null) return null;

  return (
    <ArticleForm title="Create new article" article={article} loading={loading} onSubmit={handleSubmit}  />
  )
};

const mapDispatchToProps = {
  fetchAtricle,
  updateAtricle
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