import { Link } from "react-router-dom";
import type { Scenario } from "../lib/graphql/generated/graphql-types";

type Props = {
  title: string;
  data: Scenario[];
};
export default function ScenarioList(props: Props) {
  return (
    <>
      <h2>{props.title}</h2>
      <ul>
        {props.data.map((scenario) => (
          <li key={scenario.id}>
            <Link to={`/scenario/${scenario.id}`}>{scenario.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
