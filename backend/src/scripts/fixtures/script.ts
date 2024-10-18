import { cpSync } from "node:fs";
import { dataSource } from "../../config/db";
import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { Scenario } from "../../entities/Scenario";

const fixturesFolder = "./src/scripts/fixtures/img/";
const scenariosData = [
  {
    title: "A la chasse aux gobs",
    teaser:
      "Depuis environ deux semaines, plusieurs villageois ont aperçu sur la colline, à l'ouest, des gobelins.",
    fullStory: `En début d'après-midi, Thron, le forgeron qui fait également
      office de chef du village, convoque les personnages.
      Mes enfants, vous êtes les jeunes les plus aguerris du
      village, et certains d'entre vous sont des amis de ma fille
      Lanéa.
      Un commis du vieil Erdrios, le meunier, vient de
      m'apprendre qu'il vient de voir sur la colline un petit
      groupe de gobelins portant une jeune femme qui
      ressemblait beaucoup à ma fille. Or justement Lanéa est
      partie tôt ce matin dans cette direction, et elle n'est pas
      revenue à l'heure du repas. Je ne vous cache pas ma
      préoccupation, et si sa mère l'apprend, elle risque de
      mourir d'inquiétude.
      Alors en toute franchise, je voudrais vous demander un
      énorme service : pourriez-vous aller vérifier si c'est bien
      ma fille que ces monstres ont attrapée et, si vous le
      pensez possible, en profiter pour la délivrer des mains de
      ces créatures ? Si j'y vais moi, ma femme va se douter
      que quelque chose de grave est en train de se passer.
      Le commis du meunier, qui a suivi de loin les gobelins, pourra
      indiquer au groupe où se situe l'entrée de leur antre, à environ
      trois heures de marche à l'ouest, dans les collines, mais il se
      gardera bien, personnellement, de s'approcher trop près.
      De plus, si les personnages posent quelques questions aux
      autres villageois avant de partir, ils apprennent également qu'un
      gobelours, un monstre bien plus grand et bien plus fort qu'un
      gobelin, a également été aperçu du même côté il y a quelques
      jours.`,
    bannerUrl:
      "https://www.reddit.com/media?url=https%3A%2F%2Fexternal-preview.redd.it%2FyA0NUZl9HITCySQzbV0mXCp-LtoIQPC4kLu46kCGTdY.jpg%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D155f5e4272095bbed722e15f251af831a717b4b2",
    credits: "Honteusement pompé sur www.aidedd.org",
  },
];
const plansData = [
  {
    title: "L'antre des gobelins",
    description: undefined,
    pictureUrl: "map-antre-gobelins.png",
  },
];
const poisData = [
  {
    title: "L'entrée",
    code: "1",
    description: `Deux gobelins sont censés y monter la garde, mais pour le
    moment… ils somnolent. Ils n'entendront pas si on crochète la
    serrure et seront surpris (donc n'agiront pas durant le premier
    round), de même pour une entrée violente et en force dans la
    pièce.
    Ils portent une armure de cuir et un cimeterre mais ont peu de
    chance d'avoir le temps de prendre leur bouclier (baisser leur CA
    de 2 dans ce cas). L'un possède 12 po, l'autre 16 pc.
    À partir de là, si tout se passe trop facilement pour les joueurs,
    vous pouvez ajouter quelques rencontres dans les couloirs avec
    un groupe de deux ou trois gobelins.`,
  },
  {
    title: "Le piège",
    code: "X",
    description: `Au premier carrefour, le couloir qui file tout droit est piégé (emplacement marqué X). C'est une fosse simple, un trou creusé dans le sol et recouvert d'une large toile fixée sur les bords de la fosse, le tout camouflé avec de la terre et des débris. Un jet de Sagesse (Perception) DD 10 réussi permet de remarquer la
    fosse à temps. Dans le cas contraire, le premier personnage qui
    marche dessus tombe dans le trou profond de 3 mètres et subit
    1d6 points de dégâts contondants.`,
  },
  {
    title: "La salle d'armes",
    code: "2",
    description: `Il n'y a pas de lumière dans cette salle qui est peu utilisée.
    Cette grotte semble servir de râtelier. On y trouve
    adossées le long de la paroi un certain nombre d'armes
    qui ne sont pas d'une facture exceptionnelle : 1 fronde et
    20 pierres, 4 javelines, 2 marteaux de guerre, 1 épée
    longue, 1 arbalète lourde et 10 carreaux, 3 morgensterns,
    ainsi qu'une cuirasse de taille humaine, une cotte de
    mailles de la taille d'un nain et 8 boucliers en bois.
    À droite, en contre bas, on observe une porte en bois
    entrouverte.`,
  },
  {
    title: "L'entrepôt",
    code: "3",
    description: `La porte de cette salle est fermée à clef, mais là encore la
    serrure est des plus sommaires. Réussir un jet de Dextérité DD
    10 si le personnage possède des outils de voleur est suffisant
    pour la crocheter.
    L'intérieur de cette salle comporte des rouleaux de tissus,
    des poteries, une selle de cheval, des outils de paysans,
    mais rien de grande valeur.
    Sur chacun des quatre piliers en bois est accrochée une
    torche, mais aucune n'est allumée.
    Cette salle sert en fait à entasser le résultat des différents vols
    effectués par la tribu.`,
  },
  {
    title: "La salle de torture",
    code: "4",
    description: `Ici aussi, des torches sont accrochées aux murs, mais aucune n'est allumée. 
    Il y a ici un grand nombre d'instruments de torture et notamment un chevalet sur lequel a pris place un
    personnage que certains d'entre vous connaissent, le
    halfelin Gandelme le Dextre, qui était venu rendre visite à
    Fial à son frère Petit-Pinpin la semaine dernière !
    D'après les marques qu'ils portent, le petit homme a
    visiblement été torturé.
    Gandelme est épuisé, affamé et déshydraté. On ne lui a rien
    donné à boire ni à manger depuis sa capture. Il est si faible (0 pv
    et épuisement niveau 4) qu'il ne peut pas marcher et encore
    moins combattre. Un sort de soins lui redonnera des points de vie et lui permettra de marcher, mais ne réduira pas ses niveaux
    d'épuisement.
    Il insistera pour que l'on retrouve son équipement. Celui-ci se
    trouve dans la chambre du chef, salle 17, mais il ne le sait pas,
    bien entendu.`,
  },
  {
    title: "La réserve de nourriture",
    code: "5",
    description: `La double porte donne sur vaste pièce sans lumière qui
    est en grande partie vide. Dans la partie sud on trouve
    toutefois un monceau de nourriture : viandes, fruits
    séchés, alcools, légumes.
    De quoi nourrir de nombreux gobelins durant des jours.`,
  },
  {
    title: "La cuisine",
    code: "6",
    description: `Deux torches aux murs illuminent cette pièce qui ne
    contient pas grand-chose non plus. Juste un fourneau
    avec un feu allumé dont la fumée s'échappe par un trou
    au plafond, des plats et des casseroles sales, et un peu de
    nourriture qui ne fait pas du tout envie.`,
  },
  {
    title: "Une chambre de gobelins",
    code: "7",
    description: `À l'intérieur de cette pièce se trouvent deux gobelins en train de jouer aux dés sur une table ronde en bois. Il y a aussi six paillasses de petite taille et un coffre fermé à
    clef.
    Les gobelins seront normalement surpris. Comme leurs
    congénères de l'entrée, il y a peu de chance qu'ils aient le temps
    de prendre leur bouclier (baisser leur CA de 2 dans ce cas). Un
    des gobelins porte sur lui la clef du coffre qui contient 252 pc.`,
  },
  {
    title: "La chambre des hobgobelins",
    code: "8",
    description: `Dans cette pièce se trouvent deux paillasses de taille
    humaine et une grosse bourse.
    C'est bien entendu là que dorment les deux hobgobelins, mais
    pour le moment ils sont en train de manger dans la salle
    commune. La bourse contient 11 po et 1 pp.`,
  },
  {
    title: "La salle commune",
    code: "9",
    description: `Si les personnages prennent le temps d'écouter avant de rentrer dans la pièce, ils entendront clairement deux créatures parler entre elles en gobelins.
    La salle contient deux grandes tables et plusieurs bancs.
    Actuellement deux créatures de la taille d'un humain
    mais avec des traits semblables à ceux des gobelins sont
    en train de manger.
    Occupés à manger et pensant que tout bruit normal vient
    surement des gobelins de l'antre, les deux hobgobelins ne sont
    normalement pas sur leur garde.
    Les hobgobelins ont leur épée longue sur eux et feront leur
    possible pour récupérer rapidement leur bouclier qui sont posés
    sur la table. Fiers guerriers, ils essayeront de se débarrasser des
    intrus tous seuls, mais si l'un d'eux vient à mourir, le survivant
    n'hésitera pas à crier pour alerter les gobelins de la salle 7 et de
    la salle 10.`,
  },
  {
    title: "Une chambre de gobelins",
    code: "10",
    description: `Il y a dans cette pièce six paillasses et deux gobelins y sont allongés, en train de dormir.
    Ces gobelins ont le sommeil profond et un simple combat dans
    la salle 9 ne devrait pas les réveiller. Mais en cas de cris d'un
    hobgobelin, ils accourront voir ce qu'il se passe.`,
  },
  {
    title: "La chambre du gobelours",
    code: "11",
    description: `Lorsqu'ils ouvrent la porte de cette pièce, les personnages aperçoivent une créature qui correspond à la description qu'on leur a peut-être fait à Fial d'un gobelours. Le monstre est de profil et en train de cacher un petit sac sous sa paillasse. Il ne possède comme arme qu'une Morgenstern, n'a pas de bouclier (baisser sa CA de 2). Le petit sac qu'il tentait de cacher contient 40 po.
    Le gobelours n'appréciera certainement pas qu'on entre chez lui
    comme cela sans demander la permission, et encore moins alors
    qu'il était en train de ranger le butin de sa dernière sortie. Il
    attaquera donc, sans hésiter.`,
  },
  {
    title: "La salle du trésor",
    code: "12",
    description: `Protégée par un passage secret (Investigation DD 15), on peut y trouver six petites statuettes en ivoire (valeur de 60 po au total), deux potions de soins (qui font regagner 2d4+2 pv) et un grand coffre non fermé à clef qui contient 2000 pc, 1000 pa et 70 po. Il n'y a aucune lumière ici.`,
  },
  {
    title: "La salle du trône",
    code: "13",
    description: `Au fond de cette vaste salle, la plus grande du complexe jusque-là, se trouve un trône en bois sur lequel est assis
    celui qui doit assurément être le chef de cette petite tribu
    de gobelins. Trois autres gobelins sont présents. Deux
    grands tapis recouvrent des pans de mur.
    Les trois gobelins attaqueront dès que le groupe entrera. Par
    contre le chef, à traiter comme un gobelin normal, est un poltron
    qui fera tout pour ne pas combattre. Dès qu'il verra que le
    combat tourne mal, il essayera de s'enfuir par le passage secret
    derrière son trône, qui s'active en faisant tourner ce dernier
    (Investigation DD 15 par défaut, ou DD 5 si un personnage a vu
    le chef l'activer). Chaque gobelin porte 24 pa sur lui.`,
  },
  {
    title: "Le laboratoire",
    code: "14",
    description: `Cette pièce est fermée à clef (Dextérité DD 15 pour la crocheter, à condition d'avoir des outils de voleur, ou Force DD 15 pour l'enfoncer). Dans cette pièce se trouvent nombre d'étagères contenant plein de pots et de fioles sans étiquette, et tout un tas de matériel qui semble être celui d'un alchimiste. Ce sont les ingrédients de l'apprenti alchimiste de la salle 15, mais même un magicien n'y reconnaîtra rien !`,
  },
  {
    title: "La chambre de l'alchimiste",
    code: "15",
    description: `Cette pièce possède un bureau de belle facture, une
    chaise, un tapis épais au sol, et un lit. Elle sent nettement meilleure que toutes les autres pièces visitées.
    Elric, le jeune apprenti alchimiste humain qui vit ici, est le seul à vivre de jour et à dormir de nuit. Suivant l'heure à laquelle les
    personnages arrivent, il dort ou bien est en train de travailler sur
    son grimoire, assis à son bureau.
    Elric se rend rapidement compte que, seul, il ne fera pas le poids
    face aux personnages. Il essayera donc de les endormir par de
    belles paroles, prétendant en premier lieu être prisonnier des
    gobelins, puis suppliant le membre du groupe qui semble le plus
    clément de le laisser partir. En fait, il tentera de s'enfuir dès qu'il en aura l'occasion.
    Ni Gandelme ni Lanéa ne l'avaient vu avant, et il n'a participé à
    aucun raid avec les gobelins. Il n'a en fait que peu de relations
    avec les gobelins. Renvoyé par son mentor pour incapacité, il
    cherchait un endroit tranquille pour réaliser ses expériences, et
    a été attaqué par les gobelins. Mais, parlant leur langue, et plutôt
    doué pour embobiner les autres, il a réussi à convaincre leur
    chef qu'il pouvait transformer le fer en or. Il est donc confiné ici
    jusqu'à ce qu'il parvienne à montrer les preuves de son soi-disant
    talent.
    Il n'est pas autorisé à sortir de l'antre, mais les gobelins le
    nourrissent, ce qui lui permet de se consacrer de plein temps à
    ses expériences… infructueuses jusque-là. Il n'a rien de valeur
    sur lui, mis à part la clef de la salle 14 et son grimoire qui
    contient tous les sorts qu'il a préparés (voir sa fiche de stat) plus un autre sort de niveau 1 (à déterminer au hasard).`,
  },
  {
    title: "La cellule",
    code: "16",
    description: `Cette pièce qui baigne dans l'obscurité est une cellule. Ceux d'entre vous qui connaissent Lanéa, la fille du chef,
    la reconnaissent tout de suite, pieds et poings liés par
    une corde. Elle ne semble toutefois pas avoir été
    maltraitée et vous reconnaît immédiatement.
    Si le groupe n'a pas encore trouvé Gandelme dans la salle 4,
    Lanéa leur révèle qu'elle l'a aperçu la veille et qu'il faut
    absolument le trouver avant de partir d'ici.`,
  },
  {
    title: "La chambre du chef",
    code: "17",
    description: `Cette chambre bien décorée contient un vrai lit, des tapis par terre et sur les murs, et un sac à dos sur lequel est
    posé un bouclier et une épée courte de petite taille. Les
    deux torches au mur sont éteintes.
    Le bouclier et l'épée courte appartiennent au halfelin Gandelme,
    capturé par les gobelins il y a une semaine, de même que le sac à
    dos qui, en plus de l'équipement standard de tout aventurier (sac
    d'explorateur), contient des outils de voleur et 20 po.`,
  },
];

async function generateAndSaveFixtures() {
  try {
    cpSync(fixturesFolder, "./static/", { recursive: true });
    await dataSource.initialize();

    const savedScenarios = await Promise.all(
      scenariosData.map(async (scenarioData) => {
        const scenario = new Scenario();
        scenario.title = scenarioData.title;
        scenario.bannerUrl = scenarioData.bannerUrl;
        scenario.teaser = scenarioData.teaser;
        scenario.credits = scenarioData.credits;
        scenario.fullStory = scenarioData.fullStory;
        return scenario.save();
      }),
    );

    const savedPlans = await Promise.all(
      plansData.map(async (planData) => {
        const plan = new Plan();
        plan.title = planData.title;
        plan.pictureUrl = planData.pictureUrl;
        plan.description = planData.description;
        plan.scenario = savedScenarios[0];
        return plan.save();
      }),
    );

    const savedPoI = await Promise.all(
      poisData.map(async (poiData) => {
        const poi = new PointOfInterest();
        poi.title = poiData.title;
        poi.code = poiData.code;
        poi.description = poiData.description;
        poi.plan = savedPlans[0];
        return poi.save();
      }),
    );
    console.info(
      `Fixtures enregistrées avec succès: ${savedScenarios.length} Scenario(s), ${savedPlans.length} Plans, ${savedPoI.length} PoI`,
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
