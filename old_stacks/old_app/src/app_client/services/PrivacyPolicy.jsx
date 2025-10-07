import React from 'react';
import { useState } from 'react';
import './privacypolicy.css';
import logoKDDS from '../assets/Images/logoKDDS.png';
import { Dialog } from 'primereact/dialog';
import CookieSettings from './CookieSettings';
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {

  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - MonSite</title>
        <meta name="description" content="Découvrez comment nous collectons, utilisons et protégeons vos données." />
        <meta name="keywords" content="Politique de Confidentialité, Cookies, Protection des données" />
        <meta name="author" content="MonSite" />

        <meta property="og:title" content="Politique de Confidentialité - CPTS des Mauges" />
        <meta property="og:description" content="Découvrez comment nous protégeons vos données." />
        <meta property="og:url" content="https://cptsdesmauges.fr/politique-de-confidentialite" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cptsdesmauges.fr/favicon.ico" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Politique de Confidentialité",
            "description": "Découvrez comment nous collectons, utilisons et protégeons vos données.",
            "url": "https://cptsdesmauges.fr/politique-de-confidentialite",
          })}
        </script>
      </Helmet>


      <div className="privacy-policy">
        <h1>Politique de Confidentialité</h1>

        <section>
          <h2>1. Informations que nous collectons</h2>
          <p>Nous collectons les types d’informations suivants :</p>
          <ul>
            <li>Informations collectées automatiquement (adresse IP, cookies, etc.).</li>
          </ul>
        </section>

        <section>
          <h2>2. Utilisation des informations</h2>
          <p>Nous utilisons vos informations pour :</p>
          <ul>
            <li>Fournir, améliorer et personnaliser nos services.</li>
            <li>Analyser l’utilisation de notre site ou application.</li>
            <li>Sécuriser nos services face à de potentiels menaces.</li>
          </ul>
        </section>

        <section>
          <h2>3. Partage des informations</h2>
          <p>
            Nous ne vendons pas vos informations à des tiers. Cependant, elles peuvent être partagées avec :
          </p>
          <ul>
            <li>Des prestataires de services tiers agissant en notre nom.</li>
            <li>Des autorités compétentes en cas d’obligation légale.</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies et technologies similaires</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience et collecter des données analytiques.
            Vous pouvez configurer votre navigateur pour gérer vos préférences en matière de cookies.
          </p>
        </section>

        <section>
          <h2>5. Protection des informations</h2>
          <p>
            Nous appliquons des mesures de sécurité appropriées pour protéger vos informations contre l'accès non autorisé.
          </p>
        </section>

        <section>
          <h2>6. Vos droits</h2>
          <p>
            Vous disposez des droits suivants :
          </p>
          <ul>
            <li>Accéder à vos données personnelles.</li>
            <li>Modifier ou supprimer vos informations.</li>
            <li>Régler vos préférences en matière de cookies.</li>
          </ul>
          <p>Pour exercer vos droits, contactez-nous à : <a href="mailto:dev.kdds@gmail.com">dev.kdds@gmail.com</a></p>
        </section>

        <section>
          <h2>7. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique pour refléter des changements légaux ou opérationnels. Consultez
            régulièrement cette page pour vous tenir informé.
          </p>
        </section>

        <button className='buttoncookie' onClick={() => setShowSettings(true)}>Paramètres</button>
        <Dialog visible={showSettings} onHide={() => setShowSettings(false)}>
          <CookieSettings />
        </Dialog>

        <footer className='footercookie'>
          <p>
            Pour toute question, contactez-nous : <a href="mailto:dev.kdds@gmail.com">dev.kdds@gmail.com</a>
          </p>
          <p>Date d’entrée en vigueur : 19/01/2025</p>
          <img src={logoKDDS} alt="Logo KDDS" className="w-[150px]" />
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
