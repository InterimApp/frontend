import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup, Badge, Button } from "react-bootstrap";
import AdminNavBar from "./AdminNavBar"; 
import { FaBell } from "react-icons/fa";
import "./AdminNot.css";

const initialNotifications = [
  { id: 1, message: "New user registered", time: "2 mins ago", type: "success" },
  { id: 2, message: "Payment received", time: "10 mins ago", type: "info" },
  { id: 3, message: "Contract approved", time: "1 hour ago", type: "success" },
  { id: 4, message: "Pending document verification", time: "3 hours ago", type: "warning" },
  { id: 5, message: "System maintenance scheduled", time: "Yesterday", type: "danger" },
];

const AdminNot = () => {
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
      <AdminNavBar />
      <Container className="admin-notifications-container" style={{ marginTop: "170px" }}>
        <h2 className="notification-title">
          Notifications <FaBell />
        </h2>
        <ListGroup>
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              className={`d-flex justify-content-between align-items-center notification-item notification-${notification.type} ${
                readNotifications[notification.id] ? "notification-read" : ""
              }`}
            >
              <div>
                <div className="notification-message">{notification.message}</div>
                <Badge bg="secondary" className="notification-time">
                  {notification.time}
                </Badge>
              </div>
              {!readNotifications[notification.id] && (
                <Button
                  size="sm"
                  className="read-btn ms-auto"
                  onClick={() => markAsRead(notification.id)}
                >
                  Read
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default AdminNot;
