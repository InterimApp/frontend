import React from 'react';
import './HowItWorks.css'; // Importation du fichier CSS

export default function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-header">
        <h1>Comment ça marche</h1>
        <p>Découvrez comment notre plateforme vous aide à trouver l'emploi idéal ou à recruter les meilleurs talents !</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <h3>Étape 1 : Inscription</h3>
          <p>Inscrivez-vous en tant que chercheur d'emploi ou employeur pour commencer votre aventure.</p>
        </div>
        <div className="step">
          <h3>Étape 2 : Parcourez les offres</h3>
          <p>Explorez les opportunités d'emploi disponibles ou publiez vos postes ouverts.</p>
        </div>
        <div className="step">
          <h3>Étape 3 : Connectez-vous</h3>
          <p>Contactez les candidats ou les employeurs potentiels pour discuter des opportunités.</p>
        </div>
        <div className="step">
          <h3>Étape 4 : Être embauché ou embaucher</h3>
          <p>Finalisez le processus et commencez à travailler avec votre nouvel employeur ou employé !</p>
        </div>
      </div>

      <div className="how-it-works-footer">
        <p>Prêt à commencer ? <a href="/signup1">Inscrivez-vous maintenant !</a></p>
      </div>
    </div>
  );
}
