import { AnimatePresence, motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import React from "react";

import type { YearType } from "../const/contentData";
import styles from "./Timeline.module.scss";

interface TimelineProps {
  handleYearClick: (year: YearType) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>, year: YearType) => void;
  activeYear: YearType;
  isVisible: boolean;
}

const timelineList = [
  "default",
  "2013",
  "2014",
  "2016",
  "2018",
  "2019",
  "2023",
  "2024",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Timeline: React.FC<TimelineProps> = ({
  handleYearClick,
  handleKeyDown,
  activeYear,
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {(timelineList as YearType[]).map((year, index) => (
            <motion.div
              key={year}
              className={styles.timelineYearItem}
              variants={itemVariants}
            >
              {index !== 0 && (
                <div>
                  <hr />
                  <hr />
                  <hr />
                </div>
              )}
              <div
                className={
                  activeYear === year
                    ? `${styles.timelineItem} ${styles.active}`
                    : styles.timelineItem
                }
                onClick={() => handleYearClick(year)}
                onKeyDown={(event) => handleKeyDown(event, year)}
                role="button"
                tabIndex={0}
              >
                <svg width="20%" height="3">
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke={activeYear === year ? "#e6b800" : "#ccc"}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <h5 className={styles.timelineYear}>
                  {year === "default" ? "P.A Sangma" : year}
                </h5>
              </div>
            </motion.div>
          ))}
          <div className={styles.politicianImage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Timeline;
