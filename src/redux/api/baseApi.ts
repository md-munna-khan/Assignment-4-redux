import type { IBooks } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    // post
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    // delete
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    // update 
   updateBook: builder.mutation({
  query: ({ id, data }: { id: string; data: Partial<IBooks> }) => ({
    url: `/books/${id}`,
    method: "PUT",
    body: data,
  }),
  invalidatesTags: ["books"],
}),
  }),







  
});

export const { useGetBookQuery, useCreateBookMutation, useDeleteBookMutation,useUpdateBookMutation } =
  bookApi;
