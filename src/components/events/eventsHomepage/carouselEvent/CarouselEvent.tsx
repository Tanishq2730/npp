import "swiper/css";
import "swiper/css/pagination";

import { client } from "app/lib/sanity";
import * as React from "react";
import { useEffect, useState } from "react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./CarouselEvent.module.scss";
import DynamicCarousel from "./carouselSlide/CarouselSlide";

interface SocialLink {
  url: string;
  icon: "facebook" | "twitter" | "youtube" | "instagram";
}

interface Heading {
  prefix: string;
  highlighted: string;
  suffix: string;
}

interface CarouselItem {
  id: string;
  imageUrl: string;
  imageAlt: string;
  socialLinks: SocialLink[];
  heading: Heading;
}

const LoadingCarousel: React.FC = () => (
  <div className={styles.loadingCarousel}>
    <div className={styles.loadingOverlay} />
    <div className={styles.loadingContentContainer}>
      <div className={styles.loadingTextAndIconsContainer}>
        <div className={styles.loadingTextContainer}>
          <div className={styles.loadingHeading} />
          <div className={styles.loadingHeading} />
        </div>
        <div className={styles.loadingIconContainer}>
          <div className={styles.loadingIcon} />
          <div className={styles.loadingIcon} />
          <div className={styles.loadingIcon} />
          <div className={styles.loadingIcon} />
        </div>
      </div>
      <div className={styles.loadingButtonContainer}>
        <div className={styles.loadingButton} />
      </div>
    </div>
  </div>
);

interface CarouselProps {
  type: "event" | "pressRelease";
}

export default function Carousel({ type }: CarouselProps) {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHighlightedItems = async () => {
      const query = `
        *[_type == "${type}" && isHighlighted == true] {
          "id": _id,
          "imageUrl": highlightDetails.highlightImageUrl.asset->url,
          "imageAlt": highlightDetails.imageAlt,
          "socialLinks": socialLinks[]{
            url,
            icon
          },
          "heading": {
            "prefix": highlightDetails.heading.prefix,
            "highlighted": highlightDetails.heading.highlighted,
            "suffix": highlightDetails.heading.suffix
          },
          "type": "${type}"
        }
      `;

      try {
        const result = await client.fetch(query);
        console.log("Result", result);
        setCarouselItems(result);
      } catch (err) {
        console.error(`Error fetching highlighted ${type}s:`, err);
        setError(
          `Failed to load highlighted ${type}s. Please try again later.`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlightedItems();
  }, [type]);

  if (isLoading) {
    return <LoadingCarousel />;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${styles.carouselContainer}`}>
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: `.${styles.swiperPagination}`,
        }}
        autoplay={{ delay: 5000 }}
        className={styles.swiper}
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            <DynamicCarousel
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              socialLinks={item.socialLinks}
              heading={item.heading}
              buttonText="Learn More"
              buttonLink={
                type === "event"
                  ? `expandedEvent/?id=${item.id}`
                  : `article/?id=${item.id}`
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiperPagination} />
    </div>
  );
}
