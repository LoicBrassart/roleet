import { Card } from "@/atoms/Card";
import FormWrapper from "@/atoms/FormWrapper";
import type { Entities } from "@/types/entities";
import PlanForm from "./PlanForm";

type Scenario = Entities.Scenario;
type Props = {
  title?: string;
  data: Scenario["plans"];
  scenario: Scenario;
  locked: boolean;
};
export default function PlanList({ title, data, locked, scenario }: Props) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className="flex flex-wrap">
        {data.map((plan) => {
          const planData = { ...plan, scenario, owner: scenario.owner };
          return (
            <li key={plan.id}>
              <FormWrapper
                baseComp={
                  <Card className="m-1 h-96 w-96" title="Editer un plan">
                    {plan.title}
                  </Card>
                }
                formComp={<PlanForm plan={planData} scenarioId={scenario.id} />}
                locked={locked}
              />
            </li>
          );
        })}
        {!locked && (
          <li>
            <FormWrapper
              baseComp={
                <Card className="m-1 h-96 w-96" title="Ajouter un plan">
                  Editer pour ajouter un nouveau Plan
                </Card>
              }
              formComp={<PlanForm scenarioId={scenario.id} />}
              locked={locked}
            />
          </li>
        )}
      </ul>
    </>
  );
}
