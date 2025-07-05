

import { useGetBookQuery, useDeleteBookMutation } from "@/redux/api/baseApi";
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
import { BookOpen, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/components/ui/layout/Spinner";
import Swal from "sweetalert2";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookQuery(undefined);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-center mt-10 text-red-500">Something went wrong.</p>;

  const book: IBooks | undefined = data?.data?.find(
    (book: IBooks) => book._id === id
  );

  if (!book)
    return <p className="text-center mt-10 text-red-500">Book not found</p>;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(book._id).unwrap();
        Swal.fire("Deleted!", "Book has been deleted.", "success");
        navigate("/"); // Go to Home after delete
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Failed to delete book.", "error");
      }
    }
  };

  const handleBorrow = () => {
    if (!book.available || book.copies <= 0) {
      Swal.fire("Unavailable", "❌ This book is not available for borrowing.", "warning");
      return;
    }
    navigate(`/borrow/${book._id}`);
  };

  const handleUpdate = () => {
    navigate(`/edit-book/${book._id}`);
  };

  return (
    <div className="flex justify-center text-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            A detailed look into this book's information.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 text-left">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Copies:</strong> {book.copies}</p>
          <p>
            <strong>Status:</strong>{" "}
            {book.available ? "✅ Available" : "❌ Unavailable"}
          </p>
          <p className="pt-2">{book.description}</p>
        </CardContent>

        <CardFooter className="flex justify-center flex-wrap gap-3 pt-6">
          {/* Borrow */}
          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleBorrow}
            disabled={!book.available || book.copies <= 0}
          >
            <BookOpen size={16} />
            Borrow
          </Button>

          {/* Update */}
          <Button
            variant="secondary"
            className="gap-2"
            onClick={handleUpdate}
          >
            <Pencil size={16} />
            Update
          </Button>

          {/* Delete */}
          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            Delete
          </Button>

          {/* Back */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
