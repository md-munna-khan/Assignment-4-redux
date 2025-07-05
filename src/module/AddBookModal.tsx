import {  useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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

  const navigate = useNavigate();

  // ✅ React Hook Form with validation mode
  const form = useForm<BookData>({
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const [createBook, { isLoading }] = useCreateBookMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit: SubmitHandler<BookData> = async (formData) => {
  if (formData.copies === 0) {
        formData.available = false;
      } else {
        formData.available = true;
      }
    const payload = {
      ...formData,
      copies: Number(formData.copies),
      available: formData.available === true,
    };

    try {
      const res = await createBook(payload).unwrap();
    

     
      toast.success("📚 Book added successfully!", res);
      form.reset();
      navigate("/books");
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong.");
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
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="">Select genre</option>
                      {genres.map((g) => (
                        <option key={g} value={g}>
                          {g.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ISBN number" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="Short book description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Copies */}
            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: "Copies is required",
                min: { value: 0, message: "Copies can nOt Be Negative" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Available */}
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      className="ml-1"
                      checked={copies > 0 ? true : field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium leading-none">
                    Available
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full text-lg"
            >
              {isLoading ? "⏳ Adding..." : "➕ Add Book"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
