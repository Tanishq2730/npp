"use client";

import { LoadingOverlay, Notification } from "@mantine/core";
import { client } from "app/lib/sanity";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Featured from "../shared/featuredReleased/FeaturedReleases";
import styles from "./PressRelease.module.scss";
import PressReleaseInfo from "./pressReleaseInfo/PressReleaseInfo";

interface PressReleaseData {
  id: string;
  publishDate: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  imageGallery: { image: string; id: string }[];
  videos: { url: string; id: string }[];
  socialLinks: { url: string; icon: string }[];
}

interface FeaturedPressRelease {
  id: string;
  publishDate: string;
  title: string;
  summary: string;
  featuredImage: string;
  socialLinks: { url: string; icon: string }[];
  isHighlighted: boolean;
}

const PressRelease: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [pressReleaseData, setPressReleaseData] =
    useState<PressReleaseData | null>(null);
  const [featuredReleases, setFeaturedReleases] = useState<
    FeaturedPressRelease[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No press release ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const query = `
          {
            "currentRelease": *[_type == "pressRelease" && _id == $id][0] {
              "id":_id,
              publishDate,
              "title": title.en,
              "summary": summary.en,
              "content": content.en,
              featuredImage,
              imageGallery[] {
                "id": _key,
                "image": image.asset->url
              },
              videos[] {
                "id": _key,
                url
              },
              socialLinks[] {
                url,
                icon
              }
            },
            "featuredReleases": *[_type == "pressRelease" && _id != $id] | order(isHighlighted desc, publishDate desc)[0...10] {
              "id":_id,
              publishDate,
              "title": title.en,
              "summary": summary.en,
              featuredImage,
              socialLinks[] {
                url,
                icon
              },
              isHighlighted
            }
          }
        `;
        const result = await client.fetch(query, { id });

        if (!result.currentRelease) {
          setError("Press release not found");
        } else {
          setPressReleaseData(result.currentRelease);
          setFeaturedReleases(result.featuredReleases);
        }
      } catch (err) {
        console.error("Error fetching press release data:", err);
        setError("Failed to load press release data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
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
      </div>
    );
  }

  return (
    <div className={styles.info}>
      {error && (
        <Notification title="Error" color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}
      {pressReleaseData && <PressReleaseInfo data={pressReleaseData} />}
      <Featured
        items={featuredReleases}
        type="pressRelease"
        heading="FEATURED PRESS RELEASES"
      />
    </div>
  );
};

export default PressRelease;
