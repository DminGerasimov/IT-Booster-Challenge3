export default async function fetchUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/Users");
    if (!res.ok) {
      throw new Error("Failed to fetch Users");
    }
    return res.json();
  }
