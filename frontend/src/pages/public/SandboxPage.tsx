import { useGetScenarioQuery } from "@/lib/graphql/generated/graphql-types";
import EditableMarkdown from "../../atoms/EditableMarkdown";

export default function SandboxPage() {
  const { data, error } = useGetScenarioQuery({
    variables: { id: "7b6684bc-2696-4557-a028-6cb9880f3e68" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {error && <p>Scenario not found</p>}
      {data && <EditableMarkdown source={data.getScenario.fullStory} />}
    </>
  );
}
