import {
  type Campaign,
  type Scenario,
  useGetMyCampaignsQuery,
  useGetMyScenariosQuery,
} from "../lib/graphql/generated/graphql-types";
import { useUserStore } from "../lib/zustand/userStore";
import CampaignList from "../organisms/CampaignList";
import ScenarioList from "../organisms/ScenarioList";

export default function DashboardPage() {
  const currentUser = useUserStore((state) => state.user);
  const {
    loading: loadCampaigns,
    error: errCampaigns,
    data: dataCampaigns,
  } = useGetMyCampaignsQuery();
  const {
    loading: loadScenarios,
    error: errScenarios,
    data: dataScenarios,
  } = useGetMyScenariosQuery();

  if (errCampaigns || errScenarios) return <p>Oops, something went awry...</p>;
  if (loadCampaigns || loadScenarios)
    return <p>Enhance your calm, we're still fetching this data...</p>;

  return (
    <>
      <h1>Roleet!</h1>
      <section>
        <h2>Campagnes</h2>
        <CampaignList
          title="Mes prochaines parties à jouer"
          data={
            dataCampaigns?.getMyCampaigns.filter(
              (campaign) =>
                currentUser &&
                campaign.players.some(
                  (player) => player.name === currentUser.name,
                ),
            ) as Campaign[]
          }
        />
        <CampaignList
          title="Mes prochaines parties à mener"
          data={
            dataCampaigns?.getMyCampaigns.filter(
              (campaign) =>
                currentUser && campaign.storyteller.name === currentUser.name,
            ) as Campaign[]
          }
        />
      </section>
      <section>
        <h2>Scenariothèque</h2>
        <ScenarioList
          title="Les scénarios que j'ai déjà lus"
          data={dataScenarios?.getMyScenarios as Scenario[]}
        />
      </section>
    </>
  );
}
