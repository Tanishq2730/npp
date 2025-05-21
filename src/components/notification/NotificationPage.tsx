import React from "react";
import "./notification.scss";

const notifications = [
  {
    id: 1,
    img: "/images/green-beans.jpg",
    title: "Green beans was ordered",
    timestamp: "2 hours ago",
    type: "order"
  },
  {
    id: 2,
    img: "/images/sugarcane.jpg",
    title: "Sugarcane uploaded has been verified",
    timestamp: "5 hours ago",
    type: "success"
  },
  {
    id: 3,
    img: "/images/sugarcane.jpg",
    title: "Sugarcane uploaded was not verified",
    timestamp: "1 day ago",
    type: "error"
  },
  {
    id: 4,
    img: "/images/green-beans.jpg",
    title: "Green beans was ordered",
    timestamp: "Just now",
    type: "order"
  },
];

const NotificationPage: React.FC = () => {
  return (
    <section className="notification-section">
      <div className="notifcationBanner">
        <img src="/static/images/notification/notification.jpg" />
      </div>
      <div className="notifications">
        <div className="container">
          <h2 className="title mt-5">Notification</h2>
          <div className="row mb-5">
            {notifications.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className={`notification-card ${item.type}`}>
                  <div className="left">
                    <div className="image-container">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="15.5"
                          cy="15.5"
                          r="15"
                          fill="white"
                          stroke="#AEAEAE"
                        />
                        <path
                          d="M15 15C13.9 15 12.9583 14.6083 12.175 13.825C11.3917 13.0417 11 12.1 11 11C11 9.9 11.3917 8.95833 12.175 8.175C12.9583 7.39167 13.9 7 15 7C16.1 7 17.0417 7.39167 17.825 8.175C18.6083 8.95833 19 9.9 19 11C19 12.1 18.6083 13.0417 17.825 13.825C17.0417 14.6083 16.1 15 15 15ZM7 21V20.2C7 19.6333 7.146 19.1127 7.438 18.638C7.73 18.1633 8.11733 17.8007 8.6 17.55C9.63333 17.0333 10.6833 16.646 11.75 16.388C12.8167 16.13 13.9 16.0007 15 16C16.1 15.9993 17.1833 16.1287 18.25 16.388C19.3167 16.6473 20.3667 17.0347 21.4 17.55C21.8833 17.8 22.271 18.1627 22.563 18.638C22.855 19.1133 23.0007 19.634 23 20.2V21C23 21.55 22.8043 22.021 22.413 22.413C22.0217 22.805 21.5507 23.0007 21 23H9C8.45 23 7.97933 22.8043 7.588 22.413C7.19667 22.0217 7.00067 21.5507 7 21Z"
                          fill="#CFA505"
                        />
                      </svg>
                    </div>
                    <div className="text-content">
                      <p className="title-text">{item.title}</p>
                      <span className="timestamp">{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
