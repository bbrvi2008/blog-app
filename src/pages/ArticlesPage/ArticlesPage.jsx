import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { Pagination, Spin, Alert, message } from 'antd';
import ArticleList from 'components/ArticleList';
import Spinner from 'components/Spinner';

import styles from './ArticlesPage.module.scss';

import { fetchArticles } from 'reducers/articles';
import { fetchArticles as fetchArticlesAction } from 'reducers/articles';
import { selectArticles, selectLoadingByActionType, selectHasArticles, selectHasError, selectCurrentPage, selectCountItems } from 'selectors/articles';

const ArticlesPage = ({ fetchArticles }) => {
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoadingByActionType(fetchArticlesAction.typePrefix));
  const hasData = useSelector(selectHasArticles);
  const hasError = useSelector(selectHasError);
  const currentPage = useSelector(selectCurrentPage);
  const countItems = useSelector(selectCountItems);

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    fetchArticles(page);
  }, [fetchArticles, page]);
  useEffect(() => {
    if(hasData && hasError) {
      message.error('No network connection');
    }
  }, [hasData, hasError]);

  const handleChangePage = selectedPage => {
    setPage(selectedPage);
  };

  if(!hasData && hasError) {
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
        <ArticleList articles={articles} />
      </Spin>
      <Pagination className={styles.pagination} 
          size="small"
          hideOnSinglePage
          showSizeChanger={false}
          current={currentPage}
          defaultPageSize={20}
          total={countItems}
          onChange={handleChangePage} />
    </>
  )
};

ArticlesPage.defaultProps = {
  fetchArticles: () => null
}

ArticlesPage.propTypes = {
  fetchArticles: PropTypes.func
}

export default connect(null, { fetchArticles })(ArticlesPage);