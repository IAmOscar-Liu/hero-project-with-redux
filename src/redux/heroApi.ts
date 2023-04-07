import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Hero, Profile } from "../types";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hahow-recruit.herokuapp.com/",
  }),
  tagTypes: ["Hero"],
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getHeros: build.query<Hero[], void>({
      query: () => `heroes`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Hero" as const, id })),
              { type: "Hero", id: "LIST" },
            ]
          : [{ type: "Hero", id: "LIST" }],
    }),
    getHero: build.query<Profile, { id: number }>({
      query: ({ id }) => `heroes/${id}/profile`,
      providesTags: (result, error, { id }) => [{ type: "Hero", id }],
    }),
    updateHero: build.mutation<any, Profile & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `heroes/${id}/profile`,
        method: "PATCH",
        body: data,
        responseHandler: "text",
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          heroApi.util.updateQueryData("getHero", { id }, (draft) => {
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          // throw new Error(
          //   "The sum of powers should be the same as its original"
          // );
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Hero", id }],
    }),
  }),
});

export const { useGetHerosQuery, useGetHeroQuery, useUpdateHeroMutation } =
  heroApi;
