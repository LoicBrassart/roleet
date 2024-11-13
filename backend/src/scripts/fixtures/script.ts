import { dataSource } from "../../config/db";
import { DnDnpcCard, Flashcard } from "../../entities/FlashCard";
import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { Scenario } from "../../entities/Scenario";

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
  {
    title: "L'Oeil de Gruumsh",
    teaser:
      "Les personnages doivent ramener une relique à un chaman orc afin de sauver l'un des leurs.",
    fullStory: `Par une belle après-midi, près du village de Fial, sur la route qui
    mène à la ville de Fiohl (province des comtés d'Egonzasthan), un
    des personnages est attaqué par une bande d'orques en
    maraude.
    Une dizaine d'orques surgissent par surprise des deux
    bords de la route. Nul besoin de préciser qu'ils ont l'air
    menaçants. Seul face à autant d'individus, le combat
    semble perdu d'avance. Toutefois ils ne frappent pas
    immédiatement. Tout laisse à croire qu'ils veulent
    capturer leur proie vivante.
    Deux orques face à un personnage de niveau 1 ou 2 représentent
    une rencontre mortelle, donc face à une dizaine, notre héros
    devrait rapidement se rendre compte qu'il vaut mieux se rendre
    que de mourir bêtement.
    Toutefois, s'il insiste pour se battre et tenter sa chance, jouez le
    combat, en prenant en compte que les orques ne frappent pas
    pour tuer mais seulement pour assommer. À 0 point de vie, le
    personnage tombe donc momentanément dans les pommes, il
    n'est pas tué.
    Prisonnier
    Une fois ligoté, le personnage est entraîné dans une course folle
    jusqu'à un discret campement situé dans la montagne, au sud de
    Gladz, dans le comté de l'Est d'Egonzasthan.
    Le camp semble venir d'être monté et abrite une
    cinquantaine d'orques, tous des mâles en tenue de
    combat. Puis apparait celui qui semble être le chef, un
    véritable colosse, qui parle un commun approximatif.
    Le chef commence par se moquer du personnage, puis lui
    demande ce qu'ils doivent faire de sa personne. Quelle que soit
    la réponse, l'orque lui propose de racheter sa vie dans un duel à
    mort contre un des guerriers de la tribu choisi au hasard. Le sort
    désigne alors un guerrier orque, Bolrogg, puis ses armes sont
    rendues au personnage. Toute la tribu finit par former un cercle
    autour des deux protagonistes, et le combat commence. Cette
    fois l'orque frappe pour tuer.
    Si le personnage gagne le combat, la première réaction des
    orques est la stupeur. Puis rapidement ils se mettent à crier et se
    précipitent sur le vainqueur du duel, dans l'idée apparente de le
    déchiqueter. C'est alors qu'une voix retentit.
    S'il perd, c'est au moment où Bolrogg va porter le coup de grâce
    que cette même voix retentit.
    Une voix autoritaire se fait entendre et tous les orques se
    figent, même le chef. Les regards se tournent alors vers
    celui qui vient de parler, un vieil orque décharné dont la
    stature frêle et voutée contraste avec celle, robuste, des
    guerriers de la bande.
    Le personnage est alors de nouveau désarmé, enchaîné, et
    conduit jusqu'à une tente.
    Le chaman
    Là, il fera connaissance avec celui qui semble devoir être son
    sauveur et qui parle parfaitement le commun. Le vieil orque se
    présente comme étant Kerog Merakk, prêtre de Gruumsh, «celui qui ne dort jamais », divinité majeure des orques. Kerog est
    un orque intelligent et cultivé qui, en tant que chaman de la tribu,
    occupe une place très importante dans celle-ci. Comme tous les
    orques, il déteste les races civilisées, mais sa situation
    particulière ne lui laisse d'autres choix que de devoir faire appel
    à une de ces «
    sous-races » pour se sortir d'affaire.
    Un « bâtard puant » nommé Naram Sark m'a dérobé
    quelque chose de précieux et j'ai besoin de toi pour le
    récupérer. Alors que je m'étais absenté de notre
    campement principal, ce « rejeton d'elfe » m'a volé un
    objet sacré appelé l'Œil de Gruumsh, une relique dont
    j'avais la garde. J'ai poursuivi le voleur jusqu'ici, mais
    Naram (qui est donc un demi-orque) s'est réfugié à
    Egonzasthan-la-basse. Et comme tu l'as vu, ma troupe est
    trop peu importante pour pouvoir attaquer la capitale de
    cette province.
    Autre raison, mais qu'il n'avouera pas à son
    interlocuteur, est qu'il ne veut pas attirer
    l'attention des autres sorciers de sa tribu sur
    lui, car le fait est que si Kerog ne ramène pas
    l'objet, le crime sera découvert et le chaman
    sacrifié à Gruumsh afin d'expier sa faute.
    Kerog offre donc la vie au personnage et lui
    promet la richesse (il donne à ce moment un
    coup de pied dans un coffre qui se renverse,
    révélant un monceau de pièces d'or) si celui-ci
    revient avec la relique. Il le jure sur Gruumsh,
    d'un air vraiment écœuré. Le personnage devrait
    comprendre que ses choix sont relativement
    limités !
    Le chaman décrit alors la sainte relique comme étant un œil
    énorme d'environ 30 centimètres de large et serti d'une énorme
    gemme couleur rouge sang. Et comme il ne lui fait pas
    confiance, il prendra une petite précaution vis-à-vis du
    personnage en lui faisant avaler de force une étrange graine qui
    ressemble à un noyau de pêche poilue.
    Tu n'as pas toute la vie pour me ramener mon bien. La
    grosse graine que tu viens d'avaler est un poison mortel,
    et si tu n'absorbes pas l'antidote que je suis le seul à
    posséder dans les cinq jours qui suivent, tu disparaîtras
    de cette terre dans une mort lente et douloureuse.
    Le personnage a donc cinq jours pour remplir sa mission.
    LA GRAINE DE NICOLAK
    Ingestion - Toxine
    Appelée aussi « graine du démon jardinier », cette étrange
    semence est le fruit des travaux d'un chaman du Decharnrath,
    Nicolak. Une des particularités de cette graine est que bien
    qu'étant un végétal, elle a besoin d'un organisme animal pour se
    développer. Une fois implantée dans un être vivant donc, elle se
    met à germer entre le quatrième et le cinquième jour après son
    absorption. Puis en l'espace de 12 heures elle absorbe les
    substances vitales environnantes et provoque une mort lente et
    très douloureuse. La créature doit réussir un jet de sauvegarde de
    Constitution DD 12 ou prendre 3 (1d6) dégâts de poison. Ce jet doit
    être lancé toutes les heures durant 12 heures.
    À noter que Nicolak a également conçu une substance appelé
    « lait de dragon », un liquide laiteux et pâteux au goût immonde
    qui, s'il est absorbé avant que la graine ne commence à germer,
    la détruit dans l'organisme, tout en provoquant une forte
    diarrhée. La créature prend un niveau d'épuisement jusqu'à son
    prochain repos long.
    Puis Kerog, dans sa grande bonté, donne au personnage un
    moyen de repérer Naram, un objet aussi utile qu'esthétique : une
    main humaine coupée au niveau du poignet et dont le majeur
    indique la direction dans lequel se trouve le voleur ! Le chaman
    possède un sens de l'humour assez macabre, mais l'objet
    fonctionne. De toute façon, il pourra facilement reconnaître
    Naram, celui-ci est borgne et possède une énorme cicatrice sur
    sa joue gauche.
    Enfin, Kerog l'informe que Naram, malgré son sang elfe, est
    quelqu'un d'assez retors. Il lui conseille donc d'engager quelques
    sbires pour l'aider dans sa tâche, et à cette fin il lui jette une
    bourse contenant près de 50 po.
    Retrouvailles
    Fial est une charmante bourgade située à
    deux jours d'Egonzasthan-la-basse à
    marche forcée. Soit notre héros connait
    déjà les autres membres du groupe, et
    c'est donc naturellement qu'il va les
    retrouver. Soit Fial est le premier village
    sur sa route. Quoi qu'il en soit, le reste du
    groupe est à l'auberge du Taureau Gris.
    Mis à part les personnages, il y a
    quelques paysans qui boivent et se
    racontent les derniers potins du coin.
    Sur ce, l'ex-prisonnier fait son entrée.
    Les autres personnages remarquerontqu'il est épuisé, que ses vêtements sont en lambeaux et qu'il a
    l'air hagard. Si le groupe ne prête pas attention au nouveau venu,
    une bagarre d'ivrognes pourrait montrer à notre victime que les
    personnages sont des hommes qui savent se battre et qu'ils
    pourraient l'aider fortement à remplir sa mission et ainsi lui
    sauver la vie. Après tout, le chaman ne l'a-t-il pas encouragé à
    s'entourer de bras forts pour retrouver Naram ? Le combat, si
    combat il y a, devrait normalement se dérouler à mains nues. Un
    mort serait très mal vu par les villageois, même par ceux qui ne
    sont pas à l'auberge à ce moment-là. Quoi qu'il en soit, le groupe
    devrait être formé maintenant !
    Egonzasthan-la-basse
    Une fois le groupe formé et le but de la mission expliqué à tous,
    les personnages devraient logiquement se mettre en route pour
    Egonzasthan-la-basse. Le temps presse, l'estomac de l'un d'eux
    commence à montrer de petits signes inquiétants.
    La capitale de la fédération des comtés d'Egonzasthan est une
    grande ville à la foule aussi grouillante que bigarrée. Les
    personnages peuvent y acheter ce qu'ils veulent, armes,
    armures, équipement divers. Une foule a toujours profité
    aux roublards, mais une milice attentive patrouille en
    ville, donc prudence. Une fois en ville donc, la main
    permet aux personnages de trouver leur proie.
    Toutefois c'est un objet qui peut être difficilement
    utilisé en plein jour et qui n'est pas très précis.
    La main les conduit à travers les quartiers
    chauds de la ville, et après quelques heures
    ils finissent par trouver ce qu'ils cherchent,
    du moins ce qu'il en reste, dans une
    auberge sordide du quartier des
    Sonneurs [repère 7 sur la carte de la
    ville]. Naram a été sauvagement tué et
    son cadavre est froid. La relique n'est
    bien entendu plus en sa possession.
    Si la logeuse, une vieille femme un peu folle,
    est interrogée, elle révèlera que «
    Mr Kapa »
    (le pseudonyme de Naram) a reçu la visite d'un
    homme « louche » il y a trois jours de cela, et
    qu'il l'a brutalement expulsé en hurlant « v
    a
    dire à cette saloperie de Mez'Arate que je lui
    arracherai la gorge avec les dents s'il
    s'approche ». Un jet d'Intelligence
    (Arcanes) DD 15 permet d'apprendre que
    « Mez' » est un préfixe utilisé pour
    qualifier le rang des magiciens dans la
    tour de l'échec des Pics des Mages à
    Laelith !
    L'histoire
    La province maléfique du Decharnrath est située au cœur du
    Shaar occidental et s'étend sur les collines du même nom et le
    bois de Channath. Elle constitue la plus grosse communauté du
    Shaar, mais sûrement pas la plus organisée. C'est en effet une
    communauté orque, bien qu'on y trouve également quelques
    rares sorciers humains, et une terre où règnent les intrigues, les
    assassinats et les trahisons. Le dieu Gruumsh est bien entendu
    la divinité suprême dans cette province.
    Kerog est un personnage influent du Decharnrath. Il le doit à sa
    position de chaman d'une des plus grandes tribus de la
    communauté, mais surtout au fait que c'est lui qui a découvert
    lors de l'une de ses expéditions « l'Œil de Gruumsh », véritable
    relique pour les adorateurs du chef du panthéon orque. Naram,
    lui aussi prêtre de Gruumsh, est alors devenu férocement jaloux
    de Kerog. Il était, avant cela, celui des deux qui avait le plus
    d'influence sur la tribu, mais depuis que Kerog a ramené son
    trophée, le rapport de force s'est inversé. Vu la nouvelle situation
    privilégiée de Kerog, il lui était devenu difficile de l'assassiner,
    alors Naram a dérobé l'Œil et l'a caché. Mais sa victime, grâce à
    la sorcellerie, a découvert l'auteur du larcin et ce pauvre Naram
    n'a eu d'autres choix que de s'enfuir précipitamment du
    Decharnrath avec son butin. Kerog, à la tête d'une bande
    d'orques dévoués, l'a poursuivi et allait réussir à le capturer
    quand Naram s'est réfugié en désespoir de cause dans la ville
    d'Egonzasthan-la-basse.
    Malheureusement pour lui, il a été remarqué par un espion de la
    tour de l'échec de Laelith, Mez'Arate. Intrigué par la présence
    d'un demi-orque seul dans la capitale d'Egonzasthan, le mage a
    envoyé un de ses sbires aux nouvelles. Mais Naram, craignant
    qu'on ne lui vole sa relique, a violement repoussé l'intrus, ce qui
    a encore plus excité la curiosité de Mez'Arate. Ce dernier a donc
    envoyé dès le lendemain toute sa bande cette fois lui ramener la
    brute, et ceux-ci l'ont cueilli au moment même où il terminait de
    boucler son sac. Une rapide et sanglante échauffourée s'en est
    alors suivie dans laquelle Naram a trouvé la mort.
    Mez'Arate, qui surveillait l'opération de loin, est ensuite
    reparti avec son précieux butin pour sa demeure au sud
    de la ville, après avoir laissé sur place trois de ses
    hommes pour surveiller le coin, par précaution.
    Surveillés
    En sortant, dépités, de la chambre du défunt, les
    personnages seront filés par les trois hommes de
    main que Mez'Arate a laissés par-là (1 malfrat et
    2 bandits). Mais ils ne sont pas très habiles
    pour la filature. Un score de Sagesse
    (Perception) passive de 12 ou plus permet au
    groupe de s'apercevoir qu'ils sont filés.
    Il est préférable pour les personnages de leur
    tendre une embuscade pour les capturer vivant et
    les faire parler. S'ils y parviennent, les sbires
    lâcheront le nom de leur patron et l'endroit où il
    réside actuellement. Dans le cas contraire,
    l'affrontement n'effraiera pas les hommes. Ils
    ont chacun 8 po et 15 pc sur eux.
    Notez que si les personnages les tuent tous les
    trois avant de les interroger, ils seront mal
    pour la suite de l'aventure. Ça leur
    apprendra, à D&D on ne fait pas que tuer
    des monstres !`,
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
    scenarioIndex: 0,
  },
  {
    title: "1er étage",
    description: undefined,
    pictureUrl: "1er-etage.png",
    scenarioIndex: 1,
  },
  {
    title: "Second étage",
    description: undefined,
    pictureUrl: "2nd-etage.png",
    scenarioIndex: 1,
  },
  {
    title: "Rez de chaussée",
    description: undefined,
    pictureUrl: "rez-de-chaussee.png",
    scenarioIndex: 1,
  },
  {
    title: "Sous Sol",
    description: undefined,
    pictureUrl: "sous-sol.png",
    scenarioIndex: 1,
  },
];
const poisData = [
  {
    title: "L'entrée",
    planIndex: 0,
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
    planIndex: 0,
    code: "X",
    description: `Au premier carrefour, le couloir qui file tout droit est piégé (emplacement marqué X). C'est une fosse simple, un trou creusé dans le sol et recouvert d'une large toile fixée sur les bords de la fosse, le tout camouflé avec de la terre et des débris. Un jet de Sagesse (Perception) DD 10 réussi permet de remarquer la
    fosse à temps. Dans le cas contraire, le premier personnage qui
    marche dessus tombe dans le trou profond de 3 mètres et subit
    1d6 points de dégâts contondants.`,
  },
  {
    title: "La salle d'armes",
    planIndex: 0,
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
    planIndex: 0,
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
    planIndex: 0,
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
    planIndex: 0,
    code: "5",
    description: `La double porte donne sur vaste pièce sans lumière qui
    est en grande partie vide. Dans la partie sud on trouve
    toutefois un monceau de nourriture : viandes, fruits
    séchés, alcools, légumes.
    De quoi nourrir de nombreux gobelins durant des jours.`,
  },
  {
    title: "La cuisine",
    planIndex: 0,
    code: "6",
    description: `Deux torches aux murs illuminent cette pièce qui ne
    contient pas grand-chose non plus. Juste un fourneau
    avec un feu allumé dont la fumée s'échappe par un trou
    au plafond, des plats et des casseroles sales, et un peu de
    nourriture qui ne fait pas du tout envie.`,
  },
  {
    title: "Une chambre de gobelins",
    planIndex: 0,
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
    planIndex: 0,
    code: "8",
    description: `Dans cette pièce se trouvent deux paillasses de taille
    humaine et une grosse bourse.
    C'est bien entendu là que dorment les deux hobgobelins, mais
    pour le moment ils sont en train de manger dans la salle
    commune. La bourse contient 11 po et 1 pp.`,
  },
  {
    title: "La salle commune",
    planIndex: 0,
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
    planIndex: 0,
    code: "10",
    description: `Il y a dans cette pièce six paillasses et deux gobelins y sont allongés, en train de dormir.
    Ces gobelins ont le sommeil profond et un simple combat dans
    la salle 9 ne devrait pas les réveiller. Mais en cas de cris d'un
    hobgobelin, ils accourront voir ce qu'il se passe.`,
  },
  {
    title: "La chambre du gobelours",
    planIndex: 0,
    code: "11",
    description: `Lorsqu'ils ouvrent la porte de cette pièce, les personnages aperçoivent une créature qui correspond à la description qu'on leur a peut-être fait à Fial d'un gobelours. Le monstre est de profil et en train de cacher un petit sac sous sa paillasse. Il ne possède comme arme qu'une Morgenstern, n'a pas de bouclier (baisser sa CA de 2). Le petit sac qu'il tentait de cacher contient 40 po.
    Le gobelours n'appréciera certainement pas qu'on entre chez lui
    comme cela sans demander la permission, et encore moins alors
    qu'il était en train de ranger le butin de sa dernière sortie. Il
    attaquera donc, sans hésiter.`,
  },
  {
    title: "La salle du trésor",
    planIndex: 0,
    code: "12",
    description: `Protégée par un passage secret (Investigation DD 15), on peut y trouver six petites statuettes en ivoire (valeur de 60 po au total), deux potions de soins (qui font regagner 2d4+2 pv) et un grand coffre non fermé à clef qui contient 2000 pc, 1000 pa et 70 po. Il n'y a aucune lumière ici.`,
  },
  {
    title: "La salle du trône",
    planIndex: 0,
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
    planIndex: 0,
    code: "14",
    description: `Cette pièce est fermée à clef (Dextérité DD 15 pour la crocheter, à condition d'avoir des outils de voleur, ou Force DD 15 pour l'enfoncer). Dans cette pièce se trouvent nombre d'étagères contenant plein de pots et de fioles sans étiquette, et tout un tas de matériel qui semble être celui d'un alchimiste. Ce sont les ingrédients de l'apprenti alchimiste de la salle 15, mais même un magicien n'y reconnaîtra rien !`,
  },
  {
    title: "La chambre de l'alchimiste",
    planIndex: 0,
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
    planIndex: 0,
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
    planIndex: 0,
    code: "17",
    description: `Cette chambre bien décorée contient un vrai lit, des tapis par terre et sur les murs, et un sac à dos sur lequel est
    posé un bouclier et une épée courte de petite taille. Les
    deux torches au mur sont éteintes.
    Le bouclier et l'épée courte appartiennent au halfelin Gandelme,
    capturé par les gobelins il y a une semaine, de même que le sac à
    dos qui, en plus de l'équipement standard de tout aventurier (sac
    d'explorateur), contient des outils de voleur et 20 po.`,
  },
  {
    title: "Hall",
    planIndex: 3,
    code: "1",
    description: `La porte d'entrée est en chêne massif de 5 cm d'épaisseur
    renforcé de gros clous de fer. Elle est fermée de l'intérieur par
    une solide barre transversale en métal. Impossible de la
    crocheter donc. Si les personnages ne se débrouillent pas pour
    qu'on ouvre la porte de l'intérieur, il va leur falloir réussir un jet
    de Force DD 25 pour l'enfoncer, ce qui immanquablement fera
    intervenir les gardes de la salle 4.
    Le hall donne sur un couloir qui possède une imposante
    cheminée et un escalier en colimaçon qui monte au
    premier étage et descend à un sous-sol.`,
  },
  {
    title: "Réserve",
    planIndex: 3,
    code: "2",
    description: `Un garde-manger qui contient de la nourriture pour dix
    personnes pour au moins une semaine. Principalement
    de la viande salée, du fromage et du pain.`,
  },
  {
    title: "Cuisine",
    planIndex: 3,
    code: "3",
    description: `Cette petite pièce est équipée de tout le nécessaire pour
    se concocter de bons petits plats, dont un fourneau de
    taille moyenne qui siège au milieu de la salle.`,
  },
  {
    title: "Salle de garde 1",
    planIndex: 3,
    code: "4",
    description: `C'est ici que logent la plupart des hommes que Mez'Arate a
    laissés sur place durant son absence. De jour, ils passent leur
    temps ici à parler et à boire de la bière et du vin. À partir de
    minuit et jusqu'au lendemain 7 heures, ils dorment.
    5 hommes de main (bandits) sont présents et l'un d'eux possède
    la clef qui ouvre la porte de la cave. Ils ont respectivement sur
    eux 10 po, 11 pa, 10 pe, 8 pe et 12 pa. À part cinq paillasses, il
    n'y a rien de très intéressant ici. Si les personnages les
    interrogent sur l'Œil de Gruumsh, ceux-ci savent que leur
    employeur est arrivé à la maison avec, mais reparti sans. Il est
    donc dans la maison, mais ils ne savent pas où.`,
  },
  {
    title: "Bibliothèque",
    planIndex: 1,
    code: "5",
    description: `Cette grande bibliothèque abrite une multitude de livres,
    d'histoire pour la plupart. On peut y apprendre de
    nombreuses choses intéressantes sur le royaume,
    notamment la reconstruction de Laelith suite au
    Châtiment, et la création des provinces. Aucun livre ne
    traite de magie.`,
  },
  {
    title: "Bureau",
    planIndex: 1,
    code: "6",
    description: `Un seul meuble ici, un très beau secrétaire en acajou.
    Dans les tiroirs on peut trouver une vingtaine de feuilles de
    parchemins vierges, des plumes et diverses encres.`,
  },
  {
    title: "Salle de garde 2",
    planIndex: 1,
    code: "7",
    description: `Semblable à la salle de garde du rez-de-chaussée, il y a ici aussi
    cinq paillasses. C'est là que dorment les meilleurs mercenaires
    du magicien, mais il n'y a actuellement que 2 hommes de main
    (malfrats), les trois autres étant à Egonzasthan-la-basse avec
    Mez'Arate. L'un possède 24 pc, l'autre 3 pp.`,
  },
  {
    title: "Chambre 1",
    planIndex: 2,
    code: "8",
    description: `Une chambre à coucher au mobilier dépouillé mais de
    goût. Elle semble toutefois ne pas être habitée.`,
  },
  {
    title: "Chambre 2",
    planIndex: 2,
    code: "9",
    description: `Autre chambre à coucher qui ne semble pas être
    occupée.`,
  },
  {
    title: "Chambre de l'espion-magicien",
    planIndex: 2,
    code: "10",
    description: `Peu de meubles dans cette pièce, mais tous sont de très
    bonne qualité. À part des vêtements de rechange de
    taille humaine et deux sacs contenant 600 pa, 100 po et 6
    gemmes de 4 po chacune, rien d'autre d'intéressant.`,
  },
  {
    title: "Cellier",
    planIndex: 4,
    code: "11",
    description: `Cette cave abrite trois tonneaux de bière et une étagère
    contre le mur sur laquelle reposent une douzaine de
    bouteilles de vin rouge de qualité médiocre.
    Le passage secret du couloir qui provient de la salle 13 ne
    s'ouvre que de l'autre côté. Impossible de le détecter ou de
    l'ouvrir depuis la cave.`,
  },
  {
    title: "Cave",
    planIndex: 4,
    code: "12",
    description: `La porte de cette salle est fermée à clef. L'un des gardes de la
    salle 4 la porte sur lui. Sinon, le DD est de 12.
    À l'intérieur de cette grande pièce reposent de
    nombreuses bouteilles de vins fins ainsi que trois grands
    tonneaux de bonne bière. Mez'Arate semble être un
    homme de goût qui aime à ne manquer de rien mais n'est
    pas prêt à partager avec tout le monde.
    Si un personnage effectue une fouille, le DD du jet de Sagesse
    (Perception) est de 5. En cas de réussite, il remarque que cette
    deuxième cave est de facture récente. En cas de réussite de 10
    ou plus, il constate également qu'une brique du mur est n'est pas
    scellée et semble légèrement enfoncée dans le mur (appuyer
    dessus ouvre le passage secret). Et en cas de réussite de 15 ou
    plus, il remarque même la présence d'un trou dans le mur ouest
    face au passage secret.
    Dans ce dernier cas, un jet d'Intelligence (Investigation) DD 15
    réussi permet de déduire la présence d'une plaque de pression
    au sol, devant le passage secret. Coincer un piton de fer ou tout
    autre objet sous la plaque empêche le piège de s'activer. De
    même, boucher les trous avec du tissu ou de la cire empêche les
    fléchettes d'être lancées.
    Si on marche sur la plaque devant la porte secrète sans avoir
    désamorcé le système, un jeu de ressorts propulse 4 fléchettes
    (+8 au toucher.
    Dégâts : 2 (1d4) dégâts perforants chacune) et
    fait sonner une cloche dans le couloir au rez-de-chaussée. Mais,
    ne connaissant pas l'existence de cette alarme, les gardes ne
    savent pas où aller !`,
  },
  {
    title: "L'antre du magicien",
    planIndex: 4,
    code: "13",
    description: `Cette grande salle est d'un aspect sinistre, et d'étranges
    odeurs flottent dans l'air. Sur les multiples tables et
    étagères se trouve ce qui semble être l'Œil de Gruumsh
    ainsi que deux potions, un grimoire et diverses
    composantes matérielles. Dans un bocal posé sur une
    table, une main droite d'elfe. Et au sol, un gros coffre en
    fer fermé à clef.
    Alors que les personnages seront surement occupés à se remplir
    les poches, 7 grosses araignées vont s'en prendre à eux.
    Leur morsure ne représente pas un grand
    danger ; le problème avec ces petites bestioles
    c'est leur venin.
    Les potions sont une
    potion d'escalade et
    une
    potion de soins. Le grimoire est un
    livre de sorts de magicien (volé) qui
    contient tous les sorts de niveau 1 et 2
    de l'école d'enchantement, avec toutes
    les composantes matérielles nécessaires
    à ceux-ci. La main droite d'elfe ne sert à
    rien. Mez'Arate a par contre la main
    gauche sur lui. Il a réussi à y faire fixer le
    sort
    main de mage, ce qui lui permet d'avoir
    un sort mineur à volonté supplémentaire.
    Ouvrir le coffre après l'avoir crocheté (jet de Dextérité DD 15)
    permet d'y trouver environ 2100 pa.
    L'ŒIL DE GRUUMSH
    Cette relique tirée des abysses du temps n'a pas grande valeur
    pour un être humain, mise à part peut-être la gemme qui se
    révèlera être un magnifique rubis d'au moins 1000 po !
    Une personne tentant de retirer la gemme de l'Œil devra réussir un
    jet de sauvegarde de Constitution DD 30 (DD 10 pour les orques,
    DD 20 pour les demi-orques) ou prendre 5d10 dégâts de foudre`,
  },
];
const flashcardsData = [
  {
    title: "Elric",
    description:
      "Elric est un jeune apprenti magicien qui veut devenir alchimiste.",
    type: "DnDnpcCard",
    scenarioIndex: 0,
    species: "Humanoïde (Humain)",
    size: "M",
    alignment: "Neutre",
    armorClass: 10,
    health: "7 (2d8-2)",
    speed: 9,
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
    behaviour: `Incantation: Elric est un lanceur de sorts de niveau 1. Sa caracteristique d'incantation est l'Intelligence (jet de sauvegarde contre ses sorts DD12, +4 au toucher pour les attaques avec un sort). Elric a préparé les sorts de magicien suivants:
      Sorts mineurs (à volonté): Amis, Aspersion d'acide, Lumière
      Niveau 1 (2 emplacements): Bouclier, Graisse, Repli expéditif`,
    actions:
      "Dague: Attaque au corps à corps ou à distance avec une arme: +2 au toucher, allonge 1.50m ou portée 6/18m, une cible. Touché: 2 (1d4) dégâts perforants",
  },
  {
    title: "Gobelin",
    description:
      "Les gobelins sont de petits humanoïdes malvellants qui vivent dans les donjons abandonnés ou dans des taudis lugubres. Individuellement faibles, ils se rassemblent en grand nombre pour tourmenter les autres créatures.",
    type: "DnDnpcCard",
    scenarioIndex: 0,
    species: "Humanoïde (gobelinoïde)",
    size: "P",
    alignment: "Neutre Mauvais",
    armorClass: 15,
    health: "7 (2d6)",
    speed: 9,
    strength: 8,
    dexterity: 14,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 8,
    skills: "Discrétion +6",
    senses: "Vision dans le noir 18m, Perception passive 9",
    languages: "Commun, Gobelin",
    dangerLevel: 1,
    behaviour:
      "Fuite agile: Le gobelin peut Se Cacher ou Se Désengager à chacun de ses tours en utilisant une action bonus.",
    actions: `Cimeterre: Attaque au corps à corps avec une arme: +4 au toucher, allonge 1.50m, une cible. Touché: 5 (1d6+2) dégâts tranchants.
      
      Arc Court: Attaque à distance avec une arme: +4 au toucher, portée 24/96m, une cible. Touché: 5 (1d6+2) dégâts perforants.`,
  },
  {
    title: "Gobelours",
    description:
      "Les gobelours sont des gobelinoïdes velus nés pour la bataille et la destruction. Ils survivent en pillant et en chassant, mais sont friands des attaques en embuscade d'où ils peuvent rapidement s'enfuir en cas de problème.",
    type: "DnDnpcCard",
    scenarioIndex: 0,
    species: "Humanoïde (gobelinoïde)",
    size: "M",
    alignment: "Chaotique Mauvais",
    armorClass: 16,
    health: "27 (5d8+5)",
    speed: 9,
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intelligence: 8,
    wisdom: 11,
    charisma: 9,
    skills: "Discrétion +6, Survie +2",
    senses: "Vision dans le noir 18m, Perception passive 10",
    languages: "Commun, Gobelin",
    dangerLevel: 1,
    behaviour: `Attaque surprise: Si un gobelours surprend une créature et touche avec une attaque lors du premier round de combat, la cible subit 7 (2d6) dégâts supplémentaires pour cette attaque.
    
    Brutal: Une arme de corps à corps inflige un dé de dégâts supplémentaire lors que le gobelours réussit son attaque (inclus dans l'attaque ci-dessous).`,
    actions: `Morgenstern: Attaque au corps à corps avec une arme: +4 au toucher, allonge 1.50m, une cible. Touché: 11 (2d8+2) dégâts perforants.
      
      Javeline: Attaque au corps à corps ou à distance avec une arme: +4 au toucher, allonge 1.50m ou portée 9/36m, une cible. Touché: 9 (2d6+2) dégâts perforants à distance.`,
  },
  {
    title: "Hobgobelin",
    description:
      "Les hobgobelins sont de grands gobelinoïdes à la peau noir orangée ou rouge orangée. Une hobgobelin mesure le mérite suivant la force physique et les prouesses martiales, ne se souciant de rien d'autre que de la compétence et de l'astuce dans la bataille.",
    type: "DnDnpcCard",
    scenarioIndex: 0,
    species: "Humanoïde (gobelinoïde)",
    size: "M",
    alignment: "Loyal Mauvais",
    armorClass: 18,
    health: "11 (2d8-2)",
    speed: 9,
    strength: 13,
    dexterity: 12,
    constitution: 12,
    intelligence: 10,
    wisdom: 10,
    charisma: 9,
    skills: "",
    senses: "Vision dans le noir 18m, Perception passive 10",
    languages: "Commun, Gobelin",
    dangerLevel: 1,
    behaviour: `Avantage martial: Une fois apr tour, un hobgobelin peur infliger 7 (2d6) dégâts supplémentaires à une créature s'il la touche à l'aide d'une attaque armée réussie à condition que cette créature se situe à 1.50m ou moins d'un allié du hiobgobelin.`,
    actions: `Epée longue: Attaque au corps à corps avec une arme: +3 au toucher, allonge 1.50m, une cible. Touché: 5 (1d8+1) dégâts tranchants, ou 6 (1d10+1) dégâts tranchants si utilisée à deux mains.
      
      Arc Long: Attaque à distance avec une arme: +3 au toucher, portée 45/180m, une cible. Touché: 5 (1d8+1) dégâts perforants.`,
  },
  {
    title: "Araignée",
    description: "",
    type: "DnDnpcCard",
    scenarioIndex: 1,
    species: "Bête",
    size: "TP",
    alignment: "Neutre",
    armorClass: 12,
    health: "1 (1d4-1)",
    speed: 6,
    strength: 2,
    dexterity: 14,
    constitution: 8,
    intelligence: 1,
    wisdom: 10,
    charisma: 2,
    skills: "Discrétion +4",
    senses: "vision dans le noir 9 m, Perception passive 10",
    languages: "",
    dangerLevel: 0,
    behaviour: `Pattes d'araignée. L'araignée peut escalader des surfaces difficiles et être au plafond la tête en bas sans avoir besoin d'effectuer un jet de caractéristique.

    Sens de la toile. Lorsqu'elle est en contact avec une toile, l'araignée connait l'emplacement exact de toutes les créatures qui sont en contact avec cette toile.

    Déplacement sur la toile. L'araignée ignore les restrictions de mouvement causées par une toile d'araignée.`,
    actions:
      "Morsure. Attaque au corps à corps avec une arme : +4 au toucher, allonge 1,50 m, une créature. Touché : 1 dégât perforant et la cible doit réussir un jet de sauvegarde de Constitution DD 9 ou subir 2 (1d4) dégâts de poison.",
  },
  {
    title: "Bandit",
    description: `Les bandits vagabondent en bandes et sont parfois dirigés par des malfrats, des vétérans ou des mages. Tous les bandits ne sont pas mauvais. L'oppression, la sécheresse, les épidémies ou la famine peuvent souvent entraîner d'honnêtes gens vers une vie de banditisme.
Les pirates sont des bandits de haute mer. Ils peuvent être des flibustiers intéressés uniquement par les trésors et le meurtre, ou être des corsaires légitimés par la couronne pour attaquer et piller les navires d'une nation ennemie.`,
    type: "DnDnpcCard",
    scenarioIndex: 1,
    species: "Humanoïde (toute race)",
    size: "M",
    alignment: "Non-Loyal",
    armorClass: 12,
    health: "11 (2d8 + 2)",
    speed: 9,
    strength: 11,
    dexterity: 12,
    constitution: 12,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    skills: "",
    senses: "Perception passive 10",
    languages: "une langue au choix (généralement le commun)",
    dangerLevel: 1,
    behaviour: "",
    actions: `Cimeterre. Attaque au corps à corps avec une arme : +3 au toucher, allonge 1,50 m, une cible. Touché : 4 (1d6 + 1) dégâts tranchants.

Arbalète légère. Attaque à distance avec une arme : +3 au toucher, portée 24/96 m, une cible. Touché : 5 (1d8 + 1) dégâts perforants.`,
  },
  {
    title: "Malfrat",
    description:
      "Les malfrats sont d'impitoyables hommes de main doués pour l'intimidation et la violence. Ils travaillent pour l'argent et ont peu de scrupules.",
    type: "DnDnpcCard",
    scenarioIndex: 1,
    species: "Humanoïde (toute race)",
    size: "M",
    alignment: "Non-Bon",
    armorClass: 11,
    health: "32 (5d8 + 10)",
    speed: 9,
    strength: 15,
    dexterity: 11,
    constitution: 14,
    intelligence: 10,
    wisdom: 10,
    charisma: 11,
    skills: "Intimidation +2",
    senses: "Perception passive 10",
    languages: "une langue au choix (généralement le commun)",
    dangerLevel: 0,
    behaviour: `Tactique de groupe. Le malfrat a un avantage aux jets d'attaque contre une créature si au moins l'un de ses alliés est à 1,50 mètre ou moins de la créature et n'est pas incapable d'agir.`,
    actions: `Attaques multiples. Le malfrat effectue deux attaques au corps à corps.

Masse d'armes. Attaque au corps à corps avec une arme : +4 au toucher, allonge 1,50 m, une cible. Touché : 5 (1d6 + 2) dégâts contondants.

Arbalète lourde. Attaque à distance avec une arme : +2 au toucher, portée 30/120 m, une cible. Touché : 5 (1d10) dégâts perforants.`,
  },
  {
    title: "Molosse",
    description:
      "Les molosses sont d'impressionnants chiens prisés par les humanoïdes pour leur loyauté et leur sens aiguisés.",
    type: "DnDnpcCard",
    scenarioIndex: 1,
    species: "Bête",
    size: "M",
    alignment: "Neutre",
    armorClass: 12,
    health: "5 (1d8-1)",
    speed: 12,
    strength: 13,
    dexterity: 14,
    constitution: 12,
    intelligence: 3,
    wisdom: 12,
    charisma: 7,
    skills: "Perception +3",
    senses: "Perception passive 13",
    languages: "",
    dangerLevel: 0,
    behaviour: `Odorat et ouïe aiguisés. Le molosse a un avantage aux jets de Sagesse (Perception) basés sur l'odorat ou l'ouïe.`,
    actions:
      "Morsure. Attaque au corps à corps avec une arme : +3 au toucher, allonge 1,50 m, une cible. Touché : 4 (1d6 + 1) dégâts perforants. Si la cible est une créature, elle doit réussir un jet de sauvegarde de Force DD 11 pour ne pas tomber à terre.",
  },
  {
    title: "Orc",
    description:
      "Les orcs sont des humanoïdes sauvages qui ont une posture voûtée, des visages grossiers et des dents proéminentes qui ressemblent à des défenses. Ils se rassemblent en tribus qui étanchent leur soif de sang en attaquant tous les humanoïdes qu'ils croisent.",
    type: "DnDnpcCard",
    scenarioIndex: 1,
    species: "Humanoïde (orc)",
    size: "M",
    alignment: "Chaotique Mauvais",
    armorClass: 13,
    health: "15 (2d8 + 6)",
    speed: 9,
    strength: 16,
    dexterity: 12,
    constitution: 16,
    intelligence: 7,
    wisdom: 11,
    charisma: 10,
    skills: "Intimidation +2",
    senses: "vision dans le noir 18 m, Perception passive 10",
    languages: "commun, orc",
    dangerLevel: 0,
    behaviour: `Agressif. Par une action bonus, l'orc peut se déplacer de sa vitesse vers une créature hostile qu'il peut voir.`,
    actions: `Hache à deux mains. Attaque au corps à corps avec une arme : +5 au toucher, allonge 1,50 m, une cible. Touché : 9 (1d12 + 3) dégâts tranchants.

Javeline. Attaque au corps à corps ou à distance avec une arme : +5 au toucher, allonge 1,50 m ou portée 9/36 m, une cible. Touché : 6 (1d6 + 3) dégâts perforants.`,
  },
  {
    title: "L'Oeil de Gruumsh",
    description: `Cette relique tirée des abysses du temps n'a pas grande valeur
pour un être humain, mise à part peut-être la gemme qui se
révèlera être un magnifique rubis d'au moins 1000 po !
Une personne tentant de retirer la gemme de l'Œil devra réussir un
jet de sauvegarde de Constitution DD 30 (DD 10 pour les orques,
DD 20 pour les demi-orques) ou prendre 5d10 dégâts de foudre.`,
    type: "ItemCard",
    scenarioIndex: 1,
  },
];

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();

    const savedScenarios = await Promise.all(
      scenariosData.map(async (scenarioData) => {
        const scenario = Object.assign(new Scenario(), {
          ...scenarioData,
        });
        return scenario.save();
      }),
    );

    const savedPlans = await Promise.all(
      plansData.map(async (planData) => {
        const plan = Object.assign(new Plan(), {
          ...planData,
          scenario: savedScenarios[planData.scenarioIndex],
        });

        return plan.save();
      }),
    );

    const savedPoI = await Promise.all(
      poisData.map(async (poiData) => {
        const poi = Object.assign(new PointOfInterest(), {
          ...poiData,
          plan: savedPlans[poiData.planIndex],
        });
        return poi.save();
      }),
    );

    const savedFlashcards = await Promise.all(
      flashcardsData.map(async (cardData) => {
        let card: Flashcard;
        switch (cardData.type) {
          case "DnDnpcCard":
            card = Object.assign(new DnDnpcCard(), {
              ...cardData,
              scenario: savedScenarios[cardData.scenarioIndex],
            });
            break;

          default:
            card = Object.assign(new Flashcard(), {
              ...cardData,
              scenario: savedScenarios[cardData.scenarioIndex],
            });
        }
        return card.save();
      }),
    );
    console.info(
      `Fixtures enregistrées avec succès: ${savedScenarios.length} Scenario(s), ${savedPlans.length} Plans, ${savedPoI.length} PoI, ${savedFlashcards.length} FlashCards`,
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
