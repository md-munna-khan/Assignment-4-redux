import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBooks } from "@/types";

interface IProps {
  book: IBooks;
}

export default function AllBooks({ book }: IProps) {
  const navigate = useNavigate();
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

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
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Failed to delete book.", "error");
      }
    }
  };

  return (
    <tr className="text-sm text-gray-800">
      <td className="px-4 py-3">{book.title}</td>
      <td className="px-4 py-3">{book.author}</td>
      <td className="px-4 py-3">{book.genre}</td>
      <td className="px-4 py-3">{book.isbn}</td>
      <td className="px-4 py-3">{book.copies}</td>
      <td
        className={`px-4 py-3 font-medium ${
          book.available ? "text-green-600" : "text-red-500"
        }`}
      >
        {book.available ? "Available" : "Unavailable"}
      </td>
      <td className="px-4 py-3 space-y-2">
        <div className="flex flex-wrap gap-1">
          {/* Details */}
          <Link to={`/books/${book._id}`}>
            <Button size="sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Details
            </Button>
          </Link>

          {/* Update */}
          <Link to={`/edit-book/${book._id}`}>
            <Button size="sm" variant="secondary">
              <Pencil className="w-4 h-4 mr-1" />
              Update
            </Button>
          </Link>

          {/* Delete */}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(book._id)}
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>

          {/* Borrow */}
          <Button
            size="sm"
            variant="outline"
            disabled={!book.available}
            onClick={() => {
              if (!book.available) {
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
      </td>
    </tr>
  );
}
