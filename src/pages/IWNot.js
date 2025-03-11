import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup, Badge, Button } from "react-bootstrap";
import IWNavBar from "./IWNavBar";
import { FaBell } from "react-icons/fa";
import "./IWNot.css";  

const initialNotifications = [
  {
    id: 1,
    message: "Nouveau contrat disponible pour signature",
    time: "Il y a 2 minutes",
    type: "info",
  },
  {
    id: 2,
    message: "Paiement à venir reçu",
    time: "Il y a 10 minutes",
    type: "success",
  },
  {
    id: 3,
    message: "Vérification de document en attente",
    time: "Il y a 1 heure",
    type: "warning",
  },
  {
    id: 4,
    message: "Nouvelle opportunité d'emploi publiée",
    time: "Il y a 3 heures",
    type: "info",
  },
  {
    id: 5,
    message: "Mise à jour de profil requise",
    time: "Hier",
    type: "danger",
  },
];

const IWNot = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [readNotifications, setReadNotifications] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const markAsRead = (id) => {
    setReadNotifications((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <IWNavBar />
      <Container className="iw-notifications-container" style={{ marginTop: "170px" }}>
        <h2 className="iw-notification-title">
          Notifications des travailleurs intérimaires <FaBell />
        </h2>
        <ListGroup>
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              className={`d-flex justify-content-between align-items-center iw-notification-item iw-notification-${notification.type} ${
                readNotifications[notification.id] ? "iw-notification-read" : ""
              }`}
            >
              <div>
                <div className="iw-notification-message">
                  {notification.message}
                </div>
                <Badge bg="secondary" className="iw-notification-time">
                  {notification.time}
                </Badge>
              </div>
              {!readNotifications[notification.id] && (
                <Button
                  size="sm"
                  className="iw-read-btn ms-auto"
                  onClick={() => markAsRead(notification.id)}
                >
                  Marquer comme lu
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default IWNot;
