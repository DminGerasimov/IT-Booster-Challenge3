import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchInfiniteScrollUsers } from "@/app/shared/api/api";
import ScrollUsers from "./InfinityScrollUsers";

export default async function infiniteScrollUsers() {
  const queryClient = new QueryClient();


  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infiniteScrollUsers"],
    queryFn: () => fetchInfiniteScrollUsers(),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScrollUsers />
    </HydrationBoundary>
  );
}
