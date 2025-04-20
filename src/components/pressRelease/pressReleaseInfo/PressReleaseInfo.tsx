import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Tabs } from "@mantine/core";
import { urlFor } from "app/lib/sanity";
import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SocialShareLinks from "@/components/shared/socialShareLinks/SocialShareLinks";
import VideoCard from "@/components/shared/videoCard/VideoCard";

import styles from "./PressReleaseInfo.module.scss";

interface PressReleaseInfoProps {
  data: {
    publishDate: string;
    title: string;
    summary: string;
    content: string;
    featuredImage: string;
    imageGallery: { image: string; id: string }[];
    videos: { url: string; id: string }[];
    socialLinks: { url: string; icon: string }[];
  };
}

const MediaGallery: React.FC<{
  images: { url: string; id: string }[];
  videos: { url: string; id: string }[];
}> = ({ images, videos }) => {
  const swiperParams = {
    modules: [Pagination],
    spaceBetween: 10,
    slidesPerView: 4,
    pagination: {
      clickable: true,
      bulletClass: `swiper-pagination-bullet ${styles.swiperPaginationBullet}`,
      bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiperPaginationBulletActive}`,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 2, spaceBetween: 10 },
      640: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 4, spaceBetween: 10 },
    },
  };

  return (
    <div className={styles.mediaGallery}>
      <Tabs
        color="yellow"
        defaultValue={images.length > 0 ? "images" : "videos"}
        className={styles.mediaGalleryTabs}
      >
        <Tabs.List>
          {images.length > 0 && <Tabs.Tab value="images">Images</Tabs.Tab>}
          {videos.length > 0 && <Tabs.Tab value="videos">Videos</Tabs.Tab>}
        </Tabs.List>

        {images.length > 0 && (
          <Tabs.Panel value="images">
            <Swiper {...swiperParams}>
              {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <Image
                    src={image.url}
                    alt="Press Release"
                    width={300}
                    height={200}
                    className={styles.galleryImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Tabs.Panel>
        )}

        {videos.length > 0 && (
          <Tabs.Panel value="videos">
            <Swiper {...swiperParams}>
              {videos.map((video) => (
                <SwiperSlide key={video.id}>
                  <VideoCard videoUrl={video.url} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Tabs.Panel>
        )}
      </Tabs>
    </div>
  );
};

const PressReleaseInfo: React.FC<PressReleaseInfoProps> = ({ data }) => {
  const {
    publishDate,
    title,
    summary,
    content,
    featuredImage,
    imageGallery,
    videos,
    socialLinks,
  } = data;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.updateContainer}>
          <div className={styles.headlineLine} />
          {/* <span className={`body ${styles.updateLabel}`}>Published on -</span> */}
          <span className={`body ${styles.updateDate}`}>{publishDate}</span>
        </div>
        <div className={styles.icons}>
          <SocialShareLinks
            links={socialLinks}
            shareUrl={currentUrl}
            shareTitle={title}
          />
        </div>
        <div className={styles.headlineLine} />
      </div>
      <div className={styles.headlineContainer}>
        <div className={styles.headlineLine} />
        <h2 className={styles.headline}>{title}</h2>
      </div>
      <div className={styles.subheadlineContainer}>
        <div className={styles.subheadlineLine} />
        <p className={`subheading-1 ${styles.body}`}>{summary}</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={urlFor(featuredImage).url()}
          alt="Press Release"
          width={600}
          height={600}
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.bodyContainer}>
        <p className={`body-1 ${styles.body}`}>{content}</p>
        <div className={styles.mediaGallery}>
          <MediaGallery
            images={
              imageGallery?.map((img) => ({
                url: urlFor(img.image).url(),
                id: img.id,
              })) || []
            }
            videos={
              videos?.map((video) => ({ url: video.url, id: video.id })) || []
            }
          />
        </div>
        <div className={styles.bodyLine} />
      </div>
    </div>
  );
};

export default PressReleaseInfo;
