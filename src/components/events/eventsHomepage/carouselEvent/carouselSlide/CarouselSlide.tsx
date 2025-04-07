import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

import styles from "./CarouselSlide.module.scss";

interface SocialLink {
  url: string;
  icon: "facebook" | "twitter" | "youtube" | "instagram";
}

interface Heading {
  prefix: string;
  highlighted: string;
  suffix: string;
}

interface DynamicCarouselProps {
  imageUrl: string;
  imageAlt: string;
  socialLinks: SocialLink[];
  heading: Heading;
  buttonText: string;
  buttonLink: string;
}

const DynamicCarousel: React.FC<DynamicCarouselProps> = ({
  imageUrl,
  imageAlt,
  socialLinks,
  heading,
  buttonText,
  buttonLink,
}) => {
  const iconComponents: Record<SocialLink["icon"], React.ComponentType> = {
    facebook: IconBrandFacebook,
    twitter: IconBrandTwitter,
    youtube: IconBrandYoutube,
    instagram: IconBrandInstagram,
  };

  return (
    <div className={styles.imageContainer}>
      <Image
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        alt={imageAlt}
        className={styles.image}
      />
      <div className={styles.overlay} />

      <div className={styles.contentContainer}>
        <div className={styles.textAndIconsContainer}>
          <div className={styles.textContainer}>
            <h1 className={`${styles.heading} heading-1`}>
              {`${heading.prefix}${heading.prefix ? " " : ""}`}
              <span className={styles.highlightedText}>
                {heading.highlighted}
              </span>
              {`${heading.suffix ? " " : ""}${heading.suffix}`}
            </h1>
          </div>
          <div className={styles.iconContainer}>
            {socialLinks &&
              socialLinks?.map((link) => {
                const IconComponent = iconComponents[link.icon];
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.icon} body-4`}
                    aria-label={link.icon}
                  >
                    <IconComponent />
                  </a>
                );
              })}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <a href={buttonLink} className={`${styles.button} subheading-5`}>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DynamicCarousel;
