"use client";

import { Button, Card, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./PhilosophyCard.module.scss";

interface PhilosophyCardProps {
  title: string;
  description: string;
  fullDescription: string;
  imageSrc: string;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  title,
  description,
  fullDescription,
  imageSrc,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
      {!expanded ? (
        <>
          <div className={styles.imageContainer}>
            <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
          </div>
          <Text className={styles.title}>{title}</Text>
          <Text className={styles.description}>{description}</Text>
          <Button className={styles.readMore} onClick={toggleExpanded}>
            <IconArrowRight size={24} stroke={1.5} className={styles.icon} />
          </Button>
        </>
      ) : (
        <>
          <Text className={styles.expandedTitle}>{title}</Text>
          <Text className={styles.fullDescription}>{fullDescription}</Text>
          <Button className={styles.readMore} onClick={toggleExpanded}>
            <IconArrowLeft size={24} stroke={1.5} className={styles.icon} />
          </Button>
        </>
      )}
    </Card>
  );
};

export default PhilosophyCard;
