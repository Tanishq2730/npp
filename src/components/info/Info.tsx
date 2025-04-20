"use client";

import { LoadingOverlay } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import styles from "./Info.module.scss";
import Intro from "./intro/Intro";
import Main from "./main/Main";

interface PersonData {
  introComponent: {
    name: string;
    post: string;
    description: string;
    imgAlt: string;
    desktopImageUrl: string;
    mobileImageUrl: string;
  };
  aboutComponent: {
    title: string;
    imgAlt: string;
    img:string,
    description: string;
    join: string;
    additionalParagraphs: string[];
  };
  timelineComponent: {
    headerTitle: string;
    headerDescription: string;
    events: Array<{
      year: string;
      titleLight: string;
      titleBold: string;
      subtitle: string;
      description: string;
      buttonText: string;
      imageSrc: string;
    }>;
  };
  leadersConnectComponent: {
    title: string;
    video: string;
  };
}

const Info: React.FC = () => {
  const searchParams = useSearchParams();
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("infoPage.people");

  useEffect(() => {
    const fetchPersonData = () => {
      const personId = searchParams.get("person");
      if (!personId) {
        setError("Please specify a person in the query parameters.");
        setLoading(false);
        return;
      }

      try {
        // Log the entire translation object for debugging
        console.log("Full translation object:", t.raw(""));

        // Fetch the person data
        const data = t.raw(`${personId}`);
        if (!data || typeof data !== "object") {
          throw new Error("Invalid data structure");
        }

        // Type assertion to PersonData
        const typedData = data as PersonData;

        // Validate the data structure
        if (
          !typedData.introComponent ||
          !typedData.aboutComponent ||
          !typedData.timelineComponent ||
          !typedData.leadersConnectComponent
        ) {
          throw new Error("Invalid data structure");
        }

        setPersonData(typedData);
      } catch (err) {
        console.error("Error fetching person data:", err);
        setError("Failed to fetch person data");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [searchParams, t]);

  if (loading)
    return (
      <div style={{ height: "100vh", position: "relative" }}>
        {" "}
        <LoadingOverlay
          visible={loading}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ size: "lg", color: "yellow", type: "bars" }}
        />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!personData) return <div>No data available</div>;

  return (
    <div className={`md:container-fluid md:mx-auto ${styles.info}`}>
      <Intro data={personData.introComponent} />
      <div className={`${styles.containerPadding}`}>
        <Main
          aboutData={personData.aboutComponent}
          timelineData={personData.timelineComponent}
          leadersConnectData={personData.leadersConnectComponent}
        />
      </div>
    </div>
  );
};

export default Info;
