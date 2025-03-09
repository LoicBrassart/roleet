import { Text } from "../atoms/Text";

type Scenario = {
  id: string;
  title: string;
};

export default function ScenarioList<T extends Scenario>({
  scenarios,
}: {
  scenarios: T[];
}) {
  return (
    <ul className="list-disc pl-5">
      {scenarios.map((scenario) => (
        <li key={scenario.id}>
          <Text>{scenario.title}</Text>
        </li>
      ))}
    </ul>
  );
}
