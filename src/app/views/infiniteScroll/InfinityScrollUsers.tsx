"use client";

import { fetchInfiniteScrollUsers, mutateUserName, User } from "@/app/shared/api/api";
import { useInfinitScroll } from "@/app/shared/lib/hooks/useInfinitScroll";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

export default function ScrollUsers() {
 
//    const [page, setPage] = useState<number>(1);
//    const [firstPage, setFirstPage] = useState<number>(1);
//    const [lastPage, setLastPage] = useState<number>(2);
  const wrapperRef = useRef(null);
  const triggerRef  = useRef(null);
  const queryClient = useQueryClient();

   const mutation = useMutation({
    mutationFn: (data: User) => mutateUserName(data),
    // When mutate is called:
    onMutate: async (user, context) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: ['infiniteScrollUsers'] })
  
      // Snapshot the previous value
      const previousValue = await context.client.getQueryData(['infiniteScrollUsers'])
       
      // Return a result with the previous value
      return { previousValue }
    },
    // If the mutation fails, use the result we returned above
    onError: (err, newTodo, onMutateResult, context) => {
      if (onMutateResult){
        context.client.setQueryData(
          ['infiniteScrollUsers'],
          onMutateResult.previousValue,
        )
      }
    },
    // Always refetch after error or success:
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['infiniteScrollUsers'] }),
  })

 
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
    retry: 10,
  })

     useInfinitScroll({
     callback: () => {
       fetchNextPage();
      //  console.log('callback');
     },
     wrapperRef,
     triggerRef,
     offCallback: !hasNextPage
   });

    const buttonStyles = "m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"


  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="p-1 overflow-y-scroll h-screen" ref={wrapperRef}>
      <div style={{
        position: "sticky",
        top: "0",
        background: "black"
      }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            queryClient.cancelQueries({queryKey: ['infiniteScrollUsers']});
          }}
          className={buttonStyles}
        >
          Abort
        </button>
      <button
          onClick={() => {queryClient.cancelQueries({queryKey: ['infiniteScrollUsers']})}}
          className={buttonStyles}
        >
          Cancel query
        </button>
        <button
          onClick={() => {queryClient.refetchQueries({queryKey: ['infiniteScrollUsers']})}}
          className={buttonStyles}
        >
          Refetch query
        </button>
        <button
          onClick={() => {queryClient.invalidateQueries({queryKey: ['infiniteScrollUsers']})}}
          className={buttonStyles}
        >
          Invalidate query
        </button>
        <button
          onClick={() => {queryClient.removeQueries({queryKey: ['infiniteScrollUsers']})}}
          className={buttonStyles}
        >
          Remove query
        </button>
      </div>
      {data.pages.map((page, i) => 
        <React.Fragment key={page.nextId}>
        {page.data.map((user: User) => (
          <p
            style={{
              color: 'black',
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
              <button onClick={() => {
                mutation.mutate({...user, name: "mutated"});
              }}>
                {user.id}. {user.name}
              </button>
          </p>
        ))}
      </React.Fragment>
    )}
      {/* <div suppressHydrationWarning>
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
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> */}
      <div ref={triggerRef} />
    </div>
  )
}
