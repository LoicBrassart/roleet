import { useGetScenarioQuery } from "@/lib/graphql/generated/graphql-types";
import EditableMarkdown from "../../atoms/EditableMarkdown";

export default function SandboxPage() {
  const { data, error } = useGetScenarioQuery({
    variables: { id: "5aad4812-04c6-47d8-a775-fee604028b84" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {error && <p>Scenario not found</p>}
      {data && <EditableMarkdown source={data.getScenario.fullStory} />}
    </>
  );
}
