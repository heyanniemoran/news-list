import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/react";
import { FeedItem } from "./constants/FeedItem";
import { Item } from "./constants/Item";

export const newsApi = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.hnpwa.com/v0/" }),
  endpoints: (builder) => ({
    getNewsList: builder.query<FeedItem[], void>({
      // query: (page) => `/newest/${page}.json`,
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        let news: FeedItem[] = [];
        let page: number = 1;
        while (news.length < 100) {
          let response = await fetchWithBQ(`/newest/${page}.json`);
          if (response.error)
            return { error: response.error as FetchBaseQueryError };
          page++;
          news = news.concat(response.data as FeedItem[]);
        }
        return { data: news.slice(0, 100) };
      },
    }),
    getNewsDetail: builder.query<Item, string | undefined>({
      query: (id) => `/item/${id}.json`,
    }),
  }),
});
export const { useGetNewsListQuery, useGetNewsDetailQuery } = newsApi;
