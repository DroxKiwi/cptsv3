import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import CookieSettings from "./CookieSettings";
import { Button } from "primereact/button";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true); // Affiche la bannière si pas de consentement
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Stocke le consentement
    setShowBanner(false);
    window.location.replace('https://cptsdesmauges.fr');
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false"); // Refus enregistré
    setShowBanner(false);
  };

  if (!showBanner) return null; // N'affiche pas la bannière si déjà accepté/refusé

  return (
    <div className="cookie-banner">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience. Consultez notre{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>
      <button className="buttoncookie" onClick={handleAccept}>Accepter</button>
      <button className="buttoncookie" onClick={handleDecline}>Refuser</button>
      <button className="buttoncookie" onClick={() => setShowSettings(true)}>Paramètres</button>
      <Dialog visible={showSettings} onHide={() => setShowSettings(false)}>
        <CookieSettings />
      </Dialog>
    </div>
  );
};

export default CookieBanner;
