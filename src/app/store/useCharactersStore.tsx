import { createApi } from '@reduxjs/toolkit/query/react';

import type { IGetAllCharactersParams } from '@/entities';
import type { IApiCharacter, IApiCharacterResponse } from '@/shared';

import { axiosBaseQuery } from './axiosBaseQuery';

export const rickApi = createApi({
  reducerPath: 'rickApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      IApiCharacterResponse,
      IGetAllCharactersParams
    >({
      query: (params) => ({
        url: `/character`,
        params,
      }),
      providesTags: ['Character'],
    }),
    getCharacterById: builder.query<IApiCharacter, string | undefined>({
      query: (id) => ({ url: `/character/${id}` }),
      providesTags: ['Character'],
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterByIdQuery } = rickApi;
