

import Spinner from '@/components/ui/layout/Spinner';
import { useGetBookQuery } from '@/redux/api/baseApi';
import type { IBooks } from '@/types';

import AllBooks from '@/module/AllBooks';

export default function Book() {
  const { data,  isLoading } = useGetBookQuery(undefined);

  if (isLoading) return <Spinner />;

  return (
    <div className="my-8 px-4">
      <h1 className="text-center text-2xl mb-6 font-semibold">All Books</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Copies</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((book: IBooks) => (
              <AllBooks book={book} key={book._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

