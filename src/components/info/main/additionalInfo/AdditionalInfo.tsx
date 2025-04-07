import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./AdditionalInfo.module.scss";

interface AdditionalInfoProps {
  data: string[];
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ data }) => {
  const additionalParagraphs = data;

  // Generate a unique key based on content and index
  const generateKey = (content: string, index: number) => `${content}-${index}`;

  const desktopSlides = [];
  for (let i = 0; i < additionalParagraphs.length; i += 2) {
    const firstParagraph = additionalParagraphs[i];
    const secondParagraph = additionalParagraphs[i + 1];
    if (firstParagraph) {
      desktopSlides.push(
        <SwiperSlide key={generateKey(firstParagraph, i)}>
          <div className={styles.slideContent}>
            <div className={styles.paragraph}>
              <p>{firstParagraph}</p>
            </div>
            {secondParagraph && (
              <div className={styles.paragraph}>
                <p>{secondParagraph}</p>
              </div>
            )}
          </div>
        </SwiperSlide>,
      );
    }
  }

  return (
    <div className={styles.additionalInfo}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className={styles.desktopSwiper}
      >
        {desktopSlides}
      </Swiper>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        className={styles.mobileSwiper}
      >
        {additionalParagraphs.map(
          (paragraph, index) =>
            paragraph && (
              <SwiperSlide key={generateKey(paragraph, index)}>
                <div className={styles.slideContent}>
                  <div className={styles.paragraph}>
                    <p>{paragraph}</p>
                  </div>
                </div>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
};

export default AdditionalInfo;
