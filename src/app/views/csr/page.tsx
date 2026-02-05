"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchAllUsers, mutateUserName, User} from "@/app/shared/api/api";


export default function CsrPage() {

  const mutation = useMutation({
    mutationFn: (data: User) => mutateUserName(data),
    onSuccess: () => {
      dataInvalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  })
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["csrusers"],
    queryFn: () => fetchAllUsers(),
  });


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  const dataInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['csrusers']});
  };
 
  return (
    <div className="p-1">
      <h1>User list</h1>
      <ul>
        {data.map((user: User) => (
            <li key={user.id}>
              <button onClick={() => {
                mutation.mutate({...user, name: "mutated"});
              }}>
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
