import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAtricles } from '../../reducers/articles';

import { Pagination, Alert } from 'antd';
import ArticleList from '../../components/ArticleList';
import Spinner from '../../components/Spinner';

import styles from './ArticlesPage.module.scss';

const ArticlesPage = ({ items, loading, error, currentPage, countItems, fetchAtricles }) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    fetchAtricles(page);
  }, [fetchAtricles, page]);

  const handleChangePage = selectedPage => {
    setPage(selectedPage);
  };

  if(error) {
    return (
      <Alert message="Error loading data" type="error" showIcon />
    );
  }

  const hasData = !loading && !error;
  const content = hasData
    ? <ArticleList articles={items} />
    : null;
  const spinner = loading
    ? <Spinner />
    : null;

  return (
    <>
      {content}
      {spinner}
      <Pagination className={styles.pagination} 
          size="small"
          hideOnSinglePage
          showSizeChanger={false}
          current={page}
          defaultPageSize={20}
          total={countItems}
          onChange={handleChangePage} />
    </>
  )
};

ArticlesPage.defaultProps = {
  items: [], 
  loading: false, 
  error: false, 
  currentPage: 1, 
  countItems: 0,
  fetchAtricles: () => null
}

ArticlesPage.propTypes = {
  items: PropTypes.array, 
  loading: PropTypes.bool, 
  error: PropTypes.bool, 
  currentPage: PropTypes.number, 
  countItems: PropTypes.number,
  fetchAtricles: PropTypes.func
}

const mapStateToProps = ({ articles }) => {
  const { items, loading, error, currentPage, countItems } = articles;

  return {
    items, 
    loading, 
    error, 
    currentPage, 
    countItems
  };
}

export default connect(mapStateToProps, { fetchAtricles })(ArticlesPage);