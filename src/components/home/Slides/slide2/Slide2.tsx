import React, { useEffect, useState } from "react";
// import { Button } from "@mantine/core";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { useRouter, useParams } from "next/navigation";
import type { KeyboardEvent } from "react";

import type { ContentData, YearType } from "./const/contentData";
import { useContentData } from "./const/contentData";
import Timeline from "./timeline/Timeline";
import styles from "./Slide2.module.scss";

interface Slide2Props {
  isVisible: boolean;
}

const Slide2: React.FC<Slide2Props> = ({ isVisible }) => {
  // const t = useTranslations();
  const contentData = useContentData();
  const [content, setContent] = useState<ContentData>(contentData.default);
  const [activeYear, setActiveYear] = useState<YearType>("default");

  const controls = useAnimation();
  const timelineControls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();
  // const router = useRouter();
  // const params = useParams();
  // const locale = params.locale as string;

  // const handleRedirect = () => {
  //   router.push(`/${locale}/party/leadership?year=${activeYear}`);
  // };

  useEffect(() => {
    const animateVisibility = (visible: boolean) => {
      const animationProps = visible
        ? { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
        : { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } };

      controls.start(animationProps);
      timelineControls.start(
        visible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 },
      );
      imageControls.start(
        visible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
      );
      textControls.start(
        visible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 },
      );
    };

    animateVisibility(isVisible);
  }, [isVisible, controls, timelineControls, imageControls, textControls]);

  const handleYearClick = (year: YearType) => {
    setActiveYear(year);
    setContent(contentData[year] || contentData.default);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    year: YearType,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleYearClick(year);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.slide2}
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* Background Image */}
          <Image
            src={content.backgroundImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />

          {/* Timeline Section */}
          <motion.div
            className={styles.timelineContainer}
            initial={{ x: -50, opacity: 0 }}
            animate={timelineControls}
            exit={{ x: -50, opacity: 0 }}
          >
            <Timeline
              handleYearClick={handleYearClick}
              handleKeyDown={handleKeyDown}
              activeYear={activeYear}
              isVisible={isVisible}
            />

            {/* Politician Image */}
            <motion.div
              className={styles.politicianImage}
              initial={{ y: 50, opacity: 0 }}
              animate={imageControls}
              exit={{ y: 50, opacity: 0 }}
            >
              <Image
                src="/static/images/home/home2/politician.png"
                alt="Politician"
                layout="fill"
                objectFit="contain"
                 objectPosition="bottom"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div> 

          {/* Text Content Section */}
          <motion.div
            className={styles.textContent}
            initial={{ x: 50, opacity: 0 }}
            animate={textControls}
            exit={{ x: 50, opacity: 0 }}
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {content.contentText.title}
            </motion.h1>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              {content.contentText.subtitle}
            </motion.h2>
            <motion.p
              className="subheading-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {content.contentText.description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              {/* <Button
                variant="outline"
                color="white"
                classNames={{ root: styles.knowMoreButton }}
                component={motion.button}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#e6b800",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRedirect}
              >
                {t("home.slide2.knowMore")}
              </Button> */}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Slide2;
