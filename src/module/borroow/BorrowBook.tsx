import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useGetBookQuery, } from "@/redux/api/baseApi";
import { useBorrowBookMutation } from "@/redux/api/BorrowApi.";
import type { IBooks } from "@/types";
import Spinner from "@/components/ui/layout/Spinner";

type BorrowFormData = {
  quantity: number;
  dueDate: Date;
};

export default function BorrowBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: booksData } = useGetBookQuery(undefined);
  const book = booksData?.data?.find((b: IBooks) => b._id === id);

  const [borrowBook] = useBorrowBookMutation();

  const form = useForm<BorrowFormData>();

  const onSubmit = async (formData: BorrowFormData) => {
    if (formData.quantity > book?.copies) {
      toast.error(`❌ You can't borrow more than ${book?.copies} copies.`);
      return;
    }

    try {
     const borrowData = {
  book: id, // ✅ this must match the Zod schema!
  quantity: Number(formData.quantity), // just to be safe
  dueDate: formData.dueDate.toString(), // ensure it's a string
};


      await borrowBook(borrowData).unwrap();
      toast.success("✅ Book borrowed successfully!");

      // Optionally: Mark book unavailable if quantity = total copies
      if (formData.quantity >= book?.copies) {
        // trigger book update logic here if needed
      }

      navigate("/borrow-summary"); // ⬅️ redirect
    } catch (err: unknown) {
  let message = "❌ Failed to borrow book.";

  if (err instanceof Error) {
    message = `❌ ${err.message}`;
  }

  toast.error(message); // ✅ Now it's a string
}
  }

  if (!book) return <Spinner/>;

  return (
    <Card className="max-w-md mx-auto p-4 mt-10">
      <CardHeader>
        <CardTitle>📚 Borrow "{book.title}"</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Quantity */}
          <div>
            <label className="block font-medium">Quantity</label>
            <Input
              type="number"
              min={1}
              max={book.copies}
              {...form.register("quantity", { required: true })}
            />
            <p className="text-sm text-gray-500">Available: {book.copies}</p>
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-medium">Due Date</label>
            <Input
              type="date"
              {...form.register("dueDate", { required: true })}
            />
          </div>

          <Button type="submit" className="w-full">
            Confirm Borrow
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
