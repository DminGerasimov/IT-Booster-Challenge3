export const SERVER_URL = 'http://localhost:3001/';

export interface User {
  id: number
  name: string
  email: string
}


export async function fetchUsers() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/Users");
  const res = await fetch(`${SERVER_URL}users`);
  if (!res.ok) {
      throw new Error("Failed to fetch Users");
    }
    return res.json();
  }

  export async function mutateUserName(data: User) {
    // const res = await fetch("https://jsonplaceholder.typicode.com/Users");
    const res = await fetch(
      `${SERVER_URL}users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "ContentType": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
        throw new Error("Failed to mutate User");
      }
      return res.json();
    }
  