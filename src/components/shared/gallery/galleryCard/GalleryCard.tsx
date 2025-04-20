import { Box, Card, Image, Text } from "@mantine/core";
import React from "react";

import styles from "./GalleryCard.module.scss";

interface GalleryCardProps {
  item: {
    date: string;
    title: string;
    imageUrl?: string;
    videoUrl?: string;
    duration?: string;
  };
  galleryType: "photo" | "video";
}

const limitCharacters = (str: string, limit: number): string => {
  if (str.length <= limit) return str;
  return `${str.slice(0, limit - 3)}...`;
};

const GalleryCard: React.FC<GalleryCardProps> = ({ item, galleryType }) => {
  const limitedTitle = limitCharacters(item.title, 50);

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : null;
  };

  const handleVideoClick = () => {
    if (item.videoUrl) {
      const videoId = getYouTubeVideoId(item.videoUrl);
      if (videoId) {
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleVideoClick();
    }
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";
  };

  return (
    <Card className={styles.galleryCard} padding="xs">
      <Card.Section
        className={
          galleryType === "video" ? styles.videoSection : styles.photoSection
        }
      >
        {galleryType === "photo" && item.imageUrl && (
          <Image
            src={item.imageUrl}
            height={200}
            alt={item.title}
            className={styles.photoImage}
          />
        )}
        {galleryType === "video" && item.videoUrl && (
          <div
            className={styles.videoContainer}
            onClick={handleVideoClick}
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${item.title}`}
          >
            <Image
              src={getYouTubeThumbnail(item.videoUrl)}
              alt={item.title}
              className={styles.videoImage}
            />
            <Image
              src="/static/images/video-play.png"
              height={24}
              width={24}
              alt="Play"
              className={styles.playButton}
            />
            {item.duration && (
              <div className={styles.duration}>{item.duration}</div>
            )}
          </div>
        )}
      </Card.Section>
      <Box className={styles.cardContent}>
        <Text size="sm" className={styles.date}>
          {item.date}
        </Text>
        <Text size="md" className={styles.title} title={item.title}>
          {limitedTitle}
        </Text>
      </Box>
    </Card>
  );
};

export default GalleryCard;
