// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const borrowApi = createApi({
//   reducerPath: "borrowApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://redux-assignemnt-4-backend.vercel.app/api" }),
//   tagTypes: ["borrow","books"],
//   endpoints: (builder) => ({
//     getBorrow: builder.query({
//       query: () => "/borrow",
//       providesTags: ["borrow"],
//     }),
//     borrowBook: builder.mutation({
//       query: (borrowData) => ({
//         url: "/borrow",
//         method: "POST",
//         body: borrowData,
//       }),
//       invalidatesTags: ["borrow", "books"],
//     }),
//   }),
// });

// // ✅ Export both query and mutation hooks
// // export const { useGetBorrowQuery, useBorrowBookMutation } = borrowApi;
