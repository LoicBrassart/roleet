import { Button } from "@/atoms/Button";
import EditableMarkdown from "@/atoms/EditableMarkdown";
import FormWrapper from "@/atoms/FormWrapper";
import Markdown from "@/atoms/Markdown";
import { useToggleState } from "@/lib/hooks/useToggleState";
import FlashCard from "@/organisms/Flashcard/FlashCard";
import FlashCardForm from "@/organisms/Flashcard/FlashCardForm";

const scenario = {
  title: "A la chasse aux gobs",
  ownerIndex: 0,
  teaser:
    "Depuis environ deux semaines, plusieurs villageois ont aperçu sur la colline, à l'ouest, des gobelins.",
  fullStory: `## Contexte
Fial est un village tranquille niché au creux de la grande vallée du Saril, à l'est de la province d'Egonzasthan, et placé sous l'autorité du chevalier de Saint-Bris. Depuis environ deux semaines, plusieurs villageois ont aperçu sur la colline, à l'ouest, des gobelins. Toutefois, jusque-là, aucun raid de ces petites créatures maléfiques n'est à déplorer. Gérald de Flamberge, le régisseur de Saint-Bris, a été prévenu, mais le chevalier a d'autres chats à fouetter pour le moment, en particulier une bande d'orques qui sévit dans les montagnes au sud-est de Fial et qui représente un danger bien plus important. De Flamberge, pour sa part, n'a que deux soldats à ses ordres, et il préfère les garder au village avec lui plutôt que de les envoyer prendre des risques dans la forêt.

## Au md
Ce scénario délibérément simpliste s'adresse à des joueurs débutants. Comme première aventure, il devrait leur permettre de se familiariser avec les règles de base et de  écouvrir quelques spécificités du jeu comme les pièges, les passages secrets et les objets magiques. Faites une description physique des gobelins aux joueurs avant de  commencer.

## Accroches d'aventures
Un ou plusieurs des personnages sont natifs du village de Fial. Les autres pourraient leur avoir rendu visite. 

## Le village de Fial
Le village de Fial et plusieurs de ses habitants sont décrits en détails sur www.aidedd.org dans la rubrique Univers.

# Introduction
En début d'après-midi, Thron, le forgeron qui fait également office de chef du village, convoque les personnages.

> Mes enfants, vous êtes les jeunes les plus aguerris du village, et certains d'entre vous sont des amis de ma fille Lanéa. Un commis du vieil Erdrios, le meunier, vient de m'apprendre qu'il vient de voir sur la colline un petit groupe de gobelins portant une jeune femme qui ressemblait beaucoup à ma fille. Or justement Lanéa est partie tôt ce  matin dans cette direction, et elle n'est pas revenue à l'heure du repas. Je ne vous cache pas ma préoccupation, et si sa mère l'apprend, elle risque de mourir d'inquiétude. Alors en toute franchise, je voudrais vous demander un énorme service : pourriez-vous aller vérifier si c'est bien ma fille que ces monstres ont attrapée et, si vous le pensez possible, en profiter pour la délivrer des mains de ces créatures ? Si j'y vais moi, ma femme va se douter que quelque chose de grave est en train de se passer.

Le commis du meunier, qui a suivi de loin les gobelins, pourra indiquer au groupe où se situe l'entrée de leur antre, à environ trois heures de marche à l'ouest, dans les  collines, mais il se gardera bien, personnellement, de s'approcher trop près.

De plus, si les personnages posent quelques questions aux autres villageois avant de partir, ils apprennent également qu'un gobelours, un monstre bien plus grand et bien plus fort qu'un gobelin, a également été aperçu du même côté il y a quelques jours.

## En chemin
Si le groupe se met en route immédiatement, les personnages arrivent en vue de l'entrée de la grotte en fin d'après-midi, et ils ont 20% de chance de se faire attaquer à quelques encablures de l'antre par un groupe de deux gobelins en patrouille. 

Si pour une raison ou une autre ils ne parviennent sur place qu'à la nuit tombée, les chances d'attaque passent alors à 80% et la patrouille est composée de trois gobelins.

Chaque gobelin possède 18 pa.

> Après cette incartade, vous arrivez enfin en vue de la grotte. L'entrée est bloquée par une grosse porte en bois fermée à clef, avec des montants en fer et une grosse serrure. La porte est plutôt solide (Force DD 15 pour l'enfoncer) mais la serrure est particulièrement grossière (Dextérité DD 10 pour l'ouvrir, à condition d'avoir des outils de voleur).`,
  bannerUrl: "scenario-background.webp",
  credits: "Honteusement pompé sur www.aidedd.org",
};
const card = {
  title: "Elric",
  ownerIndex: 0,
  description:
    "Elric est un jeune apprenti magicien qui veut devenir alchimiste.",
  type: "DndNpcCard",
  scenarioIndex: 0,
  data: {
    species: "Humanoïde (Humain)",
    size: "M",
    alignment: "N",
    armorClass: 10,
    health: "7 (2d8-2)",
    speed: 10,
    strength: 10,
    dexterity: 10,
    constitution: 9,
    intelligence: 14,
    wisdom: 10,
    charisma: 13,
    skills: "Arcanes +4, Persuasion +3",
    senses: "Perception passive 10",
    languages: "Commun, Gobelin",
    dangerLevel: 1,
    behaviour: `Incantation: Elric est un lanceur de sorts de niveau 1. Sa caracteristique d'incantation est l'Intelligence (jet de sauvegarde contre ses sorts DD12, +4 au toucher pour les attaques avec un sort). Elric a préparé les sorts de magicien suivants:   Sorts mineurs (à volonté): Amis, Aspersion d'acide, Lumière   Niveau 1 (2 emplacements): Bouclier, Graisse, Repli expéditif`,
    actions:
      "Dague: Attaque au corps à corps ou à distance avec une arme: +2 au toucher, allonge 1.50m ou portée 6/18m, une cible. Touché: 2 (1d4) dégâts perforants",
  },
};

export default function SandboxPage() {
  const [locked, , toggleLocked] = useToggleState(true);

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      <h2>Handle edition mode 🤔</h2>
      <Button onClick={toggleLocked}>{locked ? "Unlock" : "Relock"}</Button>
      <br />
      <br />
      <br />
      <FormWrapper
        formComp={<EditableMarkdown source={scenario.fullStory} />}
        baseComp={<Markdown value={scenario.fullStory} />}
        locked={locked}
      />
      <FormWrapper
        formComp={<FlashCardForm card={card} />}
        baseComp={<FlashCard card={card} />}
        locked={locked}
      />
    </>
  );
}
