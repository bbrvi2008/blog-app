import RealWorldApiService from './RealWorldApiService';

export default class ArticlesApiService {
  constructor() {
    this.realworldApi = new RealWorldApiService();
  }

  fetchAll = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    const { data } = await this.realworldApi.getResource('/articles', {
      offset,
      limit
    });

    const { articles, articlesCount } = data;

    return {
      countItems: articlesCount,
      currentPage: page,
      items: articles
    };
  }

  fetchItem = async (slug) => {
    const { data } = await this.realworldApi.getResource(`/articles/${slug}`);
    const { article } = data;

    return {
      item: article
    };
  }
}