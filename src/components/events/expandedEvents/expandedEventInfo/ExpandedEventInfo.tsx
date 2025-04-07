

import { LoadingOverlay, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { client } from "app/lib/sanity";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import AboutPart from "@/components/shared/aboutPart/AboutPart";
import Featured from "@/components/shared/featuredReleased/FeaturedReleases";

import type { ImageDataTypes } from "../eventImage/EventImages";
import ImageGrid from "../eventImage/EventImages";
import EventTabs from "../eventTabs/EventTabs";
import styles from "./ExpandedEventInfo.module.scss";

interface EventDetails {
  _id: string;
  date: string;
  title: string;
  description: string;
  join: string;
  featuredImage: string;
  images: ImageDataTypes[];
  videos: ImageDataTypes[];
  socialLinks: { url: string; icon: string }[];
}

interface FeaturedEvent {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  featuredImage: string;
  socialLinks?: { url: string; icon: string }[];
  isHighlighted: boolean;
}

export default function ExpandedEventsInfo() {
  const [activeTab, setActiveTab] = useState<string>("images");
  const [eventData, setEventData] = useState<EventDetails | null>(null);
  const [featuredEvents, setFeaturedEvents] = useState<FeaturedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchEventData = async () => {
      if (id) {
        setIsLoading(true);
        setError(null);
        const query = `
          {
            "currentEvent": *[_type == "event" && _id == $id][0] {
              _id,
              date,
              "title": title.en,
              "description": description.en,
              "join": "Join Now",
              "featuredImage": featuredImage.asset->url,
              "images": imageGallery[]{
                _key,
                "link": image.asset->url,
                "caption": caption.en
              },
              "videos": videos[]{
                _key,
                "link": url,
                "caption": caption.en
              },
              "socialLinks": socialLinks[]{
                url,
                icon
              }
            },
            "featuredEvents": *[_type == "event" && _id != $id] | order(isHighlighted desc, date desc)[0...10] {
              "id": _id,
              "title": title.en,
              "summary": description.en,
              date,
              "featuredImage": featuredImage.asset->url,
              "socialLinks": socialLinks[]{
                url,
                icon
              },
              isHighlighted
            }
          }
        `;

        try {
          const data = await client.fetch(query, { id });
          if (data.currentEvent) {
            setEventData(data.currentEvent);
            setFeaturedEvents(
              data.featuredEvents.map((event: any) => ({
                ...event,
                publishDate: event.date, // Use the 'date' field for 'publishDate'
              })),
            );
          } else {
            setError("Event not found");
          }
        } catch (fetchError) {
          console.error("Error fetching event data:", fetchError);
          setError("Failed to load event data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEventData();
  }, [id]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div
      className={`md:container md:mx-auto ${styles.expandedEventsInfo}`}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ size: "lg", color: "yellow", type: "bars" }}
      />

      {error && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          title="Error"
          onClose={() => setError(null)}
          style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}
        >
          {error}
        </Notification>
      )}

      {eventData && (
        <>
          <div className={styles.content}>
            <AboutPart
              imgSrc={eventData.featuredImage}
              imgAlt={eventData.title}
              date={eventData.date}
              title={eventData.title}
              buttonText={eventData.join}
              description={eventData.description}
              socialLinks={eventData.socialLinks}
              url={currentUrl}
            />

            <EventTabs setActiveTab={setActiveTab} />
            <ImageGrid
              activeTab={activeTab}
              images={eventData.images}
              videos={eventData.videos}
            />
          </div>
          <Featured
            items={featuredEvents}
            type="event"
            heading="FEATURED EVENTS"
          />
        </>
      )}
    </div>
  );
}
