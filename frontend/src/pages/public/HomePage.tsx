export default function HomePage() {
  return (
    <>
      <h1>Salut, Etranger !</h1>
      <p>
        Roleet est (sera ?) un ensemble d'outils à destination des rôlistes,
        meneurs comme joueurs. L'idée est de s'adresser à tous les obstacles sur
        la route de votre prochaine partie !
      </p>
      <h2>Vos prochains outils préférés</h2>
      <div className="flex">
        <section>
          <h3>Pour les joueurs...</h3>
          <ul>
            <li>Un suivi centralisé de chacune de vos campagnes en cours</li>
            <li>Des feuilles de perso en ligne</li>
            <li>
              Un outil de prises de notes Markdown pour ne plus oublier le nom
              du BBEG
            </li>
            <li>
              Une liste de référence des sorties pour vos jeux, afin de savoir
              si vous avez raté le dernier Manuel des Monstres en date
            </li>
          </ul>
        </section>
        <section>
          <h3>... et les meneurs !</h3>
          <ul>
            <li>Une scenariothèque</li>
            <li>
              Des rappels de règles sur vos jeux du moment, pour vous préparer
              une cheatsheet sur mesure avant de mener une partie
            </li>
            <li>
              La possibilité de récupérer le PJ d'un autre utilisateur en tant
              que PNJ pour vos parties
            </li>
          </ul>
        </section>
      </div>
      <h2>Stats</h2>
      <ul>
        {/* TODO: créer une Query pour récupérer des stats d'usage du site */}
        <li>Scenarios:</li>
        <li>Utilisateurs:</li>
        <li>Campagnes:</li>
        <li>Plans:</li>
        <li>Monstres & PNJ:</li>
      </ul>
    </>
  );
}
