import {
  type Scenario,
} from "../graphql/generated/graphql-types";

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
          <li key={scenario.id}>{scenario.title}</li>
        ))}
      </ul>
    </>
  );
}
