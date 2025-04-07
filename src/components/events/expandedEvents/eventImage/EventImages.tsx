import { SimpleGrid } from "@mantine/core";
import Image from "next/image";
import React from "react";

import VideoCard from "@/components/shared/videoCard/VideoCard";

import styles from "./EventImages.module.scss";

export interface ImageDataTypes {
  id: string;
  link: string;
}
interface ImageGridProps {
  activeTab: string;
  images: ImageDataTypes[];
  videos: ImageDataTypes[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ activeTab, images, videos }) => {
  const renderContent = () => {
    if (activeTab === "images") {
      return (
        <SimpleGrid cols={4} spacing="lg" className={styles.grid}>
          {images.map((image) => (
            <div key={image.id} className={styles.gridItem}>
              <Image
                src={image.link}
                alt="image"
                layout="responsive"
                width={300}
                height={200}
                className={styles.image}
              />
            </div>
          ))}
        </SimpleGrid>
      );
    }
    if (activeTab === "video") {
      return (
        <SimpleGrid cols={4} spacing="sm" className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.gridItem}>
              <VideoCard videoUrl={video.link} />
            </div>
          ))}
        </SimpleGrid>
      );
    }
    return null;
  };

  return <div>{renderContent()}</div>;
};

export default ImageGrid;
