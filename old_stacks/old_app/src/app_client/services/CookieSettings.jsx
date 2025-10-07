import React, { useState } from "react";
import './cookiesettings.css';

const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const handleToggle = (category) => {
    setPreferences({ ...preferences, [category]: !preferences[category] });
  };

  const handleSave = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    alert("Vos préférences ont été enregistrées.");
  };

  return (
    <div className="cookie-settings">
      <h1>Paramètres des Cookies</h1>
      <div className="cookie-category">
        <label>
          <input
            type="checkbox"
            checked={preferences.essential}
            disabled
          />
          Cookies Essentiels (toujours activés)
        </label>
      </div>
      <div className="cookie-category">
        <label>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleToggle("analytics")}
          />
          Cookies Analytiques
        </label>
      </div>
      <div className="cookie-category">
        <label>
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => handleToggle("marketing")}
          />
          Cookies Marketing
        </label>
      </div>
      <button className="buttoncookie" onClick={handleSave}>Enregistrer les préférences</button>
    </div>
  );
};

export default CookieSettings;