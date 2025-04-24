import { useGetScenarioQuery } from "@/lib/graphql/generated/graphql-types";
import PointOfInterestForm from "@/organisms/PointOfInterest/PointOfInterestForm";
import PointOfInterestList from "@/organisms/PointOfInterest/PointOfInterestList";

export default function SandboxPage() {
  const { data } = useGetScenarioQuery({
    variables: { id: "6cde2d42-ceaa-4ca0-9942-30faa7e1cbe4" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {data?.getScenario && (
        <>
          <PointOfInterestForm
            plan={data?.getScenario.plans[0]}
            poi={data?.getScenario.plans[0].pointsOfInterest[0]}
          />
          <PointOfInterestList
            data={data?.getScenario.plans[0].pointsOfInterest}
          />
        </>
      )}
    </>
  );
}
