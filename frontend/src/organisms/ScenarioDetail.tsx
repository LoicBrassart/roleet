import type { Scenario } from "../lib/graphql/generated/graphql-types";

type Props = {
  data: Scenario;
};
export default function ScenarioDetail({ data }: Props) {
  return (
    <>
      <h2>{data.title}</h2>
      <p>More coming Soon(tm)</p>
    </>
  );
}
