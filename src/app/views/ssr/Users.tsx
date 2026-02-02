"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchUsers from "@/app/shared/api/api";

export default function Users() {
   interface User {
    id: number
    name: string
    email: string
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ssrusers"],
    queryFn: () => fetchUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div className="p-1">
      <ul>
        {data.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
