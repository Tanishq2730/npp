
import Image from "next/image";
import React from "react";

import styles from "./TimelineCard.module.scss";

interface TimelineCardProps {
  year: string;
  titleLight: string;
  titleBold: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageSrc: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  year,
  titleLight,
  titleBold,
  subtitle,
  description,

  imageSrc,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.yearBadge}>{year}</div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={`${titleLight} ${titleBold}`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            <span className={styles.light}>{titleLight}</span>{" "}
            <span className={styles.bold}>{titleBold}</span>
          </h2>
          <h3 className={styles.subtitle}>{subtitle}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.buttonWrapper}>
          {/* <Button className={styles.button} variant="filled" color="orange">
            {buttonText}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
