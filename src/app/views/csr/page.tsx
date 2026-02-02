"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchUsers, mutateUserName} from "@/app/shared/api/api";

interface User {
  id: number
  name: string
  email: string
}

export default function CsrPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["csrusers"],
    queryFn: fetchUsers,
  });
  const queryClient = useQueryClient();


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  const dataInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['csrusers']});
  };

  const mutatedata = useMutation({
    mutationFn: ({id: number, data:{name: string}}) => mutateUserName(id, data),
    onSuccess: () => {
      dataInvalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  })
  
  return (
    <div className="p-1">
      <h1>User list</h1>
      <ul>
        {data.map((user: User) => (
            <li key={user.id}>
              <button onClick={mutatedata}>
                {user.name}
              </button>
            </li>
        ))}
      </ul>
      <button 
        onClick={dataInvalidate}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >Invalidate data</button>
    </div>
  );
}
