"use client";
import { useQuery } from "@tanstack/react-query";


async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch userss");
  }
  return res.json();
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

interface User {
  id: number
  username: string
}


  return (
    <div>
      <h1>User list</h1>
      <ul>
        {data.map((user: User) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
