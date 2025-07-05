


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
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

interface IProps {
  book: IBooks;
}

export default function BooksTable({ book }: IProps) {
  const isAvailable = book.available && book.copies > 0;
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-lg transition duration-200">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
          <CardDescription className="text-sm">
            <span className="block">Author: {book.author}</span>
            <span className="block">Genre: {book.genre}</span>
            <span className="block">ISBN: {book.isbn}</span>
          </CardDescription>
        </CardHeader>

        {/* Description */}
        <CardContent>
          <p className="text-sm text-gray-700 line-clamp-3">
            {book.description}
          </p>
        </CardContent>

        {/* Copies & Availability */}
        <CardFooter className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600 font-medium">Copies: {book.copies}</p>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </CardFooter>

        {/* Buttons */}
        <div className="flex flex-col gap-2 px-4 pb-4 mt-4">
          {/* Book Details */}
          <Link to={`/books/${book._id}`}>
            <Button className="w-full" variant="default">
              📖 Book Details
            </Button>
          </Link>

          {/* Borrow Button */}
          <Button
            className="w-full"
            variant="outline"
            disabled={!isAvailable}
            onClick={() => {
              if (!isAvailable) {
                Swal.fire(
                  "Unavailable",
                  "❌ This book is not available for borrowing.",
                  "warning"
                );
                return;
              }
              navigate(`/borrow/${book._id}`);
            }}
          >
            📚 Borrow
          </Button>
        </div>
      </Card>
    </div>
  );
}
