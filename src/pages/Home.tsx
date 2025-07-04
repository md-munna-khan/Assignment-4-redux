

import Spinner from '@/components/ui/layout/Spinner'
import BooksTable from '@/module/BooksTable'

import { useGetBookQuery } from '@/redux/api/baseApi'
import type { IBooks } from '@/types'

import { Link } from 'react-router'


export default function Home() {
   const { data, isError, isLoading } = useGetBookQuery(undefined)
     console.log({ data, isLoading, isError })
     if(isLoading){
      return <Spinner/>
     }
     const firstEightData = data?.data?.slice(0,8)
  return (
    <>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
   {!isLoading && firstEightData.map((book:IBooks)=>
     (<BooksTable book={book}  key={book._id}/>  ))}
    
    </div>
    <Link to="/books">
    <button className='flex mx-auto my-4 bg-amber-500 p-4 rounded-2xl'> See More Books</button>
    </Link>
    </>
  )
}
