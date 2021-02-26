import React from 'react';
import { Form, Input, Button, Typography, Spin } from 'antd';

import cn from 'classnames';
import styles from './ArticleForm.module.scss';

const ArticleForm = ({ title, article, loading, onSubmit }) => {
  const handleFinish = (articleData) => {
    const { tagList } = articleData;

    onSubmit({
      article: {
        ...articleData,
        tagList: tagList.filter(tag => tag !== '')
      }
    });
  };

  const { tagList } = article;
  const articleData = {
    ...article,
    tagList: tagList.length ? tagList : ['']
  }

  return (
    <Form layout="vertical" className={styles.container} initialValues={articleData} onFinish={handleFinish} >
      <Spin spinning={loading} tip="Submitting..." >
        <Typography.Title level={4} className={styles.title} >{title}</Typography.Title>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Title cannot be empty' }
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Short description"
          rules={[
            { required: true, message: 'Short description cannot be empty' }
          ]}
        >
          <Input placeholder="Short description" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Text"
          rules={[
            { required: true, message: 'Text cannot be empty' }
          ]}
        >
          <Input.TextArea placeholder="Text" rows={6} />
        </Form.Item>
        <Form.Item
          label="Tags"
        >
          <Form.List name="tagList" >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  const isLast = index === fields.length - 1;
                  const isSingle = fields.length === 1;

                  return (
                    <div key={field.fieldKey} className={styles.tag} >
                      <Form.Item
                        {...field}
                        name={[field.name]}
                        fieldKey={[field.fieldKey]}
                        className={cn(styles.tagItem, styles.tagInput)}
                      >
                        <Input
                          placeholder="Tag"
                        />
                      </Form.Item>
                      <Button
                        type="danger"
                        ghost
                        onClick={() => isSingle ? null : remove(field.name)}
                        className={styles.tagItem}
                      >
                        Delete
                    </Button>
                      {
                        isLast &&
                        <Button
                          type="primary"
                          ghost
                          onClick={() => add()}
                          className={styles.tagItem}
                        >
                          Add tag
                      </Button>
                      }
                    </div>
                  )
                })}
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.buttonSubmit}
          >
            Send
        </Button>
        </Form.Item>
      </Spin>
    </Form>
  )
};

ArticleForm.defaultProps = {
  Title: '',
  article: {
    title: '',
    description: '',
    body: '',
    tagList: ['']
  },
  loading: false,
  onSubmit: () => null
}

export default ArticleForm;