import { useGetScenarioQuery } from "@/lib/graphql/generated/graphql-types";
import EditableMarkdown from "../../atoms/EditableMarkdown";

export default function SandboxPage() {
  const { data } = useGetScenarioQuery({
    variables: { id: "7fb089c5-0a5f-4312-8821-c4c36e241ced" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {data && <EditableMarkdown source={data.getScenario.fullStory} />}
    </>
  );
}
