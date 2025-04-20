import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "./card/Card";
import styles from "./GenericCardSlider.module.scss";

interface CardProp {
  title: string;
  backgroundImgPath: string;
  subtitle?: string;
  route: string;
}

interface GenericCardSliderProps {
  cards: CardProp[];
}

const GenericCardSlider: React.FC<GenericCardSliderProps> = ({ cards }) => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        className={styles.mySwiper}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.title} className={styles.swiperSlide}>
            <div className={styles.cardWrapper}>
              <Card
                title={card.title}
                backgroundImgPath={card.backgroundImgPath}
                subtitle={card.subtitle}
                route={card.route}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenericCardSlider;
