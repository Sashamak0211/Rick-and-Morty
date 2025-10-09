import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  IApiCharacter,
  IApiCharacterResponse,
} from "@/shared/api/characterApi";

import { axiosBaseQuery } from "./axiosBaseQuery";

export const rickApi = createApi({
  reducerPath: "rickApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<IApiCharacterResponse, { page?: number; name?: string; status?: string; gender?: string, species?: string }>({
      query: (params) => ({ 
    url: `/character`,
    params: {
      page: params.page,
      name: params.name,
      status: params.status,
      gender: params.gender,
      species: params.species
    }
  }),
      providesTags: ["Character"],
    }),
    getCharacterById: builder.query<IApiCharacter, number>({
      query: (id) => ({ url: `/character/${id}` }),
      providesTags: ["Character"],
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterByIdQuery } = rickApi;
