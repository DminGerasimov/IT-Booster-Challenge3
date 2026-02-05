"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchUsers, User} from "@/app/shared/api/api";
import { useRef, useState, Dispatch, SetStateAction } from "react";
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
  const [limit, setLimit] = useState<number>(3);
  const [hasMore, setHasMore] = useState<boolean>(true);
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
    // placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div
      ref={wrapperRef}
      className="p-1 overflow-y-auto h-screen"
    >
      <ul>
        {data.data.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div ref={triggerRef} />
      <button onClick={()=>{setPage(page + 1)}}>Add more page</button>
    </div>
  );
}
