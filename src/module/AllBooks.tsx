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
import { Link } from "react-router";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { BookOpen, Pencil, Trash2 } from "lucide-react"; // icons import

interface IProps {
  book: IBooks;
}

export default function AllBooks({ book }: IProps) {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  // const handleDelete = async (id: string) => {
  //   const confirmDelete = toast.success(
  //     "Are you sure you want to delete this book?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await deleteBook(id).unwrap();
  //     toast.success("🗑️ Book deleted successfully!");
  //   } catch (error: unknown) {
  //     console.error("Delete error:", error);
  //     toast.error("❌ Failed to delete book.");
  //   }
  // };

const handleDelete = async (id: string) => {
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
      await deleteBook(id).unwrap();
      Swal.fire("Deleted!", "Book has been deleted.", "success");
    } catch (error: unknown) {
      console.error("Delete error:", error);
      Swal.fire("Error!", "Failed to delete book.", "error");
    }
  }
};


  const available = book.available ? "text-green-500" : "text-red-500";

  return (
    <div className="gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>Author: {book.author}</CardDescription>
          <CardDescription>Genre: {book.genre}</CardDescription>
        </CardHeader>

        <CardContent>
          <p>{book.description}</p>
        </CardContent>

        <div className="flex justify-between px-4">
          <CardFooter>
            <p>Copy: {book.copies}</p>
          </CardFooter>
          <CardFooter>
            <p className={available}>
              {book.available ? "Available" : "Not Available"}
            </p>
          </CardFooter>
        </div>

        <div className="grid grid-cols-2 gap-2 p-4">
          {/* View Details */}
          <Link to={`/books/${book._id}`}>
            <Button className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Details
            </Button>
          </Link>

          {/* Update */}
          <Link to={`/edit-book/${book._id}`}>
            <Button className="w-full" variant="secondary">
              <Pencil className="mr-2 h-4 w-4" />
              Update
            </Button>
          </Link>

          {/* Delete */}
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => handleDelete(book._id)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

          {/* Borrow */}
          <Link to={`/borrow/${book._id}`}>
            <Button
              className="w-full"
              variant="outline"
              disabled={!book.available}
            >
              📚 Borrow
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
