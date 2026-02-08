import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchInfiniteScrollUsers } from "@/app/shared/api/api";
import InfinityScrollUsers from "./InfinityScrollUsers";

export default async function infiniteScrollUsers() {
  const queryClient = new QueryClient();


  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infiniteScrollUsers"],
    queryFn: () => fetchInfiniteScrollUsers(1),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfinityScrollUsers />
    </HydrationBoundary>
  );
}
