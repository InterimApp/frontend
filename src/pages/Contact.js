import React from "react";
import "./Contact.css";
import Director1 from "../assets/MrMohamedMejri.png";
import Director2 from "../assets/Director2.png";
import Director3 from "../assets/Director3.png";
import Director4 from "../assets/Director4.png"; 
import Director5 from "../assets/Director5.png"; 

const agencies = [
  {
    name: "Agence Tunis",
    representative: "Mejri Mohamed",
    title: "Responsable Solutions Flexibilité",
    address: "9, Avenue Kheireddine Pacha 1002 Tunis",
    phone: "216 71 909 380/040",
    fax: "+216 71 909 001",
    email: "mohamed.mejri@manpower-tunisie.com",
    image: Director1,
  },
  {
    name: "Agence Nord",
    representative: "Jomni Halima",
    title: "Responsable Agence Nord",
    address: "Immeuble l’Horloge Ibn Khaldoun N°302 7000 Bizerte",
    phone: "+216 72 433 460/260/103",
    fax: "+216 72 433 703",
    email: "halima.jomni@manpower-tunisie.com",
    image: Director2,
  },
  {
    name: "Agence Manpower Professional",
    representative: "Guetat Moez",
    title: "Responsable Activité Recrutement",
    address: "Immeuble Kaffel, rue du lac Lochness Les Berges du Lac 1053 Tunis",
    phone: "+216 71 656 230 / +216 71 656 188",
    fax: "+216 71 656 053",
    email: "moez.guetat@manpower-tunisie.com",
    image: Director3,
  },
  {
    name: "Agence ManpowerGroup Solutions",
    representative: "Kochbati Inès",
    title: "Responsable Assessment Center et Solutions RH",
    address: "Immeuble Kaffel, rue du lac Lochness Les Berges du Lac 1053 Tunis",
    phone: "+216 71 656 230 / +216 71 656 188",
    fax: "+216 71 656 053",
    email: "ines.Kochbati@manpower-tunisie.com",
    image: Director4,
  },
  {
    name: "Le Siège",
    representative: "El Aich Chirine",
    title: "Chief Executive Officer",
    address: "Immeuble Kaffel, rue du lac Lochness Les Berges du Lac 1053 Tunis",
    phone: "+216 71 656 371",
    fax: "",
    email: "chirine.elaich@manpower-tunisie.com",
    image: Director5,
  },
];

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Nos Agences</h1>
      <div className="agency-list">
        {agencies.map((agency, index) => (
          <div key={index} className="agency-card">
            <h2>{agency.name}</h2>
            <div className="agency-details">
              <img src={agency.image} alt={`Agence ${agency.name}`} />
              <div className="agency-info">
                <p><strong>Représentant :</strong> {agency.representative}</p>
                <p><strong>Titre :</strong> {agency.title}</p>
                <p><strong>Adresse :</strong> {agency.address}</p>
                <p><strong>Téléphone :</strong> {agency.phone}</p>
                <p><strong>Fax :</strong> {agency.fax}</p>
                <p><strong>Email :</strong> <a href={`mailto:${agency.email}`}>{agency.email}</a></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google Map Embedding */}
      <div className="google-map-container">
        <h2>Nous Trouver Sur la Carte</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12775.964602121901!2d10.165655210539132!3d36.81873197426944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd353386d55f9f%3A0xf7d1ce2eb3e30bfb!2sManpower!5e0!3m2!1sfr!2stn!4v1739042972904!5m2!1sfr!2stn"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
