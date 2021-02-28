import RealWorldApiService from './RealWorldApiService';

export default class ArticlesApiService {
  constructor() {
    this.realworldApi = new RealWorldApiService();
  }

  fetchAll = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    return await this.realworldApi.getResourceAuthOrAnon('/articles', {
      offset,
      limit
    });

    // const { articles, articlesCount } = data;

    // return {
    //   countItems: articlesCount,
    //   currentPage: page,
    //   items: articles
    // };
  }

  fetchItem = async (slug) => {
    return await this.realworldApi.getResourceAuthOrAnon(`/articles/${slug}`);
    // const { article } = data;

    // return {
    //   item: article
    // };
  }

  createItem = async (articleData) => {
    return await this.realworldApi.postResourceAuth('/articles/', articleData);
    // const { article } = data;

    // return {
    //   item: article,
    //   completed: true
    // };
  }

  updateItem = async (articleData) => {
    const { slug } = articleData;
    return await this.realworldApi.putResourceAuth(`/articles/${slug}`, articleData);
    // const { article } = data;

    // return {
    //   item: article,
    //   completed: true
    // };
  }

  deleteItem = async (slug) => {
    return await this.realworldApi.deleteResourceAuth(`/articles/${slug}`);

    // return {
    //   item: null,
    //   completed: true
    // };
  }

  favoriteItem = async (slug) => {
    return await this.realworldApi.postResourceAuth(`/articles/${slug}/favorite`);

    // return {
    //   item: article,
    //   completed: true
    // };
  }

  unfavoriteItem = async (slug) => {
    return await this.realworldApi.deleteResourceAuth(`/articles/${slug}/favorite`);

    // return {
    //   item: article,
    //   completed: true
    // };
  }
}