
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/layout/Spinner";
import { useGetBorrowQuery } from "@/redux/api/BorrowApi.";
interface IBorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}


export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowQuery(undefined);

  if (isLoading) return <p className="text-center"><Spinner/></p>;
  if (isError || !data?.data) return <p className="text-center text-red-500">Failed to load summary.</p>;

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-xl">📋 Borrow Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">ISBN</th>
                <th className="border p-2">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item: IBorrowSummaryItem, index: number) => (
                <tr key={index}>
                  <td className="border p-2">{item.book.title}</td>
                  <td className="border p-2">{item.book.isbn}</td>
                  <td className="border p-2">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

