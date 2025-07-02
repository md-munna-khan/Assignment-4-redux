import App from "@/App";
import AllBooks from "@/module/AllBooks";

import Book from "@/pages/Book";
import BorrowSummary from "@/pages/BorrowSummary";

import { createBrowserRouter } from "react-router";

 const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
               
              index:true,
               element:<Book/>
            },
            {
               
                path:'books' ,
               element: <AllBooks/>
            },
            {
               path:'borrow-summary' ,
               element:<BorrowSummary/>
            },
        ]
    }
])

export default router