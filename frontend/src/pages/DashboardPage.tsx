import { Show } from "@/atoms/Show";
import {
  useGetMyCampaignsQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { useUserStore } from "@/lib/zustand/userStore";
import CampaignList from "@/organisms/CampaignList";
import ScenarioList from "@/organisms/ScenarioList";

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
      <hr />
      <Show when={dataCampaigns?.getMyCampaigns}>
        {(campaigns) => (
          <section>
            <h2>Campagnes</h2>
            <CampaignList
              title="Mes prochaines parties à jouer"
              data={campaigns.filter(
                (campaign) =>
                  currentUser &&
                  campaign.players.some(
                    (player) => player.name === currentUser.name,
                  ),
              )}
            />
            <CampaignList
              title="Mes prochaines parties à mener"
              data={
                dataCampaigns?.getMyCampaigns.filter(
                  (campaign) =>
                    currentUser &&
                    campaign.storyteller.name === currentUser.name,
                ) ?? []
              }
            />
          </section>
        )}
      </Show>
      
      <Show when={dataScenarios?.getMyScenarios}>
        {(scenarios) => (
          <section>
            <h2>Scenariothèque</h2>
            <ScenarioList
              title="Les scénarios que j'ai déjà lus"
              data={scenarios}
            />
          </section>
        )}
      </Show>
    </>
  );
}
