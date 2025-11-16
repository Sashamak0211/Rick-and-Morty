import { createApi } from '@reduxjs/toolkit/query/react';

import { IGetAllCharactersParams } from '@/entities';
import { IApiCharacter, IApiCharacterResponse, mapperCallback } from '@/shared';

import { axiosBaseQuery } from './axiosBaseQuery';

export const rickApi = createApi({
  reducerPath: 'rickApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      {
        results: ReturnType<typeof mapperCallback>;
        info: IApiCharacterResponse['info'];
      },
      IGetAllCharactersParams
    >({
      query: (params) => ({
        url: `/character`,
        params,
      }),
      transformResponse: (response: IApiCharacterResponse) => ({
        results: mapperCallback(response.results),
        info: response.info,
      }),
    }),

    getCharacterById: builder.query<IApiCharacter, string | undefined>({
      query: (id) => ({ url: `/character/${id}` }),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterByIdQuery } = rickApi;
