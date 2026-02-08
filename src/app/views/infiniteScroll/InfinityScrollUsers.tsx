"use client";

import { fetchInfiniteScrollUsers, User } from "@/app/shared/api/api";
import { useInfinitScroll } from "@/app/shared/lib/hooks/useInfinitScroll";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";

export default function ScrollUsers() {
 
//    const [page, setPage] = useState<number>(1);
//    const [firstPage, setFirstPage] = useState<number>(1);
//    const [lastPage, setLastPage] = useState<number>(2);
   const wrapperRef = useRef(null);
   const triggerRef  = useRef(null);
 
 
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
    queryKey: ['infiniteScrollUsers'],
    queryFn: (pageParam) => fetchInfiniteScrollUsers(pageParam.pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextId,
  })

     useInfinitScroll({
     callback: () => {
       fetchNextPage();
       console.log('callback');
     },
     wrapperRef,
     triggerRef,
     offCallback: !hasNextPage
   });

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="p-1 overflow-y-scroll h-screen" ref={wrapperRef}>
      {data.pages.map((page, i) => 
        <React.Fragment key={page.nextId}>
        {page.data.map((user: User) => (
          <p
            style={{
              height: '40vh',
              border: '1px solid gray',
              borderRadius: '5px',
              padding: '8px',
              fontSize: '14px',
              background: `hsla(${user.id * 30}, 60%, 80%, 1)`,
              textAlign: 'left',
              
            }}
            key={user.id}
          >
            {user.name}
          </p>
        ))}
      </React.Fragment>
    )}
      <div suppressHydrationWarning>
        <button
          // onClick={() => fetchNextPage()}
          suppressHydrationWarning
          disabled={!hasNextPage || isFetching}
          className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div ref={triggerRef} >{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}