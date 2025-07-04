import App from "@/App";
import ErrorPage from "@/Eroor/ErrorPage";
import AddBookModal from "@/module/AddBookModal";

import BookDetails from "@/module/BookDetails";
import BorrowBook from "@/module/borroow/BorrowBook";
import UpdateBook from "@/module/UpdateBook";



import Book from "@/pages/Book";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router";

 const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<ErrorPage/>,
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
               path:'books/:id' ,
               element:<BookDetails/>
            },
            {
               path:'create-book' ,
               element:<AddBookModal/>
            },
            {
               path:'edit-book/:id' ,
               element:<UpdateBook/>
            },
            {
               path:'borrow/:bookId' ,
               element:<BorrowBook/>
            }
           
        ]
    }
])

export default router