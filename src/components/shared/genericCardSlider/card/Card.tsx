import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subtitle?: string;
  backgroundImgPath: string;
  route: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle = "",
  backgroundImgPath,
  route,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const cardWidth = e.currentTarget.clientWidth;
    const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    setIsHovered(mouseX < cardWidth / 2);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(route);
  };

  return (
    <motion.div
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundImage: `url(${backgroundImgPath})` }}
      id={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`${styles["card-overlay"]} ${isHovered ? styles["card-overlay-hover"] : ""}`}
        animate={{
          width: isHovered ? "50%" : "0%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className={styles.content}>
        <motion.h1
          className={styles.cardTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title.split(" ").map((word) => (
            <span key={word} className={styles.word}>
              {word}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={`subheading-5 ${styles.cardSubtitle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            variant="outline"
            color="white"
            className={styles.button}
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
