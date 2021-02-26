import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAtricles } from 'reducers/articles';

import { Pagination, Spin, Alert } from 'antd';
import ArticleList from 'components/ArticleList';
import Spinner from 'components/Spinner';

import styles from './ArticlesPage.module.scss';

const ArticlesPage = ({ items, loading, hasData, error, currentPage, countItems, fetchAtricles }) => {
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

  if(!hasData && loading) {
    return <Spinner />
  }

  return (
    <>
      <Spin spinning={loading} size="large" tip="Loading..." >
        <ArticleList articles={items} />
      </Spin>
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
  hasData: false,
  error: false, 
  currentPage: 1, 
  countItems: 0,
  fetchAtricles: () => null
}

ArticlesPage.propTypes = {
  items: PropTypes.array, 
  loading: PropTypes.bool,
  hasData: PropTypes.bool,
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
    hasData: items.length > 0,
    error, 
    currentPage, 
    countItems
  };
}

export default connect(mapStateToProps, { fetchAtricles })(ArticlesPage);