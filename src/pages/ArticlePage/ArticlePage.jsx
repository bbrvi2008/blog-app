import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Alert, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ArticleItemFull } from 'components/ArticleItem';
import { ArticleItemButtons } from 'components/ArticleItem';
import NotFoundMessage from 'components/NotFoundMessage';
import Spinner from 'components/Spinner';

import { fetchArticle, deleteArticle } from 'reducers/articles';
import { fetchArticle as fetchArticleAction } from 'reducers/articles';
import { selectArticle, selectHasArticle, selectLoadingByActionType, selectHasError, selectIsDeletedArticle, selectIsEditableArticle } from 'selectors/articles';

const ArticlePage = ({ fetchArticle, deleteArticle }) => {
  const article = useSelector(selectArticle);
  const loading = useSelector(selectLoadingByActionType(fetchArticleAction.typePrefix));
  const hasArticle = useSelector(selectHasArticle);
  const hasError = useSelector(selectHasError);
  const isDeleted = useSelector(selectIsDeletedArticle);
  const isEditable = useSelector(selectIsEditableArticle);

  const { slug } = useParams();

  useEffect(() => {
    fetchArticle(slug);
  }, [fetchArticle, slug]);
  useEffect(() => {
    if(hasArticle && hasError) {
      message.error('No network connection');
    }
  }, [hasArticle, hasError]);

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteArticle(slug);
      }
    });
  }

  if(isDeleted) {
    return (
      <Redirect to="/" />
    );
  }

  if(loading) {
    return (
      <Spinner />
    )
  }

  if(!hasArticle && hasError) {
    return (
      <Alert message="Error loading data" type="error" showIcon />
    );
  }

  if(!hasArticle) {
    return (
      <NotFoundMessage />
    )
  }

  let editButtons = isEditable
    ? <ArticleItemButtons slug={slug} onDelete={handleDelete} />
    : null;

  return (
    <ArticleItemFull {...article} >
      {editButtons}
    </ArticleItemFull>
  )
};

ArticlePage.defaultProps = {
  fetchArticle: () => null,
  deleteArticle: () => null
}

ArticlePage.propTypes = {
  fetchArticle: PropTypes.func,
  deleteArticle: PropTypes.func
}

export default connect(null, { fetchArticle, deleteArticle })(ArticlePage);