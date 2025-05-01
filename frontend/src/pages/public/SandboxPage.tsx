import { useGetScenarioQuery } from "@/lib/graphql/generated/graphql-types";
import PlanForm from "@/organisms/Plan/PlanForm";

export default function SandboxPage() {
  const { data } = useGetScenarioQuery({
    variables: { id: "5d6c54b5-2ce7-4ba7-954a-d9931f7f53a1" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {data?.getScenario && (
        <PlanForm
          scenario={data?.getScenario}
          plan={data?.getScenario.plans[0]}
        />
      )}
    </>
  );
}
