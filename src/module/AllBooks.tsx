

import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IBooks } from "@/types";


interface IProps {
  book: IBooks;
}



export default function AllBooks({ book }: IProps) {
  console.log(book);

  const available = book.available ? "text-green-500" : "text-red-500";
  return (
    <>
   
    <div className=" gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>Author:{book.author}</CardDescription>
          <CardDescription>Author:{book.genre}</CardDescription>
          
        </CardHeader>
        
        <CardContent>
         
          <p>{book.description}</p>
        </CardContent>
       <div className="flex justify-between">
         <CardFooter>
          <p>Copy : {book.copies}</p>
        </CardFooter>
     
        <CardFooter>
          <p className={available}>
            {book.available ? "Available" : "Not Available"}
          </p>
        </CardFooter>
       </div>

        <Button>View Book</Button>
      </Card>
      
    </div>
    
</>
  );
}


