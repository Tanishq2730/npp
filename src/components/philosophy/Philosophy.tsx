"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Button, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import NationalIdentityBanner from "./nationalIdentityBanner/NationalIdentityBanner";
import styles from "./Philosophy.module.scss";
import PhilosophyCard from "./philosophyCard/PhilosophyCard";

const philosophyData = [
  {
    id: 1,
    title: "Equality and Opportunity",
    description:
      "This heading captures the essence of providing education, employment, and empowerment for all sections of society.",
    imageSrc: "/static/images/info/about.png",
    fullDescription:
      "This heading captures the essence of providing education, employment, and empowerment for all sections of society.",
  },
  {
    id: 2,
    title: "Inclusive Growth",
    description:
      "This emphasizes NPP commitment to uplifting disadvantaged groups like STs, SCs, women, and OBCs, leading to a more equitable society.",
    imageSrc: "/static/images/info/about.png",
    fullDescription:
      "This heading captures the essence of providing education, employment, and empowerment for all sections of society.",
  },
  {
    id: 3,
    title: "National Unity and Strength",
    description:
      "This heading combines the ideas of maintaining India unity and promoting nationalism, highlighting the importance of a strong and unified nation.",
    imageSrc: "/static/images/info/about.png",
    fullDescription:
      "This heading captures the essence of providing education, employment, and empowerment for all sections of society.",
  },
  {
    id: 4,
    title: "National Unity and Strength 2",
    description:
      "This heading combines the ideas of maintaining India unity and promoting nationalism, highlighting the importance of a strong and unified nation.",
    imageSrc: "/static/images/info/about.png",
    fullDescription:
      "This heading captures the essence of providing education, employment, and empowerment for all sections of society.",
  },
];

const Philosophy: React.FC = () => {
  const router = useRouter();

  const handleKeyMemberClick = () => {
    router.push("/en-US/party/leadership");
  };

  return (
    <div className="bg-[#f3f1e9] pb-2 md:container md:mx-auto">
      <div className={` ${styles.philosophySection}`}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerContentMain}>
              <Title order={1} className={styles.title}>
                OUR PHILOSOPHY
              </Title>
              <Text className={styles.subtitle}>
                FOUNDATIONAL PRINCIPLES AND CORE PHILOSOPHY
              </Text>
            </div>
            <Button
              className={styles.keyMemberIcon}
              onClick={handleKeyMemberClick}
              leftSection={<IconArrowRight size={46} />}
              variant="default"
            >
              KEY MEMBER
            </Button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
          >
            {philosophyData.map((item) => (
              <SwiperSlide key={item.id}>
                <PhilosophyCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <NationalIdentityBanner />
    </div>
  );
};

export default Philosophy;
