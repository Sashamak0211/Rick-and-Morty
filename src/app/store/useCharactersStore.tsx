import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  IApiCharacter,
  IApiCharacterResponse,
} from '@/shared/api/characterApi';
import type { IGetAllCharactersParams } from '@/shared/types/character';

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
        params: {
          page: params.page,
          name: params.name,
          status: params.status,
          gender: params.gender,
          species: params.species,
        },
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
