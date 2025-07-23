import type { User } from "@/lib/graphql/generated/graphql-types";
import { Text } from "../../atoms/Text";

type Props = {
  players: Pick<User, "id" | "name">[];
};
export default function PlayerList({ players }: Props) {
  return (
    <ul className="list-disc pl-5">
      {players.map((player) => (
        <li key={player.id}>
          <Text>{player.name}</Text>
        </li>
      ))}
    </ul>
  );
}
