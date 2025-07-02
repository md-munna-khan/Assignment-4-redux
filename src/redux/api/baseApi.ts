import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery:fetchBaseQuery ({ baseUrl:"http://localhost:5000/api"}),
    tagTypes:["books"],
    endpoints:(builder)=> ({
        getBook:builder.query({
            query:()=> "/books",
  providesTags:["books"]
        }),
      
    })
})

export  const {useGetBookQuery}=bookApi