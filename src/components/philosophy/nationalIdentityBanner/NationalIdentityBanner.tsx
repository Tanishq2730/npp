import { Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";

import styles from "./NationalIdentityBanner.module.scss";

const NationalIdentityBanner: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src="/static/images/philosophy/national-identity.png"
        alt="National Identity"
        layout="fill"
        objectFit="cover"
        className={styles.backgroundImage}
      />
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <Title order={1} className={styles.title}>
            Our Unique
            <br />
            National Identity
            <br />
            and Commitment
          </Title>
          <div className={styles.mobileImageContainer}>
            <Image
              src="/static/images/philosophy/national-identity.png"
              alt="National Identity Mobile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Text className={styles.description}>
            The National People&apos;s Party (NPP) stands apart from other
            national parties by embracing the diversity of India and addressing
            region- specific issues. Founded to represent regional aspirations
            on the national stage, NPP is committed to progress, growth, and
            development while preserving its unique identity. The party&apos;s
            special focus on Northeast India, including Meghalaya and other
            Northeast, honoring the legacy of Purno Sangma, NPP serves not just
            as a political force but as a torch for all ethnic groups, proving
            that unity in diversity leads to greater accomplishments.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NationalIdentityBanner;
