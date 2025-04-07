import React, { useState } from "react";

import AboutPart from "@/components/shared/aboutPart/AboutPart";

import AdditionalInfo from "./additionalInfo/AdditionalInfo";
import LeadersConnect from "./leadersConnect/LeadersConnect";
import styles from "./Main.module.scss";
import PressReleases from "./pressReleases/PressReleases";
import Timeline from "./timeline/Timeline";

interface MainProps {
  aboutData: {
    title: string;
    imgAlt: string;
    img:string,
    description: string;
    join: string;
    additionalParagraphs: string[];
  };
  timelineData: {
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
  leadersConnectData: {
    title: string;
    video: string;
  };
}

export default function Main({
  aboutData,
  timelineData,
  leadersConnectData,
}: MainProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(aboutData)
  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.main}>
      <AboutPart
        imgSrc={aboutData.img}
        imgAlt={aboutData.imgAlt}
        title={aboutData.title}
        description={aboutData.description}
        buttonText={aboutData.join}
        showReadMore
        isExpanded={isExpanded}
        onReadMoreClick={handleReadMoreClick}
      />
      {isExpanded && <AdditionalInfo data={aboutData.additionalParagraphs} />}
      <Timeline
        headerTitle={timelineData.headerTitle}
        headerDescription={timelineData.headerDescription}
        events={timelineData.events}
      />
      <LeadersConnect data={leadersConnectData} />
      <PressReleases />
    </div>
  );
}
