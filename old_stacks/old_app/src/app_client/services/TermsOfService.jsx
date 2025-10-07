import React from "react";
import './termsofservice.css';
import logoKDDS from '../assets/Images/logoKDDS.png';

const TermsOfService = () => {
  return (
    <div className="terms-of-use">
      <h1>Conditions Générales d’Utilisation</h1>

      <section>
        <h2>1. Objet du Site</h2>
        <p>
          Le Site a pour objectif de diffuser de l'information concernant les équipes et les actions menées par l'organisme de la CPTS des Mauges.
        </p>
      </section>

      <section>
        <h2>2. Accès au Site</h2>
        <p>
          L’accès au Site est gratuit. Toutefois, certains services ou contenus peuvent être réservés aux utilisateurs enregistrés ou soumis à des frais.
        </p>
        <p>
          L’utilisateur doit disposer d’un appareil compatible et d’une connexion Internet pour accéder au Site. Tous les frais liés à ces équipements ou services sont à la charge de l’utilisateur.
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur le Site (textes, images, vidéos, graphiques, logos, icônes, etc.) sont protégés par les lois sur la propriété intellectuelle. Ces contenus sont la propriété exclusive de [Nom de l’éditeur ou propriétaire].
        </p>
        <p>
          Toute reproduction, distribution, modification ou exploitation de ces contenus, sans autorisation préalable écrite, est strictement interdite.
        </p>
      </section>

      <section>
        <h2>4. Utilisation du Site</h2>
        <p>L’utilisateur s’engage à :</p>
        <ul>
          <li>Utiliser le Site de manière conforme à la loi et aux présentes CGU.</li>
          <li>Ne pas perturber le bon fonctionnement du Site (par exemple, par des attaques informatiques ou des tentatives d’intrusion).</li>
          <li>Ne pas diffuser de contenu illégal, diffamatoire, ou portant atteinte aux droits des tiers.</li>
        </ul>
      </section>

      <section>
        <h2>5. Responsabilités</h2>
        <h3>a) Responsabilité de l’éditeur</h3>
        <p>
          L’éditeur met tout en œuvre pour assurer l’exactitude et la mise à jour des informations présentes sur le Site. Cependant, il ne peut garantir l’absence d’erreurs, d’omissions ou de problèmes techniques. L’éditeur ne pourra être tenu responsable des dommages directs ou indirects liés à l’utilisation du Site.
        </p>
        <h3>b) Responsabilité de l’utilisateur</h3>
        <p>
          L’utilisateur est seul responsable de l’utilisation qu’il fait du Site et des conséquences de ses actions. Il lui appartient de vérifier l’exactitude des informations fournies sur le Site avant de les utiliser.
        </p>
      </section>

      <section>
        <h2>6. Liens hypertextes</h2>
        <p>
          Le Site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif et l’éditeur n’exerce aucun contrôle sur leur contenu. L’utilisateur accède à ces sites sous sa propre responsabilité.
        </p>
      </section>

      <section>
        <h2>7. Données personnelles</h2>
        <p>
          L’utilisation du Site peut impliquer la collecte et le traitement de données personnelles. Pour en savoir plus, veuillez consulter notre{" "}
          <a href="/politique-de-confidentialite">Politique de Confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>8. Modifications des CGU</h2>
        <p>
          L’éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification importante via le Site. En continuant à utiliser le Site après ces modifications, vous acceptez les nouvelles conditions.
        </p>
      </section>

      <section>
        <h2>9. Loi applicable et juridiction compétente</h2>
        <p>
          Les présentes CGU sont régies par la loi française. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux français.
        </p>
      </section>

      <p>Date de mise à jour : 19/01/2025</p>
      <img src={logoKDDS} alt="Logo KDDS" className="w-[150px]" />
    </div>
  );
};

export default TermsOfService;
