// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";

import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Timeline.module.scss";
import TimelineCard from "./timelineCard/TimelineCard";

interface TimelineEvent {
  year: string;
  titleLight: string;
  titleBold: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageSrc: string;
}

interface TimelineProps {
  headerTitle: string;
  headerDescription: string;
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({
  headerTitle,
  headerDescription,
  events,
}) => {
  // Generate a unique key for each event
  const generateKey = (event: TimelineEvent) =>
    `${event.year}-${event.titleBold}`;

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>{headerTitle}</h1>
        <p className={styles.headerDescription}>{headerDescription}</p>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        className={styles.swiper}
      >
        {events.map((event) => (
          <SwiperSlide key={generateKey(event)}>
            <TimelineCard {...event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Timeline;
