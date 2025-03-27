import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup, Badge, Button } from "react-bootstrap";
import CCNavBar from "./CCNavBar";
import { FaBell } from "react-icons/fa";
import "./CCNot.css"; 

const notificationsInitiales = [
  {
    id: 1,
    message: "Liste finale des candidats reçue pour examen",
    time: "Il y a 2 minutes",
    type: "info",
  },
  {
    id: 2,
    message: "Contrat signé et prêt à être traité",
    time: "Il y a 10 minutes",
    type: "success",
  },
  {
    id: 3,
    message: "Annonce de recrutement approuvée par l'administrateur et publiée",
    time: "Il y a 1 heure",
    type: "success",
  },
  {
    id: 4,
    message: "Nouvelle candidature reçue pour l'emploi posté",
    time: "Il y a 3 heures",
    type: "info",
  },
  {
    id: 5,
    message: "Documentation d'intégration en attente pour le nouvel employé",
    time: "Hier",
    type: "warning",
  },
  {
    id: 6,
    message: "Offre d'emploi envoyée au candidat, en attente de réponse",
    time: "Hier",
    type: "info",
  },
];

const CCNot = () => {
  const [notifications, setNotifications] = useState(notificationsInitiales);
  const [notificationsLues, setNotificationsLues] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const marquerCommeLu = (id) => {
    setNotificationsLues((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <CCNavBar />
      <Container className="cc-notifications-container" style={{ marginTop: "170px" }}>
        <h2 className="cc-notification-title">
          Notifications de l'entreprise cliente <FaBell />
        </h2>
        <ListGroup>
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              className={`d-flex justify-content-between align-items-center cc-notification-item cc-notification-${notification.type} ${
                notificationsLues[notification.id] ? "cc-notification-read" : ""
              }`}
            >
              <div>
                <div className="cc-notification-message">
                  {notification.message}
                </div>
                <Badge bg="secondary" className="cc-notification-time">
                  {notification.time}
                </Badge>
              </div>
              {!notificationsLues[notification.id] && (
                <Button
                  size="sm"
                  className="cc-read-btn ms-auto"
                  onClick={() => marquerCommeLu(notification.id)}
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

export default CCNot;
