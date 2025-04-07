import { Card, Image } from "@mantine/core";
import React from "react";

import styles from "./VideoCard.module.scss";

interface VideoCardProps {
  videoUrl: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl }) => {
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : null;
  };

  const handleVideoClick = () => {
    const videoId = getYouTubeVideoId(videoUrl);
    if (videoId) {
      window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
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
    <Card className={styles.videoCard} padding="xs">
      <Card.Section className={styles.videoSection}>
        <div
          className={styles.videoContainer}
          onClick={handleVideoClick}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex={0}
          aria-label="Play video"
        >
          <Image
            src={getYouTubeThumbnail(videoUrl)}
            alt="Video thumbnail"
            className={styles.videoImage}
          />
          <Image
            src="/static/images/video-play.png"
            height={24}
            width={24}
            alt="Play"
            className={styles.playButton}
          />
        </div>
      </Card.Section>
    </Card>
  );
};

export default VideoCard;
