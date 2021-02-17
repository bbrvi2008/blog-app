import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './ArticleItem.module.scss';

const ArticleItemButtons = ({ slug, onDelete }) => (
  <div className={styles.buttons} >
    <Button onClick={onDelete} danger className={styles.button} >Delete</Button>
    <Link to={`/articles/${slug}/edit`} className={styles.button} ><Button className={styles.buttonEdit} >Edit</Button></Link>
  </div>
);

export default ArticleItemButtons;