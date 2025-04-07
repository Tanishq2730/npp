/* eslint-disable react/no-unused-prop-types */
import { Button, Divider, Skeleton, Text } from "@mantine/core";
import { client, urlFor } from "app/lib/sanity";
import React, { useCallback, useEffect, useState } from "react";

import PressReleaseCard from "@/components/shared/pressReleaseCard/PressReleaseCard";

import styles from "./RecentItems.module.scss";

export interface CardTypes {
  id: string;
  title: string;
  description: string;
  featuredImage: string;
  date: string;
  isHighlighted: boolean;
  socialLinks: { url: string; icon: string }[];
}

const ITEMS_PER_PAGE = 12;

async function getData(
  type: "event" | "pressRelease",
  start: number,
  end: number,
  searchTerm: string,
  dateRange: [Date | null, Date | null],
) {
  const query = `
  *[_type == '${type}' 
    ${searchTerm ? `&& title.en match "*${searchTerm}*"` : ""}
    ${dateRange[0] ? `&& ${type === "event" ? "date" : "publishDate"} >= "${dateRange[0].toISOString()}"` : ""}
    ${dateRange[1] ? `&& ${type === "event" ? "date" : "publishDate"} <= "${dateRange[1].toISOString()}"` : ""}
  ] | order(${type === "event" ? "date" : "publishDate"} desc) [${start}...${end}] {
    "id": _id,
    "title": title.en,
    "date": ${type === "event" ? "date" : "publishDate"},
    "description": ${type === "event" ? "description.en" : "summary.en"},
     featuredImage,
     isHighlighted,
     "socialLinks": socialLinks[] {
      url,
      icon
    }
  }
  `;

  return client.fetch<CardTypes[]>(query);
}

const SkeletonCard = () => (
  <div className={styles["press-release-card"]}>
    <Skeleton height={375.82} radius="md" />
    <div className={styles.contentWrapper}>
      <Skeleton height={20} width="30%" mt="sm" />
      <Skeleton height={24} mt="md" />
      <Skeleton height={60} mt="md" />
    </div>
  </div>
);

interface RecentItemsProps {
  type: "event" | "pressRelease";
  searchTerm: string;
  dateRange: [Date | null, Date | null];
  title: string;
  subtitle: string;
}

export default function RecentItems({
  type,
  searchTerm,
  dateRange,
  title,
  subtitle,
}: RecentItemsProps) {
  const [items, setItems] = useState<CardTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(
    async (page: number) => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setIsLoading(true);
      const newData = await getData(type, start, end, searchTerm, dateRange);
      setIsLoading(false);

      if (newData.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      return newData;
    },
    [type, searchTerm, dateRange],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchItems(1).then((data) => setItems(data));
  }, [fetchItems, type, searchTerm, dateRange]);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const newData = await fetchItems(nextPage);
    setItems((prev) => [...prev, ...newData]);
    setCurrentPage(nextPage);
  };

  return (
    <div className={styles.recentEvents}>
      <div className={styles.header}>
        <div>
          <h2>{title}</h2>
          <h6>{subtitle}</h6>
        </div>
        <Button color="#E4B001" size="md" radius={20}>
          Join NPP
        </Button>
      </div>
      <Divider className="mb-10" color="rgba(125, 131, 135, 0.50)" />
      <div className={styles.pressReleaseCards}>
        {isLoading &&
          Array(4)
            .fill(null)
            .map((_) => (
              <SkeletonCard key={Math.random().toString(36).substr(2, 9)} />
            ))}

        {items.map(
          ({
            id,
            title: itemTitle,
            description,
            date,
            featuredImage,
            isHighlighted,
            socialLinks,
          }: CardTypes) => (
            <PressReleaseCard
              key={id}
              type={type}
              id={id}
              heading={itemTitle}
              details={description}
              imgPath={urlFor(featuredImage).url()}
              date={date}
              isHighlighted={isHighlighted}
              socialLinks={socialLinks}
            />
          ),
        )}
      </div>
      {!isLoading && items.length === 0 && (
        <Text size="xl" ta="center" style={{ width: "100%", padding: "2rem" }}>
          No {type}s found. Please try different search criteria.
        </Text>
      )}
      {hasMore && items.length > 0 && (
        <div className={styles.loadMoreContainer}>
          <Button
            onClick={handleLoadMore}
            loading={isLoading}
            color="#E4B001"
            size="md"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
