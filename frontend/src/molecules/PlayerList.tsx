import { Text } from "../atoms/Text";

type Player = {
  id: string;
  name: string;
};

export default function PlayerList<T extends Player>({
  players,
}: { players: T[] }) {
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
