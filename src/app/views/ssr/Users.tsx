"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchUsers, User} from "@/app/shared/api/api";
import { useRef, useState } from "react";
import { useInfinitScroll } from "@/app/shared/lib/hooks/useInfinitScroll";

interface UsersPage {
  first: number 
  prev: number
  next: number
  last: number
  pages: number
  items: number
  data: [User]
}


export default function Users() {
   interface User {
    id: number
    name: string
    email: string
  }

  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(2);
  const wrapperRef = useRef(null);
  const triggerRef  = useRef(null);

  useInfinitScroll({
    callback: () => {
      console.log('callback');
    },
    wrapperRef,
    triggerRef,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ssrusers", page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div
      ref={wrapperRef}
      className="p-1 overflow-y-scroll h-screen"
    >
      <ul>
        {data.data.map((user: User) => (
          <li
          key={user.id}
          className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >{user.id}. {user.name}
          </li>
        ))}
      </ul>
      <div ref={triggerRef} />
      <button
        onClick={()=>{
          setPage(page > 2 ? page - 1: firstPage);
          setFirstPage(data.first);
          setLastPage(data.last);
        }}
        disabled={page === firstPage}
        className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >Preview page</button>

      <button
        onClick={()=>{
          setLastPage(data.last);
          setFirstPage(data.first);
          setPage(page < lastPage ? page + 1 : lastPage);
        }}
        disabled={page === lastPage}        
        className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >Next page</button>
    </div>
  );
}
