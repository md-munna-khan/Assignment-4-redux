import type { IBooks } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IProps {
  book: IBooks;
}

export default function BooksTable({ book }: IProps) {
  console.log(book);

  const available = book.available ? "text-green-5000" : "text-red-5000";
  return (
    <div className="  gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>Author:{book.author}</CardDescription>
          <CardAction>{book.genre}</CardAction>
        </CardHeader>
        <CardContent>
          <p>{book.description}</p>
        </CardContent>
        <CardFooter>
          <p>Copy {book.copies}</p>
        </CardFooter>
        <CardFooter>
          <p className={available}>
            {book.available ? "Available" : "Not Available"}
          </p>
        </CardFooter>

        <Button>View Book</Button>
      </Card>
    </div>
  );
}
