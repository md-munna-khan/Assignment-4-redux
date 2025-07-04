
import { useGetBookQuery } from "@/redux/api/baseApi";
import type { IBooks } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Trash2, Pencil, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/components/ui/layout/Spinner";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookQuery(undefined);

  if (isLoading) return <Spinner/>
  if (isError) return <p className="text-center mt-10 text-red-500">Something went wrong.</p>;

  const book: IBooks | undefined = data?.data?.find((book:IBooks) => book._id === id);
  if (!book) return <p className="text-center mt-10 text-red-500">Book not found</p>;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            A detailed look into this book's information.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Copies:</strong> {book.copies}</p>
          <p>
            <strong>Status:</strong>{" "}
            {book.available ? "✅ Available" : "❌ Not Available"}
          </p>
          <p className="pt-2">{book.description}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 pt-6">
          <Button variant="destructive" className="gap-2">
            <Trash2 size={16} />
            Delete
          </Button>

          <Button variant="secondary" className="gap-2">
            <Pencil size={16} />
            Update
          </Button>

          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <BookOpen size={16} />
            Borrow
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
