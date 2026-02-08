"use client";

import { fetchInfiniteScrollUsers, User } from "@/app/shared/api/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";

export default function InfinityScrollUsers() {
 
//    const [page, setPage] = useState<number>(1);
//    const [firstPage, setFirstPage] = useState<number>(1);
//    const [lastPage, setLastPage] = useState<number>(2);
//    const wrapperRef = useRef(null);
//    const triggerRef  = useRef(null);
 
//    useInfinitScroll({
//      callback: () => {
//        console.log('callback');
//      },
//      wrapperRef,
//      triggerRef,
//    });
 
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
  
  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, i) => 
        <React.Fragment key={page.nextId}>
        {page.data.map((user: User) => (
          <p
            style={{
              border: '1px solid gray',
              borderRadius: '5px',
              padding: '8px',
              fontSize: '14px',
              background: `hsla(${user.id * 30}, 60%, 80%, 1)`,
            }}
            key={user.id}
          >
            {user.name}
          </p>
        ))}
      </React.Fragment>
    )}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}