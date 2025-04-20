import { Alert, LoadingOverlay } from "@mantine/core";
import { client, urlFor } from "app/lib/sanity";
import React, { useEffect, useState } from "react";

import PressReleaseCard from "../../../shared/pressReleaseCard/PressReleaseCard";
import styles from "./PressReleases.module.scss";

interface PressRelease {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  featuredImage: string;
}

export default function PressReleases() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const query = `
          *[_type == "pressRelease"] | order(publishDate desc)[0...6] {
            "id":_id,
            "title": title.en,
            "summary": summary.en,
            publishDate,
            featuredImage
          }
        `;
        const result = await client.fetch(query);
        setPressReleases(result);
      } catch (err) {
        console.error("Error fetching press releases:", err);
        setError("Failed to load press releases. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  if (isLoading) return <LoadingOverlay visible />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <div className={styles["press-releases"]}>
      <h2>Press Releases</h2>
      <div className={styles["press-release-cards-container"]}>
        {pressReleases.map((release) => (
          <PressReleaseCard
            key={release.id}
            id={release.id}
            heading={release.title}
            details={release.summary}
            imgPath={urlFor(release.featuredImage).url()}
            date={new Date(release.publishDate).toLocaleDateString()}
            type="pressRelease"
          />
        ))}
      </div>
    </div>
  );
}
