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
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type { IBooks } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Spinner from "@/components/ui/layout/Spinner";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddBookModal() {
  type BookData = Omit<IBooks, "_id">;

  const navigate = useNavigate()
  const form = useForm<BookData>();
  const [createBook, { data, isLoading }] = useCreateBookMutation();
  console.log(data)
  if (isLoading){
    return <Spinner/>
  }
  
const handleClick =()=>{
  navigate("/books")
}
  const onSubmit: SubmitHandler<BookData> = async (formData) => {
    const payload = {
      ...formData,
      copies: Number(formData.copies),
      available: formData.available === true ,
    };

    try {
      const res = await createBook(payload).unwrap();
      toast.success("📚 Book added successfully!");
      console.log("Book data:", res);
      form.reset();
    } catch (error:unknown) {
      console.error("Zod validation error:", error?.data?.error?.issues);
      toast.error("❌ Failed to add book. Please check all required fields.");
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
    const copies = form.watch("copies");

  return (
    <Card className="max-w-xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          📚 Add New Book
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
                    <Input
                      placeholder="Enter book title"
                      {...field}
                      value={field.value || ""}
                      required
                    />
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
                      value={field.value || ""}
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
                      value={field.value || ""}
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
                      value={field.value || ""}
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
                    <Input
                      type="number"
                      placeholder="Number of copies"
                      {...field}
                      value={field.value || ""}
                      required
                      min={1}
                    />
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
            {/* Submit Button */}
            <Button onClick= {()=>handleClick()}  type="submit" className="w-full text-lg">
              
              ➕ Add Book
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
