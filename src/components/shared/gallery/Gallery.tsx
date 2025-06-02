"use client";

import { Button, Center, Grid, Group, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

import styles from "./Gallery.module.scss";
import GalleryCard from "./galleryCard/GalleryCard";
import GalleryTabs from "./galleryTabs/GalleryTabs";
import ImageDetails from "@/components/events/expandedEvents/eventImage/ImageDetails";
// import Imagepopup from "@/components/events/expandedEvents/eventImage/Imagepopup";






// Define the GalleryItem interface
interface GalleryItem {
  id: string;
  date: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  type: string;
  duration?: string;
}

interface GalleryProps {
  title: string;
  items: GalleryItem[];
  galleryType: "photo" | "video";
  categories: string[];
  onCategoryChange: (category: string | null) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  onSearch: (term: string) => void;
  activeCategory: string;
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  items,
  galleryType,
  categories,
  onCategoryChange,
  onLoadMore,
  hasMore,
  onSearch,
  activeCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popuptitle, setPopuptitle] = useState("Beautiful Landscape");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Filter only items with images
  const imageItems = items.filter(item => item.imageUrl);
  const allImages = imageItems.map(item => item.imageUrl || '');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    onSearch(event.currentTarget.value);
  };

  const handleClick = (item: GalleryItem) => {
    const index = imageItems.findIndex(i => i.id === item.id);
    setSelectedImageIndex(index);
    setIsOpen(true);
    setPopuptitle(item.title);
  };
  return (
    <div className={styles.gallery}>
      
      
      <Group
        justify="space-between"
        align="center"
        mb="sm"
        className={styles.header}
        wrap="nowrap"
      >
        <Text size="xl" fw={400} className={styles.headerText}>
          {title}
        </Text>
        <Group className={styles.searchGroup} align="stretch" w="100%">
          <TextInput
            placeholder="Search By Title"
            leftSection={<IconSearch size="1rem" />}
            value={searchTerm}
            onChange={handleSearchChange}
            classNames={{ input: styles.searchInput, root: styles.searchRoot }}
          />
        </Group>
      </Group>
      <div className={styles.display}>
        <div className="md:container-fluid md:mx-auto">
          <GalleryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
          {items.length > 0 ? (
            <Grid gutter={{ base: 24, xs: "md", md: "xl", xl: 30 }}>
              {items.map((item) => (
                <Grid.Col 
                  key={item.id} 
                  span={{ base: 12, sm: 6, md: 3 }}
                  onClick={() => {handleClick(item)}}
                  style={{ cursor: 'pointer' }}
                >
                  <GalleryCard item={item} galleryType={galleryType} />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Center style={{ height: "200px" }}>
              <Text size="xl" color="dimmed">
                No {galleryType === "photo" ? "photos" : "videos"} available
              </Text>
            </Center>
          )}
          {hasMore && items.length > 0 && (
            <Center mt="xl">
              <Button
                onClick={onLoadMore}
                className={styles.loadMoreButton}
                fullWidth
              >
                LOAD MORE {galleryType === "photo" ? "PHOTOS" : "VIDEOS"}
              </Button>
            </Center>
          )}
        </div>
      </div>
      <ImageDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={popuptitle}
        imgUrl={allImages[selectedImageIndex] || ''}
        images={allImages}
        initialSlide={selectedImageIndex}
      />
    </div>
  );
};

export default Gallery;
