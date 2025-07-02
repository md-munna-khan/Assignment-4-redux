import App from "@/App";
import BookDetails from "@/module/BookDetails";



import Book from "@/pages/Book";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router";

 const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
               
              index:true,
               element:<Home/>
            },
            {
               
                path:'books' ,
               element: <Book/>
            },
            {
               path:'borrow-summary' ,
               element:<BorrowSummary/>
            },
            {
               path:'book-details/:id' ,
               element:<BookDetails/>
            }
        ]
    }
])

export default router