import { Text } from "../atoms/Text";
// TODO type props
export default function PlayerList({ players }) {
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
