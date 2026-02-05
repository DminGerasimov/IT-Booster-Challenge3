import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from "@tanstack/react-query";
import Users from "./Users";
import {fetchUsers} from "@/app/shared/api/api";

export default async function SsrUsers() {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["ssrusers", 1],
    queryFn: () => fetchUsers(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
}
