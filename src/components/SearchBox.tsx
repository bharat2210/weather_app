import React from 'react'
import { FaSearch } from "react-icons/fa";

type props={
    className?:string
value:string;
onChange:React.ChangeEventHandler<HTMLInputElement> | undefined
onSubmit:React.FormEventHandler<HTMLFormElement> | undefined

}
const SearchBox = (props:props) => {
  return (
    <form className='flex relative items-center justify-center h-10' onSubmit={props.onSubmit}>
    <input type="text" value={props.value} onChange={props.onChange} placeholder='Search' className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:border-blue-500 h-full focus:outline-none'/>
    <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full'><FaSearch /></button>
    
    </form>
  )
}

export default SearchBox