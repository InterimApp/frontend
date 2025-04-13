import React, { useEffect, useState } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import IWNavBar from "./IWNavBar";
import { FaBell, FaCheck } from "react-icons/fa";
import "./IWNot.css";

const initialNotifications = [
  {
    id: 1,
    title: "Nouveau contrat disponible",
    message: "Un nouveau contrat est disponible pour votre signature. Veuillez vérifier vos documents.",
    time: "Il y a 2 minutes",
    type: "info",
    unread: true
  },
  {
    id: 2,
    title: "Paiement reçu",
    message: "Votre paiement pour la mission du 15/05/2023 a été traité.",
    time: "Il y a 10 minutes",
    type: "success",
    unread: true
  },
  {
    id: 3,
    title: "Documents en attente",
    message: "Certains documents nécessitent votre attention pour compléter votre profil.",
    time: "Il y a 1 heure",
    type: "warning",
    unread: false
  },
  {
    id: 4,
    title: "Nouvelle opportunité",
    message: "Une nouvelle mission correspondant à votre profil a été publiée.",
    time: "Il y a 3 heures",
    type: "info",
    unread: false
  },
  {
    id: 5,
    title: "Mise à jour requise",
    message: "Votre profil nécessite une mise à jour pour continuer à recevoir des missions.",
    time: "Hier",
    type: "danger",
    unread: true
  },
];

const CCNot = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, unread: false} : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({...notification, unread: false})
    ));
  };

  return (
    <div className="iw-notifications">
      <IWNavBar />
      
      <div className="iw-content">
        <Container className="iw-not-container">
          <div className="iw-not-header">
            <h1 className="iw-section-title">
              <FaBell className="iw-not-icon" /> Notifications
            </h1>
            <Button 
              variant="outline-primary" 
              className="iw-mark-all-btn"
              onClick={markAllAsRead}
            >
              <FaCheck /> Tout marquer comme lu
            </Button>
          </div>

          <div className="iw-notifications-list">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`iw-not-card ${notification.unread ? 'unread' : ''} ${notification.type}`}
              >
                <Card.Body>
                  <div className="iw-not-badge">
                    <Badge pill bg={getBadgeVariant(notification.type)}>
                      {getTypeLabel(notification.type)}
                    </Badge>
                  </div>
                  <Card.Title className="iw-not-title">
                    {notification.title}
                    {notification.unread && <span className="iw-unread-dot"></span>}
                  </Card.Title>
                  <Card.Text className="iw-not-message">
                    {notification.message}
                  </Card.Text>
                  <div className="iw-not-footer">
                    <span className="iw-not-time">{notification.time}</span>
                    {notification.unread && (
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        className="iw-read-btn"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Marquer comme lu
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

// Helper functions
const getBadgeVariant = (type) => {
  switch(type) {
    case 'success': return 'success';
    case 'warning': return 'warning';
    case 'danger': return 'danger';
    default: return 'info';
  }
};

const getTypeLabel = (type) => {
  switch(type) {
    case 'success': return 'Succès';
    case 'warning': return 'Attention';
    case 'danger': return 'Important';
    default: return 'Information';
  }
};

export default CCNot;