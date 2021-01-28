import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import cn from 'classnames';

import 'antd/dist/antd.css';
import '../../library.blocks/ant-pagination.css';
import classes from './BlogApp.module.scss';

import ArticlesPage from '../ArticlesPage';
import ArticlePage from '../ArticlePage';


const BlogApp = () => (
  <>
    <header className={cn(classes.header, classes.contentWrapper)} >
      Realworld Blog
    </header>
    <div className={classes.container} >
      <main className={cn(classes.content, classes.contentWrapper)}>
        <BrowserRouter>
          <Route path="/" exact component={ArticlesPage} />
          <Route path="/articles" exact component={ArticlesPage} />
          <Route path="/articles/:slug" component={ArticlePage} />
        </BrowserRouter>
      </main>
    </div>
  </>
)

export default BlogApp;