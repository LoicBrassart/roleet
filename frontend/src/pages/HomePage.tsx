import {
  type Scenario,
  useGetAllScenariosQuery,
} from "../graphql/generated/graphql-types";
import ScenarioList from "../organisms/ScenarioList";

export default function HomePage() {
  const { loading, error, data } = useGetAllScenariosQuery();

  if (error) return <p>Oops, something went awry...</p>;
  if (loading)
    return <p>Enhance your calm, we're still fetching this data...</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return (
    <>
      <ScenarioList
        title="Scenarios"
        data={data.getAllScenarios as Scenario[]}
      />
    </>
  );
}
