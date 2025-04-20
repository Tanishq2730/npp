"use client";

import { LoadingOverlay, Notification } from "@mantine/core";
import { client } from "app/lib/sanity";
import React, { useCallback, useEffect, useState } from "react";

import Gallery from "../../../src/components/shared/gallery/Gallery";

interface GalleryItem {
  id: string;
  date: string;
  title: string;
  videoUrl: string;
  type: string;
  duration: string;
}

const ITEMS_PER_PAGE = 12;

export default function VideoGallery() {
  const [videoGalleryItems, setVideoGalleryItems] = useState<GalleryItem[]>([]);
  const [videoCategories, setVideoCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchVideoGallery = useCallback(
    async (category: string, page: number, search: string) => {
      const query = `
      *[_type == "videoGallery" ${category !== "All" ? `&& category == "${category}"` : ""}] {
        category,
        "items": items[${search ? `title match "*${search}*"` : ``}] {
          "id": _key,
          title,
          "date": date,
          videoUrl,
          duration
        }
      }
    `;

      try {
        setIsLoading(true);
        const result = await client.fetch(query);

        const allItems: GalleryItem[] = result.flatMap((gallery: any) =>
          gallery.items.map((item: any) => ({
            ...item,
            type: gallery.category,
          })),
        );

        // Apply pagination after flattening
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const paginatedItems = allItems.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE,
        );

        if (page === 1) {
          setVideoGalleryItems(paginatedItems);
        } else {
          setVideoGalleryItems((prev) => [...prev, ...paginatedItems]);
        }

        setHasMore(allItems.length > startIndex + ITEMS_PER_PAGE);
        setError(null);
      } catch (err) {
        setError("Failed to load video gallery. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    const query = `
      *[_type == "videoGallery"] {
        category
      }
    `;

    try {
      const result = await client.fetch<Array<{ category: string }>>(query);
      const fetchedCategories = result.map((item) => item.category);

      // Ensure we're working with strings and filter out any non-string values
      const validCategories = fetchedCategories.filter(
        (category): category is string =>
          typeof category === "string" && category.trim() !== "",
      );

      // Add 'All' category and remove duplicates
      const uniqueCategories = ["All", ...new Set(validCategories)];

      setVideoCategories(uniqueCategories);
    } catch (err) {
      setError("Failed to fetch video categories. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchVideoGallery("All", 1, "");
  }, [fetchVideoGallery, fetchCategories]);

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      if (category) {
        setActiveCategory(category);
        setCurrentCategory(category);
        setCurrentPage(1);
        fetchVideoGallery(category, 1, searchTerm);
      }
    },
    [fetchVideoGallery, searchTerm],
  );

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchVideoGallery(currentCategory, nextPage, searchTerm);
  }, [currentPage, currentCategory, fetchVideoGallery, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
      fetchVideoGallery(currentCategory, 1, term);
    },
    [fetchVideoGallery, currentCategory],
  );

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ size: "lg", color: "yellow", type: "bars" }}
      />
      {error && (
        <Notification color="red" title="Error" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}
      <Gallery
        title="Video Gallery"
        items={videoGalleryItems}
        galleryType="video"
        categories={videoCategories}
        onCategoryChange={handleCategoryChange}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        onSearch={handleSearch}
        activeCategory={activeCategory}
      />
    </div>
  );
}
