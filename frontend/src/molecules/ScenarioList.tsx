import type { Scenario } from "@/lib/graphql/generated/graphql-types";
import { Text } from "../atoms/Text";

type Props = {
  scenarios: Pick<Scenario, "id" | "title">[];
};
export default function ScenarioList({ scenarios }: Props) {
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
