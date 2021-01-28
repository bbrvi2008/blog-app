import BaseApiService from './BaseApiService';

export default class RealWorldApiService extends BaseApiService {
  baseUrl = 'https://conduit.productionready.io/api';

  fetchAll = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    const { articles, articlesCount } = await this.getResource('/articles', {
      offset,
      limit
    });

    return {
      countItems: articlesCount,
      currentPage: page,
      items: articles
    };
  }

  fetchItem = async (slug) => {
    const { article } = await this.getResource(`/articles/${slug}`);

    return {
      item: article
    };
  }
}