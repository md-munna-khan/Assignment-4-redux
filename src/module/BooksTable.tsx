import type { IBooks } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface IProps {
  book: IBooks;
}

export default function BooksTable({ book }: IProps) {
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

          <Link to="/books">
            <Button className="w-full">View Books</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
