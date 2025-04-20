import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import React from "react";

import ImageSlider from "@/components/shared/imageSlider/ImageSlider";

import styles from "./Details.module.scss";
import { imageUrl } from "./Slides";

interface DetailsProps {
  activeTab:
    | "agriculture"
    | "energy"
    | "education"
    | "environment"
    | "healthcare"
    | "promoting_northeast"
    | "women"
    | "youth";
}

const Details: React.FC<DetailsProps> = ({ activeTab }) => {
  const t = useTranslations(`core_issues.${activeTab}.details`);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const slideImages = imageUrl[activeTab as keyof typeof imageUrl] || [];
  

  const getContainerHeight = () => {
    if (isMobile) return 250;
    if (isTablet) return 300;
    return 380; // Default height for larger screens
  };

  return (
    <div className={styles.details}>
      <h1 className="name">{t("title")}</h1>
      <ImageSlider
        currentSlideWidth={isMobile ? 300 : 600}
        currentSlideHeight={isMobile ? 175 : 350}
        containerHeight={getContainerHeight()}
        images={slideImages}
      />
      <div className={styles["details-text"]}>
        {t("text")
          .split("###")
          .map((para) => (
            <p key={para} className="subheading-4">
              {para}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Details;
