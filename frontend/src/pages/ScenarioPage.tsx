import { useParams } from "react-router-dom";
import {
  type Scenario,
  useGetScenarioQuery,
} from "../graphql/generated/graphql-types";
import ScenarioDetail from "../organisms/ScenarioDetail";

export default function ScenarioPage() {
  const { id } = useParams();
  const { loading, error, data } = useGetScenarioQuery({
    variables: { id: Number(id) },
  });

  if (error) return <p>Oops, something went awry...</p>;
  if (loading)
    return <p>Enhance your calm, we're still fetching this data...</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return <ScenarioDetail data={data.getScenario[0] as Scenario} />;
}
