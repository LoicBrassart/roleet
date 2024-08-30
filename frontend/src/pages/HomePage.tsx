import { useLoaderData } from "react-router-dom";
import type { User } from "../graphql/generated/graphql-types";
import sdk from "../graphql/sdk";

export async function HomeLoader() {
  try {
    const { getAllUsers } = await sdk.GetAllUsers();
    return getAllUsers;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default function HomePage() {
  const users = useLoaderData() as User[];

  return (
    <>
      <h2>Tous les utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
