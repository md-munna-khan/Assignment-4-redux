import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import type { IBooks } from "@/types";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "@/components/ui/layout/Spinner";

export default function UpdateBook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const form = useForm<Omit<IBooks, "_id">>();
  const { data: bookData, isLoading } = useGetBookQuery(undefined);
  const currentBook = bookData?.data?.find((book: IBooks) => book._id === id);
  const [updateBook, { data, isLoading: updating }] = useUpdateBookMutation();
  console.log(data);
  // 🔁 Watch copies field

  //  Prefill form with current book data
  React.useEffect(() => {
    if (currentBook) {
      form.reset({
        title: currentBook.title,
        author: currentBook.author,
        genre: currentBook.genre,
        isbn: currentBook.isbn,
        description: currentBook.description,
        copies: currentBook.copies,
        available: currentBook.available,
      });
    }
  }, [currentBook, form.reset]);

  // ✅ Submit handler
  const onSubmit: SubmitHandler<Omit<IBooks, "_id">> = async (formData) => {
    console.log(formData);
    try {
      await updateBook({ id: id as string, data: formData }).unwrap();
      toast.success("✅ Book updated successfully!");
      navigate("/books"); // redirect to home or book list
    } catch (error: unknown) {
      toast.error("❌ Failed to update book");
      console.log(error);
    }
  };

  const genres: IBooks["genre"][] = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  if (isLoading)
    return (
      <p>
        <Spinner />
      </p>
    );
  const copies = form.watch("copies");

  return (
    <Card className="max-w-xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          📚 Update Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded p-2"
                      required
                    >
                      <option value="">Select genre</option>
                      {genres.map((g) => (
                        <option key={g} value={g}>
                          {g.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ISBN number"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Short book description"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Copies */}
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Available */}
            <Controller
              name="available"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormLabel>Available</FormLabel>
                  <Checkbox
                    checked={field.value}
                    disabled={Number(copies) === 0}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    className="border border-gray-300"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-lg"
              disabled={updating}
            >
              Update Book
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
