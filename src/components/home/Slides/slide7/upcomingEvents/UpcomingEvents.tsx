import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "./card/Card";
import styles from "./UpcomingEvents.module.scss"; // Adjust the import path based on your setup
import { client } from "app/lib/sanity";

interface Event {
  title: string;
  date: string;
  description: string;
}

export default function UpcomingEvents() {
  const t = useTranslations("home.slide7");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `
        *[_type == "event" && date >= dateTime(now()) - 2592000000] | order(date asc) {
          "title": title["en"], // Replace "en" with your base language
          date,
          "description": description["en"] // Replace "en" with your base language
        }
      `;
        const data: Event[] = await client.fetch(query);
        console.log("Fetched Events:", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles["upcoming-events"]}>
      <div className={`body-1 ${styles.title}`}>{t("upcoming.heading")}</div>
      <div className={styles["card-container"]}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <Card key={index} title={event.title} date={event.date} description={event.description} />
          ))
        ) : (
          <div>{t("upcoming.noEvents")}</div>
        )}
      </div>
    </div>
  );
}
