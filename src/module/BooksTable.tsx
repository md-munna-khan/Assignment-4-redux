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
  const isAvailable = book.available && book.copies > 0;

  return (
    <div className="w-full">
      <Card className="flex flex-col justify-between h-full shadow-md transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Author: {book.author}
          </CardDescription>
          <CardDescription className="text-sm text-muted-foreground">
            Genre: {book.genre}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700">{book.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Copies: {book.copies}</p>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </CardFooter>

        <div className="px-4 pb-4 mt-4">
          <Link to={`/books/${book._id}`}>
            <Button className="w-full">📖 View Book</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
