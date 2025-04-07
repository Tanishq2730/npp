"use client";

import { LoadingOverlay, Notification } from "@mantine/core";
import { client } from "app/lib/sanity";
import React, { useCallback, useEffect, useState } from "react";

import Gallery from "../../../src/components/shared/gallery/Gallery";

interface GalleryItem {
  id: string;
  date: string;
  title: string;
  imageUrl: string;
  type: string;
}

const ITEMS_PER_PAGE = 12;

export default function PhotoGallery() {
  const [photoGalleryItems, setPhotoGalleryItems] = useState<GalleryItem[]>([]);
  const [photoCategories, setPhotoCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchPhotoGallery = useCallback(
    async (category: string, page: number, search: string) => {
      const query = `
      *[_type == "photoGallery" ${category !== "All" ? `&& category == "${category}"` : ""}] {
        category,
        "items": items[${search ? `title match "*${search}*"` : ``}] {
          "id": _key,
          title,
          "date": date,
          "imageUrl": image.asset->url
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
          setPhotoGalleryItems(paginatedItems);
        } else {
          setPhotoGalleryItems((prev) => [...prev, ...paginatedItems]);
        }

        setHasMore(allItems.length > startIndex + ITEMS_PER_PAGE);
        setError(null);
      } catch (err) {
        setError("Failed to load photo gallery. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    const query = `
      *[_type == "photoGallery"] {
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

      setPhotoCategories(uniqueCategories);
    } catch (err) {
      setError("Failed to fetch categories. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchPhotoGallery("All", 1, "");
  }, [fetchPhotoGallery, fetchCategories]);

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      if (category) {
        setActiveCategory(category);
        setCurrentCategory(category);
        setCurrentPage(1);
        fetchPhotoGallery(category, 1, searchTerm);
      }
    },
    [fetchPhotoGallery, searchTerm],
  );

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPhotoGallery(currentCategory, nextPage, searchTerm);
  }, [currentPage, currentCategory, fetchPhotoGallery, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
      fetchPhotoGallery(currentCategory, 1, term);
    },
    [fetchPhotoGallery, currentCategory],
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
        title="Photo Gallery"
        items={photoGalleryItems}
        galleryType="photo"
        categories={photoCategories}
        onCategoryChange={handleCategoryChange}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        onSearch={handleSearch}
        activeCategory={activeCategory}
      />
    </div>
  );
}
