
import Spinner from '@/components/ui/layout/Spinner'
import AllBooks from '@/module/AllBooks'

import { useGetBookQuery } from '@/redux/api/baseApi'
import type { IBooks } from '@/types'
import { RingLoader } from 'react-spinners'


export default function Book() {
  const { data, isError, isLoading } = useGetBookQuery(undefined)
   console.log({ data, isLoading, isError })
   if(isLoading){
    return <Spinner/>
   }
  return (
    <div className='my-8'>
<h1 className='text-center text-2xl m-2'>All Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
  {!isLoading && data?.data?.map((book:IBooks)=>
    (<AllBooks book={book}  key={book._id}/>  ))}
 
    </div>
    </div>
  
  )
}
