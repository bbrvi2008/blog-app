import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ArticleItemFull } from '../../components/ArticleItem';
import { ArticleItemButtons } from '../../components/ArticleItem';
import Spinner from '../../components/Spinner';
import { fetchAtricle, deleteAtricle } from '../../reducers/articles';

const ArticlePage = ({ article, deleted, editable, loading, error, fetchAtricle, deleteAtricle }) => {
  const { slug } = useParams();

  useEffect(() => {
    fetchAtricle(slug);
  }, [fetchAtricle, slug]);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteAtricle(slug);
      }
    })
  }

  const handleDelete = () => {
    showDeleteConfirm();
  }

  if(deleted) {
    return (
      <Redirect to="/" />
    );
  }

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

  let editButtons = editable
    ? <ArticleItemButtons slug={slug} onDelete={handleDelete} />
    : null;

  return (
    <ArticleItemFull {...article} >
      {editButtons}
    </ArticleItemFull>
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

const mapStateToProps = ({ articles, user }) => {
  const { item: article = {}, loading, error, completed } = articles;

  let editable = false;
  if(article?.author && user?.user) {
    const { author } = article;
    const { user: currentUser } = user;

    editable = author.username === currentUser.username;
  }
  
  return {
    article,
    editable,
    deleted: completed,
    loading,
    error, 
  };
}

export default connect(mapStateToProps, { fetchAtricle, deleteAtricle })(ArticlePage);