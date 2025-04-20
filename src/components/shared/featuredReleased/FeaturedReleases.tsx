"use client";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import { urlFor } from "app/lib/sanity";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PressReleaseCard from "@/components/shared/pressReleaseCard/PressReleaseCard";

import styles from "./FeaturedReleases.module.scss";

interface FeaturedItem {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  featuredImage: string;
  socialLinks?: { url: string; icon: string }[];
  isHighlighted: boolean;
}

interface FeaturedProps {
  items: FeaturedItem[];
  type: "event" | "pressRelease";
  heading: string;
}

const Featured: React.FC<FeaturedProps> = ({ items, type, heading }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.featuredSection}>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
          className={styles.swiper}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              <PressReleaseCard
                id={item.id}
                heading={item.title}
                details={item.summary}
                imgPath={urlFor(item.featuredImage).url()}
                date={new Date(item.publishDate).toLocaleDateString()}
                type={type}
                socialLinks={item.socialLinks}
                isHighlighted={item.isHighlighted}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
