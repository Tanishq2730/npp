import React, { useState } from "react";

import CarouselEvent from "./carouselEvent/CarouselEvent";
import EventSearch from "./eventSearch/EventSearch";
import styles from "./EventsHomepage.module.scss";
import RecentItems from "./recentItems/RecentItems";


type EventsHomepageProps = {
  type: "event" | "pressRelease";
};

const titles = {
  event: {
    mainTitle: "CAPTURING OUR JOURNEY",
    subTitle: "GALLERY",
    description:
      "This page is a visual chronicle of the milestones and achievements of the National People's Party. Here, you'll find albums showcasing our key events, initiatives, and the vibrant diversity of our communities. From leadership engagements and developmental projects to cultural celebrations and grassroots movements, these images tell the story of our commitment to progress and unity.",
    title: "RECENT EVENTS",
    subtitle:
      "Highlights and Updates from NPP's Latest Activities and Initiatives",
  },
  pressRelease: {
    mainTitle: "PRESS RELEASES",
    subTitle: "NEWS",
    description:
      "Stay informed with the latest press releases from the National People's Party. This page provides timely updates on our party's positions, announcements, and responses to current affairs. From policy statements to public addresses, find all our official communications here.",
    title: "LATEST PRESS RELEASES",
    subtitle: "STAY INFORMED",
  },
};

export default function EventsHomepage({ type }: EventsHomepageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return (
    <div className={`md:container md:mx-auto ${styles.events}`}>
  
      <CarouselEvent type={type} />
      <EventSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
        titles={titles[type]}
      />
      <div className={styles.card}>
        <RecentItems
          type={type}
          searchTerm={searchTerm}
          dateRange={dateRange}
          title={titles[type].title}
          subtitle={titles[type].subtitle}
        />
      </div>
    </div>
  );
}
